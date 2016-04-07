var React = require('react');
var AlbumResult = require('../results/AlbumResult.jsx');
var Button = require('react-bootstrap/lib/Button');
var Pagination = require('react-bootstrap/lib/Pagination');
var SearchIndicator = require('../search/SearchIndicator.jsx');

var Discog = React.createClass({
  getInitialState: function() {
    return {
      releases: null,
      discogInProcess: true
    }
  },

  componentDidMount: function() {
    if (this.state.releases === null) {
      this.executeDiscog();
    }
  },

  executeDiscog: function() {
    $.ajax({
      url: this.props.origin + '/discog',
      data: {query: this.props.result['id'], page: this.props.pageNum},
    })
    .done(this.discogSuccessFunction)
    .fail(this.errorFunction);
  },

  errorFunction: function(response) {
    console.log("yer fuckin' up");
  },

  discogSuccessFunction: function(response) {
    console.log(response);
    this.setState({ releases: response.releases, discogInProcess: false});
  },

  render: function(){
    var discogSearchIndicator = <SearchIndicator text={"Fetching Discography..."}/>
    var discogProgress = this.state.discogInProgress ? discogSearchIndicator : discografia;
    var noDiscog =
      <div>
        <div className="no-results">Discography Unavailable</div>
      </div>

    var discografia
    if (this.state.releases === null){
      var discografia = noDiscog;
    } else{
      var discografia = this.state.releases.map(function(album){
        return <AlbumResult key={album.id} ajaxRequest={this.props.ajaxRequest} result={album} />;
      }.bind(this));
    }

    return(
      <div>
        {discografia}
      </div>
    );
  },
});

module.exports = Discog;