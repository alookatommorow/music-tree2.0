module Discog
  class Client
    include HTTParty

    base_uri "https://api.discogs.com"

    def search(query)
      search_filter(self.class.get(format_url(query, false)).parsed_response["results"])
    end

    def artist_info(query)
      self.class.get("/artists/#{query}").parsed_response["profile"]
    end

    def album_info(query)
      self.class.get("/masters/#{query}").parsed_response
    end

    def discog(query)
      url = format_url(query, true)
      results = eliminate_nil(self.class.get(url).parsed_response["results"])
      discography_filter(sort_by_year(results))
    end

    private

      def format_url(query, is_discog)
        ## this is workaround for characters like "ö" as in Motörhead being passed in as a query (something about utf vs. ascii )
        url = URI.parse("/database/search")
        search_keys = {'q' => "#{query}"}
        discog_keys = {'type' => "master", 'artist' => "#{query}"}
        required_keys = {
            'key' => "#{ENV['CONSUMER_KEY']}",
            'secret' => "#{ENV['CONSUMER_SECRET']}",
            'per_page' => 100
          }
        if is_discog
          url.query = URI::encode_www_form(discog_keys.merge(required_keys))
        else
          url.query = URI::encode_www_form(search_keys.merge(required_keys))
        end
        url.to_s
      end

      def sort_by_year(results)
        results.sort_by { |item| item["year"] }
      end

      def eliminate_nil(results)
        results.select { |result| result["year"] }
      end

      def search_filter(results)
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

      def discography_filter(results)
        eps = []
        lps = []
        results.each do |album|
          if (album["format"] & ['Album', 'Compilation']).any?
            lps.push(album)
          else
            eps.push(album)
          end
        end
        {all: results, eps: eps, lps: lps}
      end

  end

end