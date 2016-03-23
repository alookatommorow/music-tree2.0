require 'rails_helper'

RSpec.describe Discog, type: :model do

  context '#search' do
    it 'should retrieve artist and album results from Discogs API' do
      stub_request(:get, "https://api.discogs.com/database/search?q=Weezer&key=#{ENV['CONSUMER_KEY']}&secret=#{ENV['CONSUMER_SECRET']}&per_page=100").
         with(:headers => {'Accept'=>'*/*', 'Accept-Encoding'=>'gzip;q=1.0,deflate;q=0.6,identity;q=0.3', 'User-Agent'=>'Ruby'}).
         to_return(:status => 200, :body => File.open('spec/support/search.json').read, :headers => {"Content-type" => "application/json; charset=utf-8"})

      results = Discog::Client.new("Weezer").search
      response = JSON.parse(File.open('spec/support/search.json').read)
      expected = Filter.new(response["results"]).search

      expect(results).to eq(expected)
    end
  end

  context '#artist_info' do
    it 'should retrieve artist info from Discogs API' do
      stub_request(:get, "https://api.discogs.com/artists/136188").
         with(:headers => {'Accept'=>'*/*', 'Accept-Encoding'=>'gzip;q=1.0,deflate;q=0.6,identity;q=0.3', 'User-Agent'=>'Ruby'}).
         to_return(:status => 200, :body => File.open('spec/support/artist_info.json').read, :headers => {"Content-type" => "application/json; charset=utf-8"})

      expected = JSON.parse(File.open('spec/support/artist_info.json').read)["profile"]
      results = Discog::Client.new(136188).artist_info

      expect(results).to eq(expected)
    end
  end

  context '#discog' do
    it 'should retrieve artist discography from Discogs API' do
      stub_request(:get, "https://api.discogs.com/artists/obituary/releases?key=#{ENV['CONSUMER_KEY']}&per_page=100&secret=#{ENV['CONSUMER_SECRET']}&sort=year").
         with(:headers => {'Accept'=>'*/*', 'Accept-Encoding'=>'gzip;q=1.0,deflate;q=0.6,identity;q=0.3', 'User-Agent'=>'Ruby'}).
         to_return(:status => 200, :body => File.open('spec/support/discog.json').read, :headers => {"Content-type" => "application/json; charset=utf-8"})

      results = Discog::Client.new("obituary").discog
      response = JSON.parse(File.open('spec/support/discog.json').read)
      expected = Filter.new(response["releases"]).discography

      expect(results).to eq(expected)
    end
  end

  context '#album_info' do
    it 'should retrieve album info from Discogs API' do
      stub_request(:get, "https://api.discogs.com/masters/38356").
         with(:headers => {'Accept'=>'*/*', 'Accept-Encoding'=>'gzip;q=1.0,deflate;q=0.6,identity;q=0.3', 'User-Agent'=>'Ruby'}).
         to_return(:status => 200, :body => File.open('spec/support/album_info.json').read, :headers => {"Content-type" => "application/json; charset=utf-8"})

      expected = JSON.parse(File.open('spec/support/album_info.json').read)
      results = Discog::Client.new(38356).album_info

      expect(results).to eq(expected)
    end
  end
end
