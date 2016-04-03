class Filter
  def initialize(results)
    @results = results
  end

  def search
    { artistResults: [], albumResults: []}.tap do |fr|
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
    {all: clean_discog}
  end

  private

    attr_accessor :results

    def remove_dups
      results.uniq! { |album| album['id'] }
    end

    def filter_masters
      results.select { |album| album["type"] == "master"}
    end

    def clean_discog
      remove_dups
      filter_masters
    end
end
