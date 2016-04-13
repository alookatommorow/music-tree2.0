class SearchesController < ApplicationController
  def show
    results = Discog::Client.new(params[:query]).search
    render json: results
  end
end