var React = require('react');
var update = require('react-addons-update');
var AlbumResult = require('../results/AlbumResult.jsx');
var Discog = require('./Discog.jsx');
var SearchIndicator = require('../search/SearchIndicator.jsx');

var Button = require('react-bootstrap/lib/Button');
var Well = require('react-bootstrap/lib/Well');
var Pagination = require('react-bootstrap/lib/Pagination');


var DiscogContainer = React.createClass({
  getInitialState: function() {
    return {
      numPages: null,
      activePage: 1,
      discogInProgress: false,
      pages: {}
    }
  },

  componentDidMount: function() {
    this.setState({discogInProgress: true});
    this.getDiscog(this.firstSuccessFunction);
  },

  handleSelect: function(event, selectedEvent) {
    var currentPage = selectedEvent.eventKey;
    if (this.state.pages[currentPage] === undefined) {
      this.setState({discogInProgress: true, activePage: currentPage});
      this.getDiscog(this.discogSuccessFunction, currentPage);
    } else {
      this.setState({activePage: currentPage})
    }
  },

  getDiscog: function(successFunction, currentPage) {
    this.props.ajaxRequest(
      {query: this.props.result["id"], page: currentPage},
      '/discog',
      successFunction,
      this.errorFunction
    );
  },

  firstSuccessFunction: function(response) {
    var obj = {};
    obj[this.state.activePage] = response.releases;
    var updatedState = update(this.state, {
      discogInProgress: {$set: false},
      numPages: {$set: Math.ceil(response.pages/4)},
      pages: {$merge: obj},
    });
    this.setState(updatedState);
  },

  discogSuccessFunction: function(response) {
    var obj = {};
    obj[this.state.activePage] = response.releases;
    var updatedState = update(this.state, {
      discogInProgress: {$set: false},
      pages: {$merge: obj},
    });
    this.setState(updatedState);
  },

  render: function(){
    var discogArray = [];
    for (var i = 0; i <= this.state.numPages; i++) {
      discogArray.push(<Discog key={i} pageNum={i} albums={this.state.pages} origin={this.props.origin} ajaxRequest={this.props.ajaxRequest} result={this.props.result} />);
    }

    var discogSearchIndicator = <SearchIndicator text={"Fetching Discography..."}/>
    var discogProgress = this.state.discogInProgress ? discogSearchIndicator : discogArray[this.state.activePage];
    var closeButton =
      <div className="right two-bottom">
        <Button bsStyle="danger" onClick={this.props.handleCloseClick}>CLOSE</Button>
      </div>
    var header = <Well className="detail-discog-header">{this.props.title} Discography</Well>
    var discogDisplay =
      <div className="details-display">
        {closeButton}
        <div className="center-text">
          {header}
          <Pagination
            prev
            next
            first
            last
            ellipsis
            boundaryLinks
            bsSize="large"
            items={this.state.numPages}
            maxButtons={5}
            activePage={this.state.activePage}
            onSelect={this.handleSelect} />
        </div>
        <div className="clear-right left-text">
          {discogProgress}
        </div>
      </div>

    return(
      <div>
        {discogDisplay}
      </div>
    );
  },
});

module.exports = DiscogContainer;