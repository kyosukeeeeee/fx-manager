import React from "react"
import { useForm } from "react-hook-form"
import { useSignup } from "../hooks/useSignup"
import type { SignupResponse } from "../../../api/auth"

type FormValues = {
  name: string
  email: string
  password: string
  passwordConfirm: string
}

type SignupFormProps = {
  onSignupSuccess?: (data: SignupResponse) => void
}

export const SignupForm: React.FC<SignupFormProps> = ({ onSignupSuccess }) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      passwordConfirm: "",
    },
  })

  const { signup, isLoading, error } = useSignup({
    onSuccess: onSignupSuccess,
  })

  const onSubmit = handleSubmit(async (values) => {
    await signup({
      name: values.name,
      email: values.email,
      password: values.password,
    })
  })

  const passwordValue = watch("password")

  return (
    <form onSubmit={onSubmit} noValidate>
      <div>
        <label htmlFor="name">名前</label>
        <input
          id="name"
          type="text"
          {...register("name", {
            required: "名前は必須です",
          })}
        />
        {errors.name && <p style={{ color: "red" }}>{errors.name.message}</p>}
      </div>

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
          autoComplete="new-password"
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

      <div>
        <label htmlFor="passwordConfirm">パスワード（確認）</label>
        <input
          id="passwordConfirm"
          type="password"
          autoComplete="new-password"
          {...register("passwordConfirm", {
            required: "パスワード（確認）は必須です",
            validate: (value) =>
              value === passwordValue || "パスワードが一致していません",
          })}
        />
        {errors.passwordConfirm && (
          <p style={{ color: "red" }}>{errors.passwordConfirm.message}</p>
        )}
      </div>

      {error && (
        <p style={{ color: "red", marginTop: 8 }} role="alert">
          {error}
        </p>
      )}

      <button type="submit" disabled={isLoading} style={{ marginTop: 12 }}>
        {isLoading ? "登録中..." : "アカウントを作成"}
      </button>
    </form>
  )
}
