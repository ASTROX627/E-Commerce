import { useRouter } from "next/navigation";
import { useAppDispatch } from "../redux-hooks"
import { useMutation } from "@tanstack/react-query";
import { authApi } from "@/features/auth/auth-api";
import { showNotification } from "@/stores/thunks/notification-thunks";

export const useSignin = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  return useMutation({
    mutationFn: authApi.signin,
    onSuccess: () => {
      dispatch(showNotification({message: "Signin successfully", type: "info"}));
      router.push("/")
    }
  })
}
