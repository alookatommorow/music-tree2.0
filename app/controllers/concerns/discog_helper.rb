module DiscogHelper

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