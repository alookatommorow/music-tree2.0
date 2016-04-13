class AlbumDetailsController < ApplicationController
  def show
    results = Discog::Client.new(params[:id]).album_info
    render json: results
  end
end
