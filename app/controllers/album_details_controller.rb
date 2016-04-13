class AlbumDetailsController < ApplicationController
  def show
    render json: Discog::Client.new(params[:id]).album_details
  end
end
