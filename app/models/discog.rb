module Discog
  class Client
    include HTTParty
    include DiscogHelper

    def initialize(query, is_discog = false)
      @query = query
      @is_discog = is_discog
    end

    base_uri "https://api.discogs.com"

    def search
      search_filter(parsed_results)
      # Filter.new.search
    end

    def artist_info
      self.class.get("/artists/#{query}").parsed_response["profile"]
    end

    def album_info
      self.class.get("/masters/#{query}").parsed_response
    end

    def discog
      discography_filter(parsed_results)
      # Filter.new(query).discography
    end

    private

      attr_reader :query, :is_discog

      def url
        ## this is workaround for characters like "ö" as in Motörhead being passed in as a query (something about utf vs. ascii )
        URI.parse("/database/search").tap {|url| format_url(url).to_s }
      end

      def format_url(url)
        if is_discog
          url.query = URI::encode_www_form(discog_keys.merge(required_keys))
        else
          url.query = URI::encode_www_form(search_keys.merge(required_keys))
        end
      end

      def parsed_results
        self.class.get(url).parsed_response["results"]
      end

  end
end