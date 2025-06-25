import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { NewAccountDto } from './dto/new-account.dto';
import { SignInDto } from './dto/sign-in.dto';
import { errorHandleExceptions } from 'src/common/exceptions/error-handle.exception';
import { UsersService } from '../users/users.service';
import { compareHash, hashParam } from 'src/common/utils/bcrypt.utils';
import { AuthResponse, JwtPayload } from './types';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { AuthToken } from './schemas/auth-token.schema';
import { Model, Types } from 'mongoose';
import { generateToken } from 'src/common/utils/tokens.utils';
import { MailService } from 'src/common/services/mail.service';
import { SentMessageInfo } from 'src/common/types/mail-services.types';
import { ConfirmAccountDto } from './dto/confirm-account.dto';
import { ResendConfirmationTokenDto } from './dto/resend-confirmation-token.dto';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { User } from '../users/schemas/user.schemas';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(AuthToken.name)
    private readonly authTokenModel: Model<AuthToken>,
    @InjectModel(User.name)
    private readonly userModel: Model<User>,
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly mailService: MailService,
  ) {}

  public async newAccount(
    newAccountDto: NewAccountDto,
  ): Promise<Pick<AuthResponse, 'user' | 'emailSent'>> {
    try {
      const user = await this.usersService.createFromNewAccount({
        ...newAccountDto,
        password: hashParam(newAccountDto.password),
      });

      const token = await this.authTokenModel.create({
        token: generateToken(),
        userId: user._id,
      });

      // Descomentar solo para hacer pruebas de si la conexion funciona
      // await this.mailService.testConnection();

      // Enviar el correo de verificación, creamos un token y lo guardamos en la base de datos este numero debe ser igual al que se envia el email para confirmar la cuenta
      const tokenSaved = await token.save();
      let info: SentMessageInfo | null = null;
      if (tokenSaved) {
        info = await this.mailService.sendEmailData({
          from: `UpTasks <${process.env.MAIL_USER}>`,
          to: user.email,
          subject: 'UpTasks - Verificación/Confirmacion de cuenta',
          text: `UpTasks - Confirma tu cuenta`,
          html: `
            <h1>Bienvenido ${user.name}</h1>
            <p>Hola: ${user.name}, haz creado tu cuenta en UpTasks, ya casi esta todo listo, solo debes confirmar tu cuenta.</p>
            <p>Verifica el siguiente enlace:</p>
            <a href="${process.env.FRONTEND_URL}/auth/confirm-account/${user._id as string}">Confirmar cuenta</a>
            <p>E ingresa el codigo: <b>${tokenSaved.token}</b></p>
            <p>Este token expirara en: 1 Hora</p>
          `,
        });
      }

      return {
        user: { _id: user._id as string, email: user.email, name: user.name },
        emailSent: info ? true : false,
      };
    } catch (error) {
      throw errorHandleExceptions(error);
    }
  }

  public async signIn(
    signInDto: SignInDto,
  ): Promise<Pick<AuthResponse, 'user' | 'token'>> {
    try {
      const user = await this.usersService.findByEmail(signInDto.email);
      if (!user || !user.isActive)
        throw new UnauthorizedException(
          `Invalid credentials, User not found or is not active!`,
        );
      if (!user.confirmed)
        throw new UnauthorizedException(
          `This User not confirmed yet, please confirm the account checking your email!`,
        );

      if (!compareHash(signInDto.password, user.password))
        throw new UnauthorizedException(
          `Invalid - credentials, password is not valid!`,
        );

      return {
        user: {
          _id: user._id as string,
          email: user.email,
          name: user.name,
        },
        token: this.setJwt({
          _id: user._id as string,
          email: user.email,
          name: user.name,
          roles: user.roles,
        }),
      };
    } catch (error) {
      throw errorHandleExceptions(error);
    }
  }

  public async confirmAccount(confirmAccountDto: ConfirmAccountDto) {
    try {
      const token = await this.authTokenModel.findOne({
        token: confirmAccountDto.token,
        userId: new Types.ObjectId(confirmAccountDto.userId),
      });
      if (!token) throw new BadRequestException(`Token was not found!`);

      const user = await this.usersService.findOne(token.userId);
      if (!user) throw new BadRequestException(`User was not found!`);

      if (user.confirmed)
        throw new BadRequestException(`User already confirmed!`);

      await Promise.allSettled([
        this.usersService.confirmUserAccount(token.userId, true),
        token.deleteOne(),
      ]);

      return {
        message: `User ${user.email} confirmed successfully`,
      };
    } catch (error) {
      throw errorHandleExceptions(error);
    }
  }

  public async resendConfirmationToken(
    resendConfirmationTokenDto: ResendConfirmationTokenDto,
  ): Promise<Pick<AuthResponse, 'user' | 'emailSent'>> {
    try {
      const user = await this.usersService.findByEmail(
        resendConfirmationTokenDto.email,
      );
      if (!user) throw new BadRequestException(`User was not found!`);

      if (user.confirmed)
        throw new BadRequestException(`User ${user.name} already confirmed!`);

      const token = await this.authTokenModel.create({
        token: generateToken(),
        userId: user._id,
      });

      // Descomentar solo para hacer pruebas de si la conexion funciona
      // await this.mailService.testConnection();

      // Enviar el correo de verificación, creamos un token y lo guardamos en la base de datos este numero debe ser igual al que se envia el email para confirmar la cuenta
      const tokenSaved = await token.save();
      let info: SentMessageInfo | null = null;
      if (tokenSaved) {
        info = await this.mailService.sendEmailData({
          from: `UpTasks <${process.env.GMAIL_USER}>`,
          to: user.email,
          subject: 'UpTasks - Verificación/Confirmacion de cuenta',
          text: `UpTasks - Confirma tu cuenta`,
          html: `
            <h1>Bienvenido ${user.name}</h1>
            <p>Hola: ${user.name}, haz creado tu cuenta en UpTasks, ya casi esta todo listo, solo debes confirmar tu cuenta.</p>
            <p>Verifica el siguiente enlace:</p>
            <a href="${process.env.FRONTEND_URL}/auth/confirm-account/${user._id as string}">Confirmar cuenta</a>
            <p>E ingresa el codigo: <b>${tokenSaved.token}</b></p>
            <p>Este token expirara en: 1 Hora</p>
          `,
        });
      }
      return {
        user: { _id: user._id as string, email: user.email, name: user.name },
        emailSent: info ? true : false,
      };
    } catch (error) {
      throw errorHandleExceptions(error);
    }
  }

  public async forgotPassword(
    forgotPasswordDto: ForgotPasswordDto,
  ): Promise<Pick<AuthResponse, 'user' | 'emailSent'>> {
    try {
      const user = await this.usersService.findByEmail(forgotPasswordDto.email);
      if (!user) throw new BadRequestException(`User was not found!`);
      if (!user.isActive)
        throw new BadRequestException(
          `Inactive user, please talk with an admin!`,
        );
      const token = await this.authTokenModel.create({
        token: generateToken(),
        userId: user._id,
      });

      // Descomentar solo para hacer pruebas de si la conexion funciona
      // await this.mailService.testConnection();

      // Enviar el correo de verificación, creamos un token y lo guardamos en la base de datos este numero debe ser igual al que se envia el email para confirmar la cuenta
      const tokenSaved = await token.save();
      let info: SentMessageInfo | null = null;
      if (tokenSaved) {
        info = await this.mailService.sendEmailData({
          from: `UpTasks <${process.env.MAIL_USER}>`,
          to: user.email,
          subject: 'UpTasks - Reestablece tu contraseña',
          text: `UpTasks - Reestablece tu contraseña`,
          html: `
            <p>Hola: ${user.name}, haz solicitado reestablecer tu contraseña.</p>
            <p>Visita el siguiente enlace para reestablecerla:</p>
            <a href="${process.env.FRONTEND_URL}/auth/new-password/${user._id as string}">Reestasblecer contraseña: </a>
            <p>E ingresa el codigo: <b>${tokenSaved.token}</b></p>
            <p>Este token expirara en: 1 Hora</p>
          `,
        });
      }
      return {
        user: { _id: user._id as string, email: user.email, name: user.name },
        emailSent: info ? true : false,
      };
    } catch (error) {
      throw errorHandleExceptions(error);
    }
  }

  public async validateToken(confirmAccountDto: ConfirmAccountDto) {
    try {
      const token = await this.authTokenModel.findOne({
        token: confirmAccountDto.token,
        userId: new Types.ObjectId(confirmAccountDto.userId),
      });
      if (!token) throw new BadRequestException(`Token was not found!`);

      return {
        message: `Valid token, you can change the password!`,
      };
    } catch (error) {
      throw errorHandleExceptions(error);
    }
  }

  public async updatePasswordWithToken(
    tokenCode: string,
    updatePasswordDto: UpdatePasswordDto,
  ) {
    try {
      const token = await this.authTokenModel.findOne({
        token: tokenCode,
        userId: new Types.ObjectId(updatePasswordDto.userId),
      });
      if (!token) throw new BadRequestException(`Token was not found!`);

      const user = await this.usersService.findOne(token.userId);
      if (!user) throw new BadRequestException(`User was not found!`);

      await Promise.allSettled([
        this.userModel.updateOne(
          { _id: new Types.ObjectId(updatePasswordDto.userId) },
          { password: hashParam(updatePasswordDto.password) },
          { new: true },
        ),
        token.deleteOne(),
      ]);
      return { message: 'User password change successfully!' };
    } catch (error) {
      throw errorHandleExceptions(error);
    }
  }

  public getUserProfile(user: User): Pick<AuthResponse, 'user'> {
    return {
      user: {
        _id: user._id as string,
        email: user.email,
        name: user.name,
      },
    };
  }

  public setJwt(payload: JwtPayload): string {
    return this.jwtService.sign(payload);
  }
}
