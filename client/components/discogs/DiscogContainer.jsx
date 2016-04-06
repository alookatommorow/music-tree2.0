var React = require('react');
var AlbumResult = require('../results/AlbumResult.jsx');
var Discog = require('./Discog.jsx');
var Button = require('react-bootstrap/lib/Button');
var Well = require('react-bootstrap/lib/Well');
var Pagination = require('react-bootstrap/lib/Pagination');
var SearchIndicator = require('../search/SearchIndicator.jsx');


var DiscogContainer = React.createClass({
  getInitialState: function() {
    return {
      activePage: 1,
      discogInProgress: true,
      data: {},
    }
  },


  // executeDiscog: function(event) {

  //   if (this.state.discogDetails === null) {
  //     this.setState({discogInProgress: true, showDiscogContainer: true});
  //     this.props.ajaxRequest(this.props.id, '/discog', this.discogSuccessFunction, this.errorFunction);
  //   } else {
  //     this.setState({showDiscogContainer: true});
  //   }
  // },

  handleSelect: function(event, selectedEvent) {
    this.setState({
      activePage: selectedEvent.eventKey,
    });
    // executeDiscog();
  },
  // var albums =
    //   this.props.albums.map(function(album){
    //     return <AlbumResult key={album.id} ajaxRequest={this.props.ajaxRequest} result={album} origin={this.props.origin} query={this.props.query} />;
    //   }.bind(this));

  render: function(){
    var discogSearchIndicator = <SearchIndicator text={"Fetching Discography..."}/>
    var discogProgress = this.state.discogInProgress ? discogSearchIndicator : discog;
    var discogArray = []

    for (var i = 1; i <= this.props.numPages; i++) {
      if (i === 2) {
        discogArray.push(<div>Hella Bitches</div>);
      } else {
        discogArray.push(<div>Tits</div>);
      }
    }
    console.log(discogArray[1]);


    var closeButton =
      <div className="right two-bottom">
        <Button bsStyle="danger" onClick={this.props.handleCloseClick}>CLOSE</Button>
      </div>

    var header = <Well className="detail-discog-header">{this.props.title} Discography</Well>

    var discog =
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
            items={20}
            maxButtons={5}
            activePage={this.state.activePage}
            onSelect={this.handleSelect} />
        </div>
        <div className="clear-right left-text">
          {discogArray[this.state.activePage]}
        </div>
      </div>

    var noDiscog =
      <div>
        {closeButton}
        <div className="no-results">Discography Unavailable</div>
      </div>

    var discogDisplay = this.state.data !== null ? discog : noDiscog;

    return(
      <div>
        {discogDisplay}
      </div>
    );
  },
});

module.exports = DiscogContainer;