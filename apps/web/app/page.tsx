"use client";
import { useRouter } from "next/navigation";
import { getAccessToken } from "../helpers/auth";

const RootPath = () => {
  const router = useRouter();
  if (process.browser) {
    const accessToken = getAccessToken();
    if (accessToken) {
      router.push("/profile-home");
      return;
    }
    router.push("/login");
  }
};

export default RootPath;
