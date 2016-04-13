class HomeController < ApplicationController




    def discog
        results = Discog::Client.new(params[:query], params[:page]).discog
        render json: results
    end
end