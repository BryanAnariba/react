import { SetMetadata } from '@nestjs/common';
import { UserRoles } from 'src/modules/users/enums';

export const MetaRoles: string = 'ROLES';

export const ProtectedRoles = (...args: UserRoles[]) => {
  return SetMetadata(MetaRoles, args);
};
