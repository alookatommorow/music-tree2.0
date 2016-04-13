class DiscographiesController < ApplicationController
  def show
    render json: Discog::Client.new(params[:query], params[:page]).discography
  end
end