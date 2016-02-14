module Discog
  class Client
    include HTTParty
    include DiscogHelper

    base_uri "https://api.discogs.com"

    def search(query)
      search_filter(parsed_results(query, false))
    end

    def artist_info(query)
      self.class.get("/artists/#{query}").parsed_response["profile"]
    end

    def album_info(query)
      self.class.get("/masters/#{query}").parsed_response
    end

    def discog(query)
      results = eliminate_nil(parsed_results(query, true))
      discography_filter(sort_by_year(results))
    end

    private

    def parsed_results(query, is_discog)
      self.class.get(format_url(query, is_discog)).parsed_response["results"]
    end

  end
end