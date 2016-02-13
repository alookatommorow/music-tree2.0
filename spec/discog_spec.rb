require 'rails_helper'

RSpec.describe Discog, type: :model do

  # context '#search' do
  #   it 'should retrieve search results from Discogs API' do
  #     query = "thin lizzy"
  #     results = Discog::Client.new.search(query)
  #     expect(results[0]["title"].downcase).to eq(query)
  #   end
  # end

  # context '#sort_by_year' do
  #   it 'should return albums sorted by year' do

  #   end
  # end

  context '#artist_info' do
    it 'should retrieve artist info from Discogs API' do
      stub_request(:get, "https://api.discogs.com/artists/136188").
         with(:headers => {'Accept'=>'*/*', 'Accept-Encoding'=>'gzip;q=1.0,deflate;q=0.6,identity;q=0.3', 'User-Agent'=>'Ruby'}).
         to_return(:status => 200, :body => "", :headers => {})
      id = 136188
      results = Discog::Client.new.artist_info(id)
      expect(results["name"]).to eq("Thin Lizzy")
    end
  end

  # context '#album_info' do
  #   it 'should retrieve album info from Discogs API' do
  #     id = 211463
  #     results = Discog::Client.new.album_info(id)
  #     expect(results["title"]).to eq("Thin Lizzy")
  #   end
  # end




  # context '#discog' do
  #   it 'should retrieve discography from Discogs API' do
  #     query = "thin lizzy"
  #     results = Discog::Client.new.discog(query)
  #     expect(results[0]["type"]).to eq('master')
  #   end
  # end


end
