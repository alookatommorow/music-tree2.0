var React = require('react');
var Image = require('react-bootstrap/lib/Image');
var Col = require('react-bootstrap/lib/Col');

var Header = React.createClass ({
  render: function () {
    return (
      <Col xs={6} s={6} md={4} lg={4} xsOffset={3} sOffset={3} lgOffset={4} mdOffset={4} >
        <div className="center-text">
          <Image src="https://storage.googleapis.com/music-tree/music-tree-logo.png" responsive />
        </div>
      </Col>
    );
  },
});

module.exports = Header;
