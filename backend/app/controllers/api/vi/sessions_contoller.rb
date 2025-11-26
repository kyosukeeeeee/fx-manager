module Api
  module V1
    class SessionsController < ApplicationController
      # CSRF をどうするかは構成次第だけど、とりあえず無効でも良い（SPA想定）
      protect_from_forgery with: :null_session

      def create
        user = User.find_by(email: params[:email])

        if user&.authenticate(params[:password])
          # ここで本当は JWT とか発行するのがベスト
          render json: {
            user: {
              id: user.id,
              name: user.name,
              email: user.email
            },
            token: "dummy-token" # 仮のトークン。あとで JWT に差し替え
          }, status: :ok
        else
          render json: { message: "メールアドレスまたはパスワードが正しくありません" },
                 status: :unauthorized
        end
      end
    end
  end
end
