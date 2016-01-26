var React = require('react');

var Header = React.createClass ({
  render: function () {
    return (
      <div className="center-text">
        <img className="header" src="https://storage.googleapis.com/west-coast-skateparks/music-tree-logo.png"></img>
      </div>
    );
  },

});

module.exports = Header;
