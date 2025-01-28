import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../users/schemas/user.schema';
import { Model } from 'mongoose';
import { SignInDto, SignUpDto } from './dtos';
import { handleException } from 'src/common/exceptions';
import { AuthResponse, JwtPayload } from './interfaces';
import { JwtService } from '@nestjs/jwt';
import { encrypt, envVariables, isMatch } from '../core/config';
import { RolesService } from '../roles/roles.service';

@Injectable()
export class AuthService {

  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<User>,
    private readonly roleService: RolesService,
    private readonly jwtService: JwtService,
  ) { }

  public async signIn(signInDto: SignInDto): Promise<AuthResponse> {
    try {
      const existsUserByEmail = await this.userModel.findOne({ email: signInDto.email }).populate('role', 'name');
      if (!existsUserByEmail) throw new HttpException(`Account does not exists!`, HttpStatus.UNAUTHORIZED);
      if (!existsUserByEmail.isActive) throw new HttpException(`Inactive account!`, HttpStatus.UNAUTHORIZED);
      if (!isMatch(signInDto.password, existsUserByEmail.password)) throw new HttpException(`Not valid credentials!`, HttpStatus.UNAUTHORIZED);
      const token = this.setJwt({ uid: `${existsUserByEmail._id}`, name: existsUserByEmail.name, email: existsUserByEmail.email });
      return {
        user: {
          _id: `${existsUserByEmail._id}`,
          name: existsUserByEmail.name,
          email: existsUserByEmail.email,
          role: {
            _id: existsUserByEmail.role['_id'],
            name: existsUserByEmail.role['name'],
          },
        },
        token: token
      }
    } catch (error) {
      handleException(error);
    }
  }

  public async signUp(signUpDto: SignUpDto): Promise<AuthResponse> {
    try {
      const existRole = await this.roleService.findOneByName('USER');
      if (!existRole) throw new HttpException('Default role does not exists, please contact admin', HttpStatus.NOT_FOUND);
      const existsUserByEmail = await this.userModel.findOne({ email: signUpDto.email });
      if (existsUserByEmail) throw new HttpException(`Account already exists!`, HttpStatus.BAD_REQUEST);
      const user = await this.userModel.create({ ...signUpDto, password: encrypt(signUpDto.password), role: existRole._id });
      const saved = await user.save();
      const token = this.setJwt({ uid: `${saved._id}`, name: saved.name, email: saved.email });
      return {
        user: {
          _id: `${user._id}`,
          name: user.name,
          email: user.email,
          role: {
            _id: `${existRole._id}`,
            name: existRole.name,
          },
        },
        token: token,
      }
    } catch (error) {
      handleException(error);
    }
  }

  public async verifyToken(token: string) {
    try {
      const { sub, iat, exp, ...user } = await this.jwtService.verify(token, { secret: envVariables.secretKey });
      const existsUser = await this.userModel.findOne({ _id: user.uid }).populate('role', 'name');;
      if (!existsUser) throw new HttpException(`User Not Found`, HttpStatus.UNAUTHORIZED);
      if (!existsUser.isActive) throw new HttpException('Inactive User', HttpStatus.UNAUTHORIZED);
      return {
        user: {
          _id: `${existsUser._id}`,
          name: existsUser.name,
          email: existsUser.email,
          role: {
            _id: existsUser.role['_id'],
            name: existsUser.role['name'],
          },
        },
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
