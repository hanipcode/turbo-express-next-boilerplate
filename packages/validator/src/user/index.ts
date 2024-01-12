import { z } from "zod";
import { D } from "@mobily/ts-belt";

export const ROLES = {
  Super: "Super",
  Administrator: "Administrator",
  Corporate: "Corporate",
  Production: "Production",
  Personnel: "Personnel",
  HR: "HR",
  HRDirector: "HR Director",
  Accounting: "Accounting",
  Sales: "Sales",
} as const;

export const USER_STATUS = {
  Approved: "Approved",
  Rejected: "Rejected",
  Archived: "Archived",
  Blocked: "Blocked",
  Pending: "Pending",
} as const;

export const ROLES_KEY = D.keys(ROLES);
export const USER_STATUS_KEY = D.keys(USER_STATUS);

export const ZUserRoles = z.enum(["", ...ROLES_KEY]);
export const ZUserStatus = z.enum(["", ...USER_STATUS_KEY]);

export const ZUser = z.object({
  _id: z.union([z.string(), z.any()]).refine((data: any) => {
    if (typeof data === "string") {
      return data;
    }
    return data.toString();
  }),
  firstName: z.string(),
  lastName: z.string(),
  role: z.string(ZUserRoles),
  status: z.string(ZUserStatus),
});
export type T_User = z.infer<typeof ZUser>;
