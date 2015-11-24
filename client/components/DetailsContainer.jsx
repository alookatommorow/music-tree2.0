var React = require('react');

var DetailsContainer = React.createClass({
  getInitialState: function(){
    return {
      details: null
    };
  },

   handleDetailClick: function() {
    console.log("shitzo")
    this.setState({details: "blarg"});
    console.log(this.state.details)
  },

  render: function(){
    if (this.state.details !== null) {
      var detailsDisplay = "deets"
    } else {
      var detailsDisplay = <button onClick={this.handleDetailClick}>Get details</button>
    };
    return (
        <div className="detailsDisplay">
          {detailsDisplay}
        </div>
      );
  },

});

module.exports = DetailsContainer;