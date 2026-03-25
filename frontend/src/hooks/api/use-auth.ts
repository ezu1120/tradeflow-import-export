import { authClient } from "@/lib/auth-client";
import { useAppDispatch } from "@/store/hooks";
import { loginUser } from "@/store/slices/auth.slices";
import { handleDeviceNetworkError } from "@/utils/network";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { handleTanstackError } from "./handlers/error";

interface SignInput {
  email: string;
  password: string;
}
export const useSignInWithEmailMutation = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  return useMutation({
    mutationFn: async (data: SignInput) => {
      const res = await authClient.signIn(data.email, data.password);

      if (res?.user) {
        toast.success("Login successful!", { position: "top-center" });
        dispatch(
          loginUser({ user: res?.user as any, token: res?.token })
        );
        navigate("/account");

        return (res as any).data;
      } else {
        handleTanstackError({
          error: null,
          options: { customMessage: (res as any).error?.message },
        });
      }
    },
  });
};

export const useSignUpWithEmailMutation = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (data: {
      email: string;
      password: string;
      name: string;
      role: string;
    }) => {
      return authClient.signUp(data.email, data.password, data.name).then(() => {
        toast("Success", {
          description: "Your account has been created successfully",
          position: "top-center",
        });
        navigate("/account");
      }).catch((error: any) => {
        toast("Unsuccessfull", {
          description: error.message,
          position: "top-center",
        });
      });
    },
  });
};
