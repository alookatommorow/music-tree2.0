class HomeController < ApplicationController
    # skip_before_filter  :verify_authenticity_token

    def index
        p "*"*100
        p ENV['CONSUMER_KEY']
    end

    def search
        results = Discogs::Client.new.search(params[:query]).parsed_response["results"]
        render json: results
    end

    def artist_search
        results = Discogs::Client.new.artist_search(params[:query]).parsed_response["results"]
        render json: results
    end

    def album_search
        results = Discogs::Client.new.album_search(params[:query]).parsed_response["results"]
        render json: results
    end

    def discog
        results = Discogs::Client.new.discog(params[:query]).parsed_response["results"]
        render json: results
    end

    def subsearch
        p params
        results = Discogs::Client.new.discog(params[:query])
        render json: results

    end

end