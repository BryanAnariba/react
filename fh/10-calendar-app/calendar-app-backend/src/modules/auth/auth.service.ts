import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { SignInDto, SignUpDto } from './dtos';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../users/schemas/user.schema';
import { Model } from 'mongoose';
import { compareParams, encrypt, envs } from 'src/common/config';
import { JwtService } from '@nestjs/jwt';
import { AuthResponse, JWTPayload } from './interfaces';

@Injectable()
export class AuthService {

  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<User>,
    private readonly jwtService: JwtService,
  ) { }

  public async signUp(signUpDto: SignUpDto): Promise<AuthResponse> {
    try {
      const user = await this.userModel.create({
        ...signUpDto,
        password: encrypt(signUpDto.password)
      });
      const saved = await user.save();
      const { password: _, ...restOfUser } = saved.toJSON();
      return {
        user: {
          _id: restOfUser._id.toString(),
          name: restOfUser.name,
          email: restOfUser.email,
        },
        token: this.setJwt({ _id: `${restOfUser._id}`, name: restOfUser.name, email: restOfUser.email }),
      }
    } catch (error) {
      if (error instanceof HttpException) throw error;
      if (error.code === 11000) throw new HttpException('Duplicated user', HttpStatus.BAD_REQUEST);
      throw new HttpException(`Sometime went wrong creating user: ${error}`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  public async signIn(signInDto: SignInDto): Promise<AuthResponse> {
    try {
      const user = await this.userModel.findOne({ email: signInDto.email });
      if (!user) throw new HttpException(`Not valid credentials - email`, HttpStatus.UNAUTHORIZED);
      if (!user.isActive) throw new HttpException(`Inactive user, please contact the admin`, HttpStatus.UNAUTHORIZED);
      if (!compareParams(signInDto.password, user.password)) throw new HttpException(`Not valid credentials - password`, HttpStatus.UNAUTHORIZED);
      const { password: _, ...restOfUser } = user.toJSON();
      return {
        user: {
          _id: restOfUser._id.toString(),
          name: restOfUser.name,
          email: restOfUser.email,
        },
        token: this.setJwt({ _id: `${restOfUser._id}`, name: restOfUser.name, email: restOfUser.email }),
      }
    } catch (error) {
      if (error instanceof HttpException) throw error;
      throw new HttpException(`Sometime went wrong login the user: ${error}`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  public async verifyToken (token: string) {
    try {
      const {sub, iat, exp, ...user} = await this.jwtService.verify(token, {secret: envs.secretKey});
      const existsUser = await this.userModel.findOne({_id: user._id});
      if (!existsUser) throw new HttpException(`User Not Found`, HttpStatus.UNAUTHORIZED);
      if (!existsUser.isActive) throw new HttpException('Inactive User', HttpStatus.UNAUTHORIZED);
      return {
        user: user,
        token: this.setJwt({_id: `${existsUser._id}`, email: existsUser.email, name: existsUser.name}),
      }
    } catch (error) { // Capturamos token vencido o lo que sea
      if (error instanceof HttpException) throw error;
      throw new HttpException(`Sometime went wrong: ${error}`, HttpStatus.UNAUTHORIZED);
    }
  }

  private setJwt(jwtPayload: JWTPayload): string {
    return this.jwtService.sign(jwtPayload);
  }

}
