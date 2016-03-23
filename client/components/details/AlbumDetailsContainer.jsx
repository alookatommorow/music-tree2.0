var React = require('react');
var Col = require('react-bootstrap/lib/Col');
var Row = require('react-bootstrap/lib/Row');
var Panel = require('react-bootstrap/lib/Panel');
var Well = require('react-bootstrap/lib/Well');

var AlbumDetailsContainer = React.createClass({
  render: function(){
    var generateHeader = function(text) {
      return <div className="bold one-em">{text}</div>;
    }
    // var generateList = function(collection) {
    //   collection.map
    // }

    var info = this.props.albumInfo;
    var genreHeader = generateHeader("Genre:");
    var labelHeader = generateHeader("Label:");
    var countryHeader = generateHeader("Country:");
    var stylesHeader = generateHeader("Styles:");
    var tracklistHeader = generateHeader("Tracklist:");
    var formatsHeader = generateHeader("Formats:");

    var label = info.labels[0].name;
    var country = <div>{info.country}</div>;
    var genre = info.genres[0];
    var styles = info.styles.map(function(style){
      return <div key={style}>{style}</div>;
    });
    var formats = info.formats[0].descriptions.map(function(format){
      return <div key={format}>{format}</div>;
    });
    var tracklist = info.tracklist.map(function(track, index){
      return <div key={index}>{index+1}. {track['title']}</div>
    });

    return (
      <Row className="details-display">
        <Col xs={3} xsOffset={2}>
          <div className="left-text bold one-bottom">
            {tracklistHeader}
          </div>
          <div className="left-text">
            {tracklist}
          </div>
        </Col>

        <Col xs={2}>
          <div className="two-bottom">
            {genreHeader}
            <div className="two-left">
              {genre}
            </div>
          </div>
          <div className="two-bottom">
            {stylesHeader}
            <div className="two-left">
              {styles}
            </div>
          </div>
        </Col>
        <Col xs={2}>
        <Well>
          <div className="two-bottom">
            {countryHeader}
            <div className="two-left">
              {country}
            </div>
          </div>
          <div className="two-bottom">
            {labelHeader}
            <div className="two-left">
              {label}
            </div>
          </div>
          <div className="two-bottom">
            {formatsHeader}
            <div className="two-left">
              {formats}
            </div>
          </div>
          </Well>
        </Col>

      </Row>
    );
  }
});

module.exports = AlbumDetailsContainer;
