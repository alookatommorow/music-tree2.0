class DiscographiesController < ApplicationController
  def show
    results = Discog::Client.new(params[:query], params[:page]).discog
    render json: results
  end
end