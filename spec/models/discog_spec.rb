require 'rails_helper'

RSpec.describe Discog, type: :model do

  context '#search' do
    it 'should retrieve search results from Discogs API' do
      query = "thin lizzy"
      results = Discog::Client.new.search(query).parsed_response["results"]
      expect(results[0]['title'].downcase).to eq(query)
    end
  end

  context '#artist_info' do
    it 'should retrieve artist info from Discogs API' do
      id = 136188
      results = Discog::Client.new.artist_info(id).parsed_response
      expect(results["name"]).to eq("Thin Lizzy")
    end
  end

  context '#album_info' do
    it 'should retrieve album info from Discogs API' do
      id = 211463
      results = Discog::Client.new.album_info(id).parsed_response
      p results
      # expect(results["name"]).to eq("Thin Lizzy")
    end
  end

  # def album_info(id)

end
