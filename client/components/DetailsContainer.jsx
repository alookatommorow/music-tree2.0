var React = require('react');


var DetailsContainer = React.createClass({


  render: function(){
    if (this.props.details !== null) {
      var detailsDisplay = "deeeeeeeets"
    };
    return (
        <div className="detailsDisplay">
          {detailsDisplay}
        </div>
      );
  },

});

module.exports = DetailsContainer;