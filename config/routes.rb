Rails.application.routes.draw do
  match '*all', to: 'application#preflight', via: [:options]

  resources :artist_profiles, only: :show
  resources :album_details, only: :show
  get '/search', to: 'searches#show'
  get '/discog', to: 'home#discog'
  # get  '*path', to: 'home#index'
  root         to: 'home#index'
end
