module Discog
  class Client
    include HTTParty

    base_uri "https://api.discogs.com"

    def search(query)
      search_filter(self.class.get(format_search_url(query)).parsed_response["results"])
    end

    def artist_info(id)
      self.class.get("/artists/#{id}").parsed_response
    end

    def album_info(id)
      self.class.get("/masters/#{id}").parsed_response
    end

    def discog(query)
      url = format_discog_url(query)
      results = eliminate_nil(self.class.get(url).parsed_response["results"])
      discography_filter(sort_by_year(results))
    end

    private

      def format_discog_url(query)
        ## this is workaround for characters like "ö" as in Motörhead being passed in as a query (something about utf vs. ascii )
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
        url.to_s
      end

      def format_search_url(query)
        ## this is workaround for characters like "ö" as in Motörhead being passed in as a query (something about utf vs. ascii )
        url = URI.parse("/database/search")
        url.query = URI::encode_www_form(
          {
            'q' => "#{query}",
            'key' => "#{ENV['CONSUMER_KEY']}",
            'secret' => "#{ENV['CONSUMER_SECRET']}",
            'per_page' => 100
          }
        )
        url.to_s
      end

      def sort_by_year(results)
        results.sort_by {|item| item["year"] }
      end

      def eliminate_nil(results)
        results.select {|result| result["year"]}
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
          if album["format"].include?('Album') || album["format"].include?('Compilation')
            lps.push(album);
          else
            eps.push(album)
          end
        end
        {all: results, eps: eps, lps: lps}
      end

  end

end