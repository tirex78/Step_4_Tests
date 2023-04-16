import { CanActivate, Type } from '@nestjs/common';
import { Role } from '../role.enum';
export declare const RoleGuard: (role: Role) => Type<CanActivate>;
