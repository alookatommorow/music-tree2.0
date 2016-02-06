require 'rails_helper'

RSpec.describe Discog, type: :model do

  context '#search' do
    it 'should retrieve search results from Discogs API' do
      query = "thin lizzy"
      results = Discogs::Client.new.search(query).parsed_response["results"]
      expect(results[0]['title'].downcase).to eq(query)
    end
  end

end
