# app/controllers/api/v1/registrations_controller.rb
module Api
  module V1
    class RegistrationsController < ApplicationController
      # APIモードで CSRF をどう扱うかは構成によるけど、
      # SPA からの JSON API だけなら基本無効にしておいてOKなことが多い
      protect_from_forgery with: :null_session if respond_to?(:protect_from_forgery)

      def create
        user = User.new(user_params)

        Rails.logger.debug("デバッグ: #{user_params.inspect}")

        if user.save
          # 本当はここで JWT 発行などする。いったんダミーのトークンにしておく
          token = "dummy-token"

          render json: {
            user: {
              id: user.id,
              name: user.name,
              email: user.email
            },
            token: token
          }, status: :created
        else
          render json: {
            message: "サインアップに失敗しました",
            errors: user.errors.full_messages
          }, status: :unprocessable_entity
        end
      end

      private

      # フロントからは { name, email, password } が
      # JSON のトップレベルで飛んでくる想定
      def user_params
        params.permit(:name, :email, :password)
      end
    end
  end
end
