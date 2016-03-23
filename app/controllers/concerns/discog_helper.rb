module DiscogHelper

    def search_keys
      {'q' => "#{query}"}
    end

    def discog_keys
      {
        'sort' => 'year',
        'page' => 1
      }
    end

    def required_keys
      {
        'key' => "#{ENV['CONSUMER_KEY']}",
        'secret' => "#{ENV['CONSUMER_SECRET']}",
        'per_page' => 100
      }
    end
end