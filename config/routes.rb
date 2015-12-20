Rails.application.routes.draw do
    match '*all', to: 'application#preflight', via: [:options]

    ACCEPT_JSON = -> (request) {
        request.accepts.include?(:json)
    }

    # scope constraints: ACCEPT_JSON do
    #     post '/search', to: 'home#search'
    #     post '/artist_info', to: 'home#artist_info'
    #     post '/album_info', to: 'home#album_info'
    # end

    get '/search', to: 'home#search'
    get '/artist_info', to: 'home#artist_info'
    get '/album_info', to: 'home#album_info'
    get '/discog', to: 'home#discog'
    # get  '*path', to: 'home#index'
    root         to: 'home#index'

end
  # The priority is based upon order of creation: first created -> highest priority.
  # See how all your routes lay out with "rake routes".

  # You can have the root of your site routed with "root"
  # root 'welcome#index'

  # Example of regular route:
  #   get 'products/:id' => 'catalog#view'

  # Example of named route that can be invoked with purchase_url(id: product.id)
  #   get 'products/:id/purchase' => 'catalog#purchase', as: :purchase

  # Example resource route (maps HTTP verbs to controller actions automatically):
  #   resources :products

  # Example resource route with options:
  #   resources :products do
  #     member do
  #       get 'short'
  #       post 'toggle'
  #     end
  #
  #     collection do
  #       get 'sold'
  #     end
  #   end

  # Example resource route with sub-resources:
  #   resources :products do
  #     resources :comments, :sales
  #     resource :seller
  #   end

  # Example resource route with more complex sub-resources:
  #   resources :products do
  #     resources :comments
  #     resources :sales do
  #       get 'recent', on: :collection
  #     end
  #   end

  # Example resource route with concerns:
  #   concern :toggleable do
  #     post 'toggle'
  #   end
  #   resources :posts, concerns: :toggleable
  #   resources :photos, concerns: :toggleable

  # Example resource route within a namespace:
  #   namespace :admin do
  #     # Directs /admin/products/* to Admin::ProductsController
  #     # (app/controllers/admin/products_controller.rb)
  #     resources :products
  #   end

