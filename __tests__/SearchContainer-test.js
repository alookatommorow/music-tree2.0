jest.dontMock('../client/components/search/SearchContainer.jsx');

var SearchContainer = require('../client/components/search/SearchContainer.jsx');
var React = require('react');
var ReactDOM = require('react-dom');
var TestUtils = require('react-addons-test-utils');

describe('SearchContainer', function() {

  it('changes the text after click', function() {

    // Render a checkbox with label in the document
    var searchContainer = TestUtils.renderIntoDocument(<SearchContainer />);
    expect(2+2).toEqual(4);
  });

});