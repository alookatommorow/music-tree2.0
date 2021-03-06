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

  context '#artist_profile' do
    it 'should retrieve artist info from Discogs API' do
      stub_request(:get, "https://api.discogs.com/artists/136188").
        with(:headers => {'Accept'=>'*/*', 'Accept-Encoding'=>'gzip;q=1.0,deflate;q=0.6,identity;q=0.3', 'User-Agent'=>'Ruby'}).
        to_return(:status => 200, :body => File.open('spec/support/artist_info.json').read, :headers => {"Content-type" => "application/json; charset=utf-8"})

      expected = JSON.parse(File.open('spec/support/artist_info.json').read)["profile"]
      results = Discog::Client.new(136188).artist_profile

      expect(results).to eq(expected)
    end
  end

  context '#discography' do
    it 'should retrieve artist discography from Discogs API' do
      stub_request(:get, "https://api.discogs.com/artists/251635/releases?key=#{ENV['CONSUMER_KEY']}&page=1&per_page=50&secret=#{ENV['CONSUMER_SECRET']}&sort=year").
        with(:headers => {'Accept'=>'*/*', 'Accept-Encoding'=>'gzip;q=1.0,deflate;q=0.6,identity;q=0.3', 'User-Agent'=>'Ruby'}).
        to_return(:status => 200, :body => File.open('spec/support/discog.json').read, :headers => {"Content-type" => "application/json; charset=utf-8"})

      results = Discog::Client.new(251635).discography
      response = JSON.parse(File.open('spec/support/discog.json').read)
      expected_releases = Filter.new(response["releases"]).discography
      expected = {
          releases: expected_releases,
          pages: response["pagination"]["pages"]
        }

      expect(results).to eq(expected)
    end
  end

  context '#album_details' do
    it 'should retrieve album info from Discogs API' do
      stub_request(:get, "https://api.discogs.com/masters/38356").
        with(:headers => {'Accept'=>'*/*', 'Accept-Encoding'=>'gzip;q=1.0,deflate;q=0.6,identity;q=0.3', 'User-Agent'=>'Ruby'}).
        to_return(:status => 200, :body => File.open('spec/support/main_release.json').read, :headers => {"Content-type" => "application/json; charset=utf-8"})

      stub_request(:get, "https://api.discogs.com/releases/1294792").
        with(:headers => {'Accept'=>'*/*', 'Accept-Encoding'=>'gzip;q=1.0,deflate;q=0.6,identity;q=0.3', 'User-Agent'=>'Ruby'}).
        to_return(:status => 200, :body => File.open('spec/support/album_info.json').read, :headers => {"Content-type" => "application/json; charset=utf-8"})


      expected = JSON.parse(File.open('spec/support/album_info.json').read)
      results = Discog::Client.new(38356).album_details

      expect(results).to eq(expected)
    end
  end
end
