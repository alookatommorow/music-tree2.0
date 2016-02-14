module DiscogHelper

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
    results = sort_by_year(eliminate_nil(results))
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

  private

    def sort_by_year(results)
      results.sort_by { |item| item["year"] }
    end

    def eliminate_nil(results)
      results.select { |result| result["year"] }
    end

    def search_keys
      {'q' => "#{query}"}
    end

    def discog_keys
      {'type' => "master", 'artist' => "#{query}"}
    end

    def required_keys
      {
        'key' => "#{ENV['CONSUMER_KEY']}",
        'secret' => "#{ENV['CONSUMER_SECRET']}",
        'per_page' => 100
      }
    end

end