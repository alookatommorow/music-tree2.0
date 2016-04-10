class HomeController < ApplicationController
    def search
        results = Discog::Client.new(params[:query]).search
        render json: results
    end

    def artist_info
        results = {profile: Discog::Client.new(params[:query]).artist_info}
        render json: results
    end

    def album_info
        results = Discog::Client.new(params[:query]).album_info
        render json: results
    end

    def discog
        results = Discog::Client.new(params[:query], params[:page]).discog
        render json: results
    end
end