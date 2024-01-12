import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import DarkLogo from "../../assets/logo/logo-dark.png";

const LoginPage = () => {
  return (
    <div className="flex">
      <div className="flex flex-col p-4 px-20">
        <div className="w-96  text-center">
          <div className="px-8 mt-52">
            <Image src={DarkLogo} alt="Ameritex Logo" />
          </div>
          <h1 className="font-bold mt-8 ">Welcome</h1>
          <h2>Sign in to your account</h2>
          <div className="flex flex-col gap-4 pt-4">
            <Input type="email" id="email" placeholder="Email" />
            <Input type="email" id="email" placeholder="Email" />
            <Button>Login</Button>
          </div>
        </div>
      </div>
      <div className="grow bg-red-500 h-screen"></div>
    </div>
  );
};

export default LoginPage;
