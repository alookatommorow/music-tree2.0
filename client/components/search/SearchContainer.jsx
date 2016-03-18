var React = require('react');

var ResultsContainer = require('../results/ResultsContainer.jsx');
var SearchForm = require('./SearchForm.jsx');
var SearchIndicator = require('./SearchIndicator.jsx');

var Col = require('react-bootstrap/lib/Col');
var Row = require('react-bootstrap/lib/Row');

var SearchContainer = React.createClass({
  getInitialState: function () {
    return {
      artistResults: null,
      albumResults: null,
      query: null,
      queryType: "artist",
      showSearchResults: false,
      showSearchForm: true,
      inProgress: false,
    };
  },

  handleChange: function(event) {
    this.setState({query: event.target.value});
  },

  changeQueryType: function(type) {
    this.setState({queryType: type})
  },

  ajaxRequest: function(query, url, successFunction, errorFunction){
    $.ajax({
      url: this.props.origin + url,
      data: {query: query},
    })
    .done(successFunction)
    .fail(errorFunction);
  },

  handleSubmit: function(event) {
    event.preventDefault();
    this.setState({showSearchForm: false, showSearchResults: true, inProgress: true});
    this.ajaxRequest(this.state.query, '/search', this.successFunction, this.errorFunction);
  },

  successFunction: function(response){
    this.setState({artistResults: response.artistResults, albumResults: response.albumResults, inProgress: false})
  },

  errorFunction: function(){
    this.setState({showSearchResults: false, inProgress: false});
    console.log("error");
  },

  render: function () {
    var buttonStyle = {
      textTransform: 'capitalize',
      fontSize: '1.2em',
      fontWeight: 'bold',
      cursor: 'pointer',
    }
    var searchResultsContainer = <ResultsContainer buttonStyle={buttonStyle} ajaxRequest={this.ajaxRequest} albumResults={this.state.albumResults} artistResults={this.state.artistResults} query={this.state.query} queryType={this.state.queryType} origin={this.props.origin} changeQueryTye={this.changeQueryType} />;
    var searchIndicator = <SearchIndicator text={"Searching..."}/>;
    var searchProgress = this.state.inProgress ? searchIndicator : searchResultsContainer;
    var searchForm = <SearchForm buttonStyle={buttonStyle} handleChange={this.handleChange} queryType={this.state.queryType} handleSelect={this.changeQueryType} handleSubmit={this.handleSubmit} />

    return (
      <div>
        <Row>
          <Col xs={12} md={8} lg={4} lgOffset={4} mdOffset={2} >
            <div>
              { this.state.showSearchForm ? searchForm : true }
            </div>
          </Col>
        </Row>
        <div>
          {this.state.showSearchResults ? searchProgress : null}
        </div>
      </div>
    );
  },
});

module.exports = SearchContainer;