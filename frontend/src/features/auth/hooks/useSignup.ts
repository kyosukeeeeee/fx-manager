import { useCallback, useState } from "react"
import { signup, type SignupPayload, type SignupResponse } from "../../../api/auth"

type UseSignupOptions = {
  onSuccess?: (data: SignupResponse) => void
}

export function useSignup(options?: UseSignupOptions) {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSignup = useCallback(
    async (payload: SignupPayload) => {
      setIsLoading(true)
      setError(null)

      try {
        const response = await signup(payload)
        options?.onSuccess?.(response)
      } catch (e) {
        if (e instanceof Error) {
          setError(e.message);
        } else {
          setError("予期せぬエラーが発生しました。");
        }
      } finally {
        setIsLoading(false);
      }
    },
    [options]
  );

  return {
    signup: handleSignup,
    isLoading,
    error,
  };
}
