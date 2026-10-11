import { useRouter } from "next/navigation";
import { useAppDispatch } from "../redux-hooks";
import { useMutation } from "@tanstack/react-query";
import { authApi } from "@/features/auth/auth-api";
import { showNotification } from "@/stores/thunks/notification-thunks";

export const useSignup = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  return useMutation({
    mutationFn: authApi.signup,
    onSuccess: () => {
      dispatch(
        showNotification({ message: "Signup successfully", type: "info" }),
      );
      router.push("/verify");
    },
  });
};
