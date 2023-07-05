# frozen_string_literal: true

Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      get 'health_check', to: 'health_check#index'
      root 'articles#index'
      resources :articles, param: :slug, only: %i[show create update destroy]
    end
  end
end
