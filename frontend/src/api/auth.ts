export type LoginPayload = {
  email: string
  password: string
}

export type LoginResponse = {
  token: string,
  user: {
    id: string
    name: string
    email: string
  }
}

export type SignupPayload = {
  name: string
  email: string
  password: string
}

export type SignupResponse = LoginResponse

export async function login(payload: LoginPayload): Promise<LoginResponse> {
  const response = await fetch("/api/v1/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(payload)
  })

  if (!response.ok) {
    let message = "ログインに失敗しました。"
    try {
      const data = await response.json()
      if (data?.message) message = data.message
    } catch {
      // JSON じゃなかったらデフォルトメッセージ
    }
    throw new Error(message)
  }

  return response.json()
}

export async function signup(payload: SignupPayload): Promise<SignupResponse> {
  const response = await fetch("/api/v1/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(payload)
  })

  if (!response.ok) {
    let message = "サインアップに失敗しました。"
    try {
      const data = await response.json()
      if (data?.message) message = data.message
    } catch {
      // JSON じゃなかったらデフォルトメッセージ
    }
    throw new Error(message)
  }

  return response.json()
}