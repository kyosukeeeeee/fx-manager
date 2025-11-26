import { useState, useCallback } from "react"
import { login, type LoginPayload, type LoginResponse } from "../../../api/auth"

type UseLoginOptions = {
  onSuccess?: (data: LoginResponse) => void;
}

export function useLogin(options?: UseLoginOptions) {
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  const handleLogin = useCallback(
    async (payload: LoginPayload) => {
      setLoading(true)
      setError(null)

      try {
        const response = await login(payload)
        options?.onSuccess?.(response)
      } catch (e) {
        if (e instanceof Error) {
          setError(e.message)
        } else {
          setError("予期せぬエラーが発生しました。")
        }
      } finally {
        setLoading(false)
      }
    },
    [options]
  )

  return {
    login: handleLogin,
    loading,
    error,
  }
}