module DiscogHelper

    def search_keys
      {
        'q' => "#{query}",
        'per_page' => 100
      }
    end

    def discog_keys
      {
        'sort' => 'year',
        'per_page' => 50,
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