import { Injectable, Dependencies, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from './roles.decorator';

@Injectable()
@Dependencies(Reflector)
export class RolesGuard {
  
  constructor(public reflector) {
    this.reflector = reflector;
  }

  canActivate(context : ExecutionContext) {
  
      const requiredRoles = this.reflector.getAllAndOverride(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredRoles) {
      return true;
    }
    const { user } = context.switchToHttp().getRequest();
   
    return requiredRoles.some((role) => user.roles.includes(role));
  }
}

