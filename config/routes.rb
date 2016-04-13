Rails.application.routes.draw do
  match '*all', to: 'application#preflight', via: [:options]

  resources :artist_profiles, only: :show
  get '/search', to: 'searches#show'
  # get '/artist_info', to: 'home#artist_info'
  get '/album_info', to: 'home#album_info'
  get '/discog', to: 'home#discog'
  # get  '*path', to: 'home#index'
  root         to: 'home#index'
end
