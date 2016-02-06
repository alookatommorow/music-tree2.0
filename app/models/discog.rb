module Discog
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

    def discog(query)
      ## this is workaround for characters like "ö" as in Motörhead being passed in as a query (which can also break the search right now)
      url = URI.parse("/database/search")
      url.query = URI::encode_www_form(
        {
          'type' => "master",
          'artist' => "#{query}",
          'key' => "#{ENV['CONSUMER_KEY']}",
          'secret' => "#{ENV['CONSUMER_SECRET']}",
          'per_page' => 100
        }
      )
      (self.class.get(url.to_s)).parsed_response["results"]
    end

  end

end