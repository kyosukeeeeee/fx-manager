import React from "react"
import { useForm } from "react-hook-form"
import { useLogin } from "../hooks/useLogin"
import type { LoginResponse } from "../../../api/auth"

type FormValues = {
  email: string
  password: string
}

type LoginFormProps = {
  onLoginSuccess?: (data: LoginResponse) => void
}

export const LoginForm: React.FC<LoginFormProps> = ({ onLoginSuccess }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const { login, loading, error } = useLogin({ onSuccess: onLoginSuccess })

  const onSubmit = handleSubmit(async (values) => {
    await login(values)
  })

  return (
    <form onSubmit={onSubmit} noValidate>
      <div>
        <label htmlFor="email">メールアドレス</label>
        <input
          id="email"
          type="email"
          autoComplete="email"
          {...register("email", {
            required: "メールアドレスは必須です",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "メールアドレスの形式が正しくありません",
            },
          })}
        />
        {errors.email && (
          <p style={{ color: "red" }}>{errors.email.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="password">パスワード</label>
        <input
          id="password"
          type="password"
          autoComplete="current-password"
          {...register("password", {
            required: "パスワードは必須です",
            minLength: {
              value: 8,
              message: "パスワードは8文字以上で入力してください",
            },
          })}
        />
        {errors.password && (
          <p style={{ color: "red" }}>{errors.password.message}</p>
        )}
      </div>

      {error && (
        <p style={{ color: "red", marginTop: "8px" }} role="alert">
          {error}
        </p>
      )}

      <button type="submit" disabled={loading} style={{ marginTop: "12px" }}>
        {loading ? "ログイン中..." : "ログイン"}
      </button>
    </form>
  )
}