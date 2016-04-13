class ArtistProfilesController < ApplicationController
  def show
    # put in hash to avoid weird behavior with
    render json: {profile: Discog::Client.new(params[:id]).artist_profile}
  end
end

