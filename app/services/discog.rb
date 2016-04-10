module Discog
  class Client
    include HTTParty
    include DiscogHelper

    def initialize(query, page = 1)
      @query = query
      @page = page
    end

    base_uri "https://api.discogs.com"

    def search
      Filter.new(search_results).search
    end

    def artist_info
      self.class.get("/artists/#{query}").parsed_response["profile"]
    end

    def album_info
      @query = get_main_release
      self.class.get("/releases/#{query}").parsed_response
    end

    def discog
      discog_results
    end

    private

      attr_accessor :query
      attr_reader :page

      def search_url
        ## this is workaround for characters like "ö" as in Motörhead being passed in as a query (something about utf vs. ascii )
        URI.parse("/database/search").tap {|url| format_url(url, search_keys).to_s }
      end

      def discog_url
        URI.parse("/artists/#{query}/releases").tap {|url| format_url(url, discog_keys).to_s }
      end

      def format_url(url, keys)
        url.query = URI::encode_www_form(keys.merge(required_keys))
      end

      def get_main_release
        self.class.get("/masters/#{query}").parsed_response["main_release"]
      end

      def search_results
        self.class.get(search_url).parsed_response["results"]
      end

      def discog_results
        results = self.class.get(discog_url).parsed_response
        filtered = Filter.new(results["releases"]).discography
        {
          releases: filtered,
          pages: results["pagination"]["pages"]
        }
      end
  end
end