class HomeController < ApplicationController
    skip_before_filter  :verify_authenticity_token

    def index

    end

    def search
        p params
        results = Discogs::Client.new.search(params[:query], params[:specs])
        render json: results
    end

    def subsearch
        p params
        results = Discogs::Client.new.discog(params[:query])
        render json: results

    end

end