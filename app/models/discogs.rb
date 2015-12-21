module Discogs
  class Client
    include HTTParty
    base_uri "https://api.discogs.com"

    def search(query)
      self.class.get("/database/search?q=#{query}&key=#{ENV['CONSUMER_KEY']}&secret=#{ENV['CONSUMER_SECRET']}&per_page=100")
    end

    def artist_info(id)
      self.class.get("/artists/#{id}")
    end

    def album_info(id)
      self.class.get("/masters/#{id}")
    end

    def discog(id)
      self.class.get("/artists/#{id}/releases?page=1&per_page=100")
    end

    def headers
      {"key" => ENV["CONSUMER_KEY"], "secret" => ENV["CONSUMER_SECRET"]}
    end

  end

end