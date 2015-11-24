var React = require('react');

var DetailsContainer = React.createClass({
  getInitialState: function(){
    return {
      details: null,
    };
  },

   handleDetailClick: function() {
    console.log("shitzo")
    this.setState({details: "blarg"});
    // executeDetail();
    console.log(this.props.resultKey);
    console.log(this.props.queryType);
  },

  executeDetail: function(resultKey) {
    var data = {
      query: query,
    };
    console.log(data);
    $.ajax({
      url: this.state.formAction,
      data: data,
      dataType: 'json',
      success: this.successFunction,
      error: this.errorFunction,
    });

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