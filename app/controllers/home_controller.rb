class HomeController < ApplicationController

    def index

    end

    def search
        results = Discogs::Client.new.search(params[:query]).parsed_response["results"]
        render json: results
    end

    def artist_info
        p params
        results = Discogs::Client.new.artist_info(params[:id]).parsed_response
        p "*"*100
        p results
        p "*"*100
        render json: results
    end

    def album_info
        results = Discogs::Client.new.album_info(params[:id]).parsed_response
        p "*"*100
        p results
        p "*"*100
        render json: results
    end

    def discog
        results = Discogs::Client.new.discog(params[:id]).parsed_response
        p "*"*100
        p results
        p "*"*100
        render json: results
    end

end