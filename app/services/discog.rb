module Discog
  class Client
    include HTTParty
    include UriHelper

    def initialize(query, page = 1)
      @query = query
      @page = page
    end

    base_uri "https://api.discogs.com"

    def search
      Filter.new(search_results).search
    end

    def artist_profile
      self.class.get("/artists/#{query}").parsed_response["profile"]
    end

    def album_details
      @query = get_main_release
      self.class.get("/releases/#{query}").parsed_response
    end

    def discography
      discography_results
    end

    private

      attr_reader :query, :page

      def get_main_release
        self.class.get("/masters/#{query}").parsed_response["main_release"]
      end

      def search_results
        self.class.get(search_url).parsed_response["results"]
      end

      def discography_results
        results = self.class.get(discography_url).parsed_response
        {
          releases: Filter.new(results["releases"]).discography,
          pages: results["pagination"]["pages"]
        }
      end
  end
end