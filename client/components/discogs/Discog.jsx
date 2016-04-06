var React = require('react');
var AlbumResult = require('../results/AlbumResult.jsx');
var Button = require('react-bootstrap/lib/Button');
var Pagination = require('react-bootstrap/lib/Pagination');

var Discog = React.createClass({
  getInitialState: function() {
    return {
      activePage: 1,
    }
  },

  handleSelect(event, selectedEvent) {
    this.setState({
      activePage: selectedEvent.eventKey
    });
  },

  render: function(){

    return(
      <div>
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
    );
  },
});

module.exports = Discog;