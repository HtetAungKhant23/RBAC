import { SetMetadata } from "@nestjs/common";
import { PermissionAction, PermissionEffect, PermissionResourceTarget, PermissionResourceType } from "../enum";

export const Requested_Permission = "req_permissions";

export const RequiredPermission = (resourceType: PermissionResourceType, action: PermissionAction, resourceTarget: PermissionResourceTarget) =>
  SetMetadata(Requested_Permission, { resourceType, action, resourceTarget, effect: PermissionEffect.ALLOW });
