class SearchesController < ApplicationController
  def show
    render json: Discog::Client.new(params[:query]).search
  end
end