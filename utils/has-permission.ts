// https://github.com/seerr-team/seerr/blob/main/server/lib/permissions.ts

import { Permission } from "@/const/permission";

export const hasPermission = (
  permissions: Permission | Permission[],
  value: number,
  type: "and" | "or" = "and"
): boolean => {
  let total = 0;

  // If we are not checking any permissions, bail out and return true
  if (permissions === 0) {
    return true;
  }

  if (Array.isArray(permissions)) {
    if (value & Permission.ADMIN) {
      return true;
    }
    if (type === "and") {
      return permissions.every((permission) => !!(value & permission));
    }
    if (type === "or") {
      return permissions.some((permission) => !!(value & permission));
    }
  } else {
    total = permissions;
  }

  return !!(value & Permission.ADMIN) || !!(value & total);
};
