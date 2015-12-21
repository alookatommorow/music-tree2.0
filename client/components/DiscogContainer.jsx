var React = require('react');

var DiscogContainer = React.createClass({
  render: function(){
    return(
      <button onClick={this.handleDiscogClick}>Get Discography</button>
      )
  },

});

module.exports = DiscogContainer;