"use client";
import Image from "next/image";
import Autoplay from "embla-carousel-autoplay";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useToast } from "@/components/ui/use-toast";
import getQueryError from "../../helpers/getQueryError";
import DarkLogo from "../../assets/logo/logo-dark.png";
import Slide1 from "../../assets/images/sliders/slider-image-1.jpg";
import Slide2 from "../../assets/images/sliders/slider-image-2.jpg";
import Slide3 from "../../assets/images/sliders/slider-image-3.jpg";
import loginSchema, { TLoginSchema } from "../../schema/loginSchema";
import useLoginQuery from "../../hooks/useLoginQurey";
import {
  getAccessToken,
  setAccessToken,
  setUserSession,
} from "../../helpers/auth";

const LoginPage = () => {
  const { toast } = useToast();
  const { mutate } = useLoginQuery();
  const accessToken = getAccessToken();
  const router = useRouter();

  const form = useForm<TLoginSchema>({
    resolver: zodResolver(loginSchema),
  });
  const onSubmit = (values: TLoginSchema) => {
    mutate(values, {
      onError: (err) => {
        const { data } = getQueryError(err);
        toast({
          title: "Failed Login",
          description: data.message,

          variant: "destructive",
        });
      },
      onSuccess: (response) => {
        toast({
          variant: "success",
          title: "Sucess Login",
        });
        setAccessToken(response.data.data.accessToken);
        setUserSession(response.data.data.user);
        router.push("/profile-home");
      },
    });
  };

  if (accessToken) {
    router.push("/profile-home");
    return null;
  }

  return (
    <div className="flex">
      <div className="flex flex-col p-4 px-20">
        <div className="w-96  text-center">
          <div className="px-8 mt-52">
            <Image src={DarkLogo} alt="Ameritex Logo" />
          </div>
          <h1 className="font-bold mt-8 ">Welcome</h1>
          <h2>Sign in to your account</h2>
          <div className="flex flex-col gap-4 pt-4 text-left">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex flex-col"
              >
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="mail@ameritexpipe.com"
                          type="email"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="insert your password"
                          type="password"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="text-right self-end mt-4">
                  Login
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </div>
      <Carousel
        className="grow  flex items-center "
        plugins={[
          Autoplay({
            delay: 2000,
          }),
        ]}
      >
        <CarouselContent>
          <CarouselItem className="pl-0">
            <div className="h-screen p-0 relative flex items-center justify-center">
              <h1 className="absolute text-8xl font-bold text-white">
                SUSTAINABILITY
              </h1>
              <Image src={Slide1} alt="Ameritex Slide" className="h-full" />
            </div>
          </CarouselItem>

          <CarouselItem className="pl-0">
            <div className="h-screen p-0 relative flex items-center justify-center">
              <h1 className="absolute text-8xl font-bold text-white">
                SUSTAINABILITY
              </h1>
              <Image src={Slide2} alt="Ameritex Slide" className="h-full" />
            </div>
          </CarouselItem>

          <CarouselItem className="pl-0">
            <div className="h-screen p-0 relative flex items-center justify-center">
              <h1 className="absolute text-8xl font-bold text-white">
                SUSTAINABILITY
              </h1>
              <Image src={Slide3} alt="Ameritex Slide" className="h-full" />
            </div>
          </CarouselItem>
        </CarouselContent>
        <CarouselPrevious className="absolute left-8" />
        <CarouselNext className="absolute right-8" />
      </Carousel>
    </div>
  );
};

export default LoginPage;
