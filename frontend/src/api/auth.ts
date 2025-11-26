export type LoginPayload = {
  email: string
  password: string
}

export type LoginResponse = {
  token: string, //何に使うか不明
  user: {
    id: string
    name: string
    email: string //何に使うか不明
  }
}

export async function login(payload: LoginPayload): Promise<LoginResponse> {
  const response = await fetch("/api/login", {
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