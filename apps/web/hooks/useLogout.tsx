import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { useToast } from "@/components/ui/use-toast";
import apmsAxios from "../helpers/apmsAxios";
import { clearAccessToken, clearUserSession } from "../helpers/auth";

const logout = () => apmsAxios.delete("/users/logout");

const useLogout = () => {
  const router = useRouter();
  const { toast } = useToast();
  const query = useMutation({
    mutationFn: logout,
    onError: (err) => {
      toast({
        title: "Failed to logout",
        description: err.message,
        variant: "destructive",
      });
    },
    onSuccess: () => {
      clearAccessToken();
      clearUserSession();
      router.replace("/login");
    },
  });
  return query;
};

export default useLogout;
