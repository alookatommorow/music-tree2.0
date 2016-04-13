class ArtistProfilesController < ApplicationController
  def show
    results = {profile: Discog::Client.new(params[:id]).artist_info}
    render json: results
  end
end

