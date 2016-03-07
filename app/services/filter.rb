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
    {all: filter_masters}
  end

  private

    attr_reader :results

    def filter_masters
      results.select { |album| album["type"] == "master"}
    end
end
