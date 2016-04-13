Rails.application.routes.draw do
  match '*all', to: 'application#preflight', via: [:options]

  resources :artist_profiles, only: :show
  resources :album_details, only: :show
  get '/discography', to: 'discographies#show'
  get '/search', to: 'searches#show'

  root 'home#index'
end
