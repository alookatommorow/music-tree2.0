class HomeController < ApplicationController
    # skip_before_filter  :verify_authenticity_token

    def index
        p "*"*100
        p ENV['CONSUMER_KEY']
    end

    def search
        results = Discogs::Client.new.search(params[:query]).parsed_response["results"]
        p "*"*100
        p results
        p "*"*100
        render json: results
    end

    def subsearch
        p params
        results = Discogs::Client.new.discog(params[:query])
        render json: results

    end

end