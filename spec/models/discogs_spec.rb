require 'rails_helper'


RSpec.describe Discog, type: :model do
  context '#search' do
    it 'should retrieve search results from Discogs API'
      expect
    end

  end

end

describe 'post /search (execute search)' do
  it 'returns json with search results' do

    query = "thin lizzy"
    get '/search', query: query
    response.body.should.have_content(query)
  end

end
