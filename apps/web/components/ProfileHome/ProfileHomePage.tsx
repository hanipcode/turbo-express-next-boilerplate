"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { getUserSession } from "../../helpers/auth";
import useLogout from "../../hooks/useLogout";

const ProfileHomePage = () => {
  const user = getUserSession();
  const { mutate: logout } = useLogout();
  return (
    <div className="p-8">
      <Card>
        <CardHeader>Hi, </CardHeader>
        <CardContent>
          Welcome {user?.firstName} {user?.lastName}
        </CardContent>
        <CardFooter>
          <Button onClick={() => logout()}>Logout</Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ProfileHomePage;
