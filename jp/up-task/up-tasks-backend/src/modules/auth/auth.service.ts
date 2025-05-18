import { BadRequestException, Injectable } from '@nestjs/common';
import { NewAccountDto } from './dto/new-account.dto';
import { SignInDto } from './dto/sign-in.dto';
import { errorHandleExceptions } from 'src/common/exceptions/error-handle.exception';
import { UsersService } from '../users/users.service';
import { hashParam } from 'src/common/utils/bcrypt.utils';
import { AuthResponse, JwtPayload } from './types';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { AuthToken } from './schemas/auth-token.schema';
import { Model, Types } from 'mongoose';
import { generateToken } from 'src/common/utils/tokens.utils';
import { MailService } from 'src/common/services/mail.service';
import { SentMessageInfo } from 'src/common/types/mail-services.types';
import { ConfirmAccountDto } from './dto/confirm-account.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(AuthToken.name)
    private readonly authTokenModel: Model<AuthToken>,
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly mailService: MailService,
  ) {}

  public async newAccount(newAccountDto: NewAccountDto): Promise<AuthResponse> {
    try {
      const user = await this.usersService.createFromNewAccount({
        ...newAccountDto,
        password: hashParam(newAccountDto.password),
      });

      const userWithoutPassword = this.usersService.userWithOutPwd(user);

      const token = await this.authTokenModel.create({
        token: generateToken(),
        userId: userWithoutPassword._id,
      });

      const tokenSaved = await token.save();

      // Descomentar solo para hacer pruebas de si la conexion funciona
      // await this.mailService.testConnection();

      // Enviar el correo de verificación
      let info: SentMessageInfo | null = null;
      if (tokenSaved && user) {
        info = await this.mailService.sendEmailData({
          from: `UpTasks <${process.env.MAIL_USER}>`,
          to: userWithoutPassword.email,
          subject: 'UpTasks - Verificación/Confirmacion de cuenta',
          text: `UpTasks - Confirma tu cuenta`,
          html: `
            <h1>Bienvenido ${userWithoutPassword.name}</h1>
            <p>Hola: ${userWithoutPassword.name}, haz creado tu cuenta en UpTasks, ya casi esta todo listo, solo debes confirmar tu cuenta.</p>
            <p>Verifica el siguiente enlace:</p>
            <a href="">Confirmar cuenta</a>
            <p>E ingresa el codigo: <b>${tokenSaved.token}</b></p>
            <p>Este token expirara en: 1 Hora</p>
          `,
        });
      }

      return {
        user: userWithoutPassword,
        token: this.setJwt({
          _id: userWithoutPassword._id,
          email: userWithoutPassword.email,
          name: userWithoutPassword.name,
        }),
        emailSent: info ? true : false,
      };
    } catch (error) {
      throw errorHandleExceptions(error);
    }
  }

  public signIn(signInDto: SignInDto) {
    try {
      return signInDto;
    } catch (error) {
      throw errorHandleExceptions(error);
    }
  }

  public async confirmAccount(confirmAccountDto: ConfirmAccountDto) {
    try {
      const token = await this.authTokenModel.findOne({
        token: confirmAccountDto.token,
        userId: new Types.ObjectId(confirmAccountDto.userCode),
      });
      if (!token) throw new BadRequestException(`Token was not found!`);

      const user = await this.usersService.findOne(token.userId);
      if (!user) throw new BadRequestException(`User was not found!`);

      if (user.confirmed) throw new BadRequestException(`User already confirmed!`);

      await Promise.allSettled([
        this.usersService.confirmUserAccount(token.userId, true),
        token.deleteOne(),
      ]);

      return {
        message: `User ${user.email} confirmed successfully`
      };
    } catch (error) {
      throw errorHandleExceptions(error);
    }
  }

  public setJwt(payload: JwtPayload): string {
    return this.jwtService.sign(payload);
  }
}
