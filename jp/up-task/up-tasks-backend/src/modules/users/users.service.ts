import { Injectable } from '@nestjs/common';
import { NewAccountDto } from '../auth/dto/new-account.dto';
import { errorHandleExceptions } from 'src/common/exceptions/error-handle.exception';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schemas';
import { Model } from 'mongoose';
import { UserResponse } from './types';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<User>,
  ) {}

  public async createFromNewAccount(
    newAccountDto: NewAccountDto,
  ): Promise<User> {
    try {
      const user = await this.userModel.create(newAccountDto);
      return await user.save();
    } catch (error) {
      throw errorHandleExceptions(error);
    }
  }

  public async findByEmail(email: string): Promise<User | null> {
    try {
      const user = await this.userModel.findOne({email: email});
      return user;
    } catch (error) {
      throw errorHandleExceptions(error);
    }
  }

  public async findOne(userId: string): Promise<User | null> {
    try {
      const user = await this.userModel.findOne({ _id: userId });
      return user;
    } catch (error) {
      throw errorHandleExceptions(error);
    }
  }

  public async confirmUserAccount(userId: string, confirmed: boolean): Promise<User> {
    try {
      const user = await this.userModel.findByIdAndUpdate({ _id: userId }, { confirmed: confirmed }, { new: true });
      return user!;
    } catch (error) {
      throw errorHandleExceptions(error);
    }
  }

  public userWithOutPwd(user: User): UserResponse {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: _, ...userWithoutPassword } = user.toJSON();
    return userWithoutPassword as UserResponse;
  }

}
