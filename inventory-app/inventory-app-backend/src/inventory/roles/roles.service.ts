import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Role } from './schema/role.entity';
import { Model } from 'mongoose';
import { handleException } from 'src/common/exceptions';

@Injectable()
export class RolesService {

  constructor(
    @InjectModel(Role.name)
    private readonly roleModel: Model<Role>
  ) { }

  async create(createRoleDto: CreateRoleDto): Promise<Role> {
    try {
      const existsRole = await this.roleModel.findOne({name: createRoleDto.name.toUpperCase()});
      if (existsRole) throw new HttpException('Role already exists', HttpStatus.NOT_FOUND);
      const role = await this.roleModel.create(createRoleDto);
      return await role.save();
    } catch (error) {
      handleException(error);
    }
  }

  async findAll(): Promise<Role[]> {
    try {
      return await this.roleModel.find();
    } catch (error) {
      handleException(error);
    }
  }

  async findOneByName(name: string): Promise<Role> {
    try {
      const role = await this.roleModel.findOne({ name: name, isActive: true });
      if (!role) throw new HttpException(`Role does not exists or is inactive`, HttpStatus.NOT_FOUND);
      return role;
    } catch (error) {
      handleException(error);
    }
  }

  async findOne(id: string): Promise<Role> {
    try {
      const role = await this.roleModel.findOne({ _id: id, isActive: true });
      if (!role) throw new HttpException(`Role does not exists or is inactive`, HttpStatus.NOT_FOUND);
      return role;
    } catch (error) {
      handleException(error);
    }
  }

  async update(id: string, updateRoleDto: UpdateRoleDto): Promise<Role> {
    try {
      await this.findOne(id);
      const updated = await this.roleModel.findByIdAndUpdate(id, { ...updateRoleDto }, { new: true });
      return updated;
    } catch (error) {
      handleException(error);
    }
  }

  async remove(id: string): Promise<Role> {
    try {
      await this.findOne(id);
      const updated = await this.roleModel.findByIdAndUpdate(id, { isActive: false }, { new: true });
      return updated;
    } catch (error) {
      handleException(error);
    }
  }
}
