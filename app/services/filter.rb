class Filter
  def initialize(results)
    @results = results
  end

  def search
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

  def discography
    filtered_results = {all: sort_by_year, eps: [], lps: []}.tap do |fr|
      sort_by_year.each do |album|
        if (album["format"] & ['Album', 'Compilation']).any?
          fr[:lps].push(album)
        else
          fr[:eps].push(album)
        end
      end
    end
  end

  private

    attr_reader :results

    def sort_by_year
      results.select { |result| result["year"] }.
        sort_by { |item| item["year"] }
    end


end
