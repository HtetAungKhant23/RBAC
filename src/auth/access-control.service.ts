import { Global, Injectable } from "@nestjs/common";
import { Role } from "@prisma/client";

interface IsAuthorizedParams {
  currentRole: Role;
  requiredRole: Role;
}

@Injectable()
export class AccessControlService {
  private socialOrders: Array<Map<string, number>> = [];
  private priority: number = 1;

  constructor() {
    this.buildRoles([Role.USER, Role.MODERATOR, Role.SUPERADMIN]);
    this.buildRoles([Role.ADMIN, Role.SUPERADMIN]);
    console.log(this.priority, " => priority");
  }

  private buildRoles(roles: Role[]) {
    const order: Map<string, number> = new Map();
    roles.forEach(role => {
      order.set(role, this.priority);
      this.priority++;
    });
    this.socialOrders.push(order);
  }

  public isAuthorized({ currentRole, requiredRole }: IsAuthorizedParams): boolean {
    for (let order of this.socialOrders) {
      const priority = order.get(currentRole);
      const requiredPriority = order.get(requiredRole);
      if (priority && requiredPriority && priority >= requiredPriority) {
        return true;
      }
    }
    return false;
  }
}
