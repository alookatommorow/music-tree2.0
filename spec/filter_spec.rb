require 'rails_helper'

RSpec.describe Discog, type: :model do

  context '#search' do
    it 'should sort search results by artist and master' do
      results = JSON.parse(File.open('spec/support/search.json').read)
      expected = JSON.parse(File.open('spec/support/filtered_search.json').read).symbolize_keys

      expect(Filter.new(results["results"]).search).to eq(expected)
    end
  end
end