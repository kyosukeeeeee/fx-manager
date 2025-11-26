Rails.application.routes.draw do
  resources :trades

  namespace :api do
    namespace :v1 do
      post "login", to: "sessions#create"
    end
  end
end
