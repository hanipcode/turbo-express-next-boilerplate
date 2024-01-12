"use client";

import { useRouter } from "next/navigation";
import { PropsWithChildren } from "react";
import { getAccessToken } from "../../helpers/auth";

const AuthGuard = ({ children }: PropsWithChildren) => {
  const token = getAccessToken();
  const router = useRouter();
  if (!token) {
    router.push("/login");
    return null;
  }

  return children;
};

export default AuthGuard;
