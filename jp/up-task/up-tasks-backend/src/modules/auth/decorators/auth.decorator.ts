import { applyDecorators, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ProtectedRoles } from './protected-roles.decorator';
import { UserRoles } from 'src/modules/users/enums';
import { UserRoleGuard } from '../guards/auth.guard';

export function Auth(...roles: UserRoles[]) {
  return applyDecorators(
    ProtectedRoles(...roles),
    UseGuards(AuthGuard('jwt'), UserRoleGuard),
  );
}
