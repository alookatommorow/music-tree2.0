var React = require('react')
var LinearProgress = require('material-ui/lib/linear-progress');


var SearchIndicator = React.createClass({
  render: function() {
    return (
       <div className='search-bar'>
          <h3>{this.props.text}</h3>
          <LinearProgress mode="indeterminate" className="two-left two-right" />
        </div>
    );
  }

});

module.exports = SearchIndicator;