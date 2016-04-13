module UriHelper

  def search_url
    ## this is workaround for characters like "ö" as in Motörhead being passed in as a query (something about utf vs. ascii )
    URI.parse("/database/search").tap {|url| format_url(url, search_keys).to_s }
  end

  def discography_url
    URI.parse("/artists/#{query}/releases").tap {|url| format_url(url, discog_keys).to_s }
  end

  def format_url(url, keys)
    url.query = URI::encode_www_form(keys.merge(required_keys))
  end

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
      'page' => "#{page}"
    }
  end

  def required_keys
    {
      'key' => "#{ENV['CONSUMER_KEY']}",
      'secret' => "#{ENV['CONSUMER_SECRET']}"
    }
  end
end