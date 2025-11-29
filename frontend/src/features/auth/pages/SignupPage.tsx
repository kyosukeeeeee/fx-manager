import React from "react"
import { useNavigate, Link } from "react-router-dom"
import { SignupForm } from "../components/SignupForm"
import type { SignupResponse } from "../../../api/auth"

export const SignupPage: React.FC = () => {
  const navigate = useNavigate()

  const handleSignupSuccess = (response: SignupResponse) => {
    localStorage.setItem("access_token", response.token)

    navigate("/dashboard")
  }

  return (
    <main>
      <h1>新規登録</h1>
      <SignupForm onSignupSuccess={handleSignupSuccess} />

      <p style={{ marginTop: 16 }}>
        すでにアカウントをお持ちですか？{" "}
        <Link to="/login">ログインはこちら</Link>
      </p>
    </main>
  )
}