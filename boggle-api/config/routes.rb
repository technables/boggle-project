Rails.application.routes.draw do
  get 'home/index'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  namespace :v1, defaults: {format: "json"} do 
    get "api", to: "api#index"
    get "api/initboard", to: 'api#initboard'
    get 'api/processword', to: 'api#processword'
  end

  root 'home#index'

  get "*page", to: "home#index", constraints: ->(req) do
    !req.xhr? && req.format.html?
  end
  

end
