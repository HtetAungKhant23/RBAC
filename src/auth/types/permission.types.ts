import { PermissionAction, PermissionEffect, PermissionResourceTarget, PermissionResourceType } from "../enum";

export abstract class Permission {
  readonly resourceType: PermissionResourceType;
  readonly resourceTarget: PermissionResourceTarget | string;
  readonly action: PermissionAction;
  readonly effect: PermissionEffect;
}
