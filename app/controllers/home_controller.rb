class HomeController < ApplicationController


    def album_info
        results = Discog::Client.new(params[:query]).album_info
        render json: results
    end

    def discog
        results = Discog::Client.new(params[:query], params[:page]).discog
        render json: results
    end
end