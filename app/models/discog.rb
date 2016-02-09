module Discog
  class Client
    include HTTParty

    base_uri "https://api.discogs.com"

    def search(query)
      filter_search(self.class.get("/database/search?q=#{query}&key=#{ENV['CONSUMER_KEY']}&secret=#{ENV['CONSUMER_SECRET']}&per_page=100").parsed_response["results"])
    end

    def artist_info(id)
      self.class.get("/artists/#{id}").parsed_response
    end

    def album_info(id)
      self.class.get("/masters/#{id}").parsed_response
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
      sort_by_year(self.class.get(url.to_s).parsed_response["results"])
    end

    private
      def sort_by_year(results)
        results.sort_by {|item| item[:year] }
      end

      def filter_search(results)
        artistResults = []
        albumResults = []
        results.each do |result|
          if result["type"] == "artist"
            artistResults.push(result)
          elsif result["type"] == "master"
            albumResults.push(result)
          end
        end
        { artistResults: artistResults, albumResults: albumResults }
      end

      def sort_discography(results)
        eps = []
        lps = []
        results.each do |album|
          if (album["format"].includes('Album') || album.format.includes('Compilation')) {
            lps.push(album);
          }
          else {
            eps.push(album)
          }

        end

        {all: results, eps: eps, lps: lps}
      end

  end

end