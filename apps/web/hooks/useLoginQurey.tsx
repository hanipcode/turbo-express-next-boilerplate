import { useMutation } from "@tanstack/react-query";
import { TBackendResponse, T_User } from "@repo/validator";
import apmsAxios from "../helpers/apmsAxios";
import { TLoginSchema } from "../schema/loginSchema";

type TResponse = TBackendResponse<{
  accessToken: string;
  user: T_User;
}>;

const login = (param: TLoginSchema) =>
  apmsAxios.post<TResponse>("/users/login", param);

const useLoginQuery = () => {
  const query = useMutation({ mutationFn: login });

  return query;
};

export default useLoginQuery;
