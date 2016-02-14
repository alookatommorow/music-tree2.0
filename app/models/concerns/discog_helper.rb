module DiscogHelper

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
    filtered_results = { artistResults: [], albumResults: []}.tap do |fr|
      results.each do |result|
        if result["type"] == "artist"
          fr[:artistResults].push(result)
        elsif result["type"] == "master"
          fr[:albumResults].push(result)
        end
      end
    end
  end

  def discography_filter(results)
    filtered_results = {all: results, eps: [], lps: []}.tap do |fr|
      results.each do |album|
        if (album["format"] & ['Album', 'Compilation']).any?
          fr[:lps].push(album)
        else
          fr[:eps].push(album)
        end
      end
  end
end