import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Role_Key } from "../decorators/role.decorator";
import { Observable } from "rxjs";
import { AccessControlService } from "../access-control.service";
import { Role } from "@prisma/client";

export type currentUserDto = {
  id: string;
  role: Role;
};

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private reflector: Reflector, private accessControlService: AccessControlService) {}

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(Role_Key, [context.getHandler(), context.getClass()]);
    const request = context.switchToHttp().getRequest();
    const currentUser = request["user"] as currentUserDto;

    for (let role of requiredRoles) {
      const result = this.accessControlService.isAuthorized({ currentRole: currentUser.role, requiredRole: role });
      if (result) {
        return true;
      }
    }

    return false;
  }
}
