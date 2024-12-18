import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../users/schemas/user.schema';
import { Model } from 'mongoose';
import { SignInDto, SignUpDto } from './dtos';
import { handleException } from 'src/common/exceptions';
import { AuthResponse, JwtPayload } from './interfaces';
import { JwtService } from '@nestjs/jwt';
import { encrypt, envVariables, isMatch } from '../core/config';

@Injectable()
export class AuthService {

  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<User>,
    private readonly jwtService: JwtService,
  ) { }

  public async signIn(signInDto: SignInDto): Promise<AuthResponse> {
    try {
      const existsUserByEmail = await this.userModel.findOne({ email: signInDto.email });
      if (!existsUserByEmail) throw new HttpException(`Account does not exists!`, HttpStatus.UNAUTHORIZED);
      if (!existsUserByEmail.isActive) throw new HttpException(`Inactive account!`, HttpStatus.UNAUTHORIZED);
      if (!isMatch(signInDto.password, existsUserByEmail.password)) throw new HttpException(`Not valid credentials!`, HttpStatus.UNAUTHORIZED);
      const token = this.setJwt({ uid: `${existsUserByEmail._id}`, name: existsUserByEmail.name, email: existsUserByEmail.email });
      return {
        user: {
          _id: `${existsUserByEmail._id}`,
          name: existsUserByEmail.name,
          email: existsUserByEmail.email,
        },
        token: token
      }
    } catch (error) {
      handleException(error);
    }
  }

  public async signUp(signUpDto: SignUpDto): Promise<AuthResponse> {
    try {
      const existsUserByEmail = await this.userModel.findOne({ email: signUpDto.email });
      if (existsUserByEmail) throw new HttpException(`Account already exists!`, HttpStatus.BAD_REQUEST);
      const user = await this.userModel.create({ ...signUpDto, password: encrypt(signUpDto.password) });
      const saved = await user.save();
      const token = this.setJwt({ uid: `${saved._id}`, name: saved.name, email: saved.email });
      return {
        user: {
          _id: `${user._id}`,
          name: user.name,
          email: user.email,
        },
        token: token
      }
    } catch (error) {
      handleException(error);
    }
  }

  public async verifyToken(token: string) {
    try {
      const { sub, iat, exp, ...user } = await this.jwtService.verify(token, { secret: envVariables.secretKey });
      const existsUser = await this.userModel.findOne({ _id: user.uid });
      if (!existsUser) throw new HttpException(`User Not Found`, HttpStatus.UNAUTHORIZED);
      if (!existsUser.isActive) throw new HttpException('Inactive User', HttpStatus.UNAUTHORIZED);
      return {
        user: user,
        token: this.setJwt({ uid: `${existsUser._id}`, email: existsUser.email, name: existsUser.name }),
      }
    } catch (error) { // Capturamos token vencido o lo que sea
      if (error instanceof HttpException) throw error;
      throw new HttpException(`Sometime went wrong: ${error}`, HttpStatus.UNAUTHORIZED);
    }
  }

  private setJwt(payload: JwtPayload) {
    return this.jwtService.sign(payload);
  }

}
