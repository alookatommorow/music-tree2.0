module Discogs
  class Client
    include HTTParty
    base_uri "https://api.discogs.com"

    def artist(artist_id = "108713")
      self.class.get("/artists/#{artist_id}")
    end

    def search(query)
      puts "*"* 100
        # self.class.get("/database/search?q=#{query}&{?artist}&key=#{ENV['CONSUMER_KEY']}&secret=#{ENV['CONSUMER_SECRET']}&per_page=100")
        # self.class.get("/database/search?artist=#{query}&type=master&key=#{ENV['CONSUMER_KEY']}&secret=#{ENV['CONSUMER_SECRET']}&per_page=100")
        self.class.get("/database/search?q=#{query}&key=#{ENV['CONSUMER_KEY']}&secret=#{ENV['CONSUMER_SECRET']}&per_page=100")
    end

    def discog(id)
      self.class.get("/artists/#{id}/releases?page=1&per_page=100")
    end

    def headers
      {"key" => ENV["CONSUMER_KEY"], "secret" => ENV["CONSUMER_SECRET"]}
    end

  end

end