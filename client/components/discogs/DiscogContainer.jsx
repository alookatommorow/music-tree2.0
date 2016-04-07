var React = require('react');
var AlbumResult = require('../results/AlbumResult.jsx');
var Discog = require('./Discog.jsx');
var Button = require('react-bootstrap/lib/Button');
var Well = require('react-bootstrap/lib/Well');
var Pagination = require('react-bootstrap/lib/Pagination');



var DiscogContainer = React.createClass({
  getInitialState: function() {
    return {
      activePage: 1,
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
  },

  render: function(){


    var discogArray = []

    for (var i = 0; i <= this.props.numPages; i++) {
      discogArray.push(<Discog key={i} pageNum={i} origin={this.props.origin} stringy="fuckbot" ajaxRequest={this.props.ajaxRequest} result={this.props.result} />);
    }


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
            items={this.props.numPages}
            maxButtons={5}
            activePage={this.state.activePage}
            onSelect={this.handleSelect} />
        </div>
        <div className="clear-right left-text">
          {discogArray[this.state.activePage]}
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