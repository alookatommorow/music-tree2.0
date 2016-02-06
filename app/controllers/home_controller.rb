class HomeController < ApplicationController
    def search
        results = Discog::Client.new.search(params[:query])
        render json: results
    end

    def artist_info
        results = Discog::Client.new.artist_info(params[:id])
        render json: results
    end

    def album_info
        results = Discog::Client.new.album_info(params[:id])
        render json: results
    end

    def discog
        results = Discog::Client.new.discog(params[:query])
        render json: results
    end

end