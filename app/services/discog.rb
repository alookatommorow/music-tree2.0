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
      Filter.new(results).search
    end

    def artist_info
      self.class.get("/artists/#{query}").parsed_response["profile"]
    end

    def album_info
      self.class.get("/masters/#{query}").parsed_response
    end

    def discog
      Filter.new(results).discography
    end

    private

      attr_reader :query, :is_discog

      def url(n = nil)
        ## this is workaround for characters like "ö" as in Motörhead being passed in as a query (something about utf vs. ascii )
        URI.parse("/database/search").tap {|url| format_url(url, n).to_s }
      end

      def format_url(url, n)
        if is_discog
          page_num = {'page' => "#{n}"}
          url.query = URI::encode_www_form(discog_keys.merge(page_num).merge(required_keys))
        else
          url.query = URI::encode_www_form(search_keys.merge(required_keys))
        end
      end

      def results
        if is_discog
          self.class.get("/artists/#{query}/releases?sort=year&key=#{ENV['CONSUMER_KEY']}&secret=#{ENV['CONSUMER_SECRET']}&per_page=100").parsed_response["releases"]
        else
          self.class.get(url).parsed_response["results"]
        end
      end
  end
end