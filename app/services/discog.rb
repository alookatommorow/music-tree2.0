module Discog
  class Client
    include HTTParty
    include DiscogHelper

    def initialize(query)
      @query = query
    end

    base_uri "https://api.discogs.com"

    def search
      Filter.new(results).search
    end

    def artist_info
      self.class.get("/artists/#{query}").parsed_response["profile"]
    end

    def album_info
      @query = get_main_release
      self.class.get("/releases/#{query}").parsed_response
    end

    def discog
      Filter.new(results).discography
    end

    private

      attr_accessor :query

      def url
        ## this is workaround for characters like "ö" as in Motörhead being passed in as a query (something about utf vs. ascii )
        URI.parse("/database/search").tap {|url| format_url(url).to_s }
      end

      def format_url(url)
        url.query = URI::encode_www_form(search_keys.merge(required_keys))
      end

      def get_main_release
        self.class.get("/masters/#{query}").parsed_response["main_release"]
      end

      def results
        self.class.get(url).parsed_response["results"]
      end
  end
end