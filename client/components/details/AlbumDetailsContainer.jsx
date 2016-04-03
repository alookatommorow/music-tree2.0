var React = require('react');
var Col = require('react-bootstrap/lib/Col');
var Row = require('react-bootstrap/lib/Row');
var Well = require('react-bootstrap/lib/Well');

var AlbumDetailsContainer = React.createClass({
  render: function(){
    var generateHeader = function(text) {
      return <div className="bold one-em one-bottom">{text}</div>;
    }

    var info = this.props.albumInfo;
    var unknown = <div>Unknown</div>
    var genreHeader = generateHeader("Genre: ");
    var labelHeader = generateHeader("Label: ");
    var countryHeader = generateHeader("Country: ");
    var stylesHeader = generateHeader("Styles: ");
    var tracklistHeader = generateHeader("Tracklist: ");
    var formatsHeader = generateHeader("Formats: ");

    var label = <div className="two-bottom">{info.labels[0].name}</div>;
    var country = <div className="two-bottom">{info.country}</div>;
    var genre = <div className="two-bottom">{info.genres[0]}</div>;
    var styles = info.styles == null ? unknown : info.styles.map(function(style){
      return <div key={style}>{style}</div>;
    });
    var formats = info.formats[0].descriptions == null ? unknown : info.formats[0].descriptions.map(function(style){
      return <div key={style}>{style}</div>;
    });
    var tracklist = info.tracklist.map(function(track, index){
      return <div key={index}>{index+1}. {track['title']}</div>
    });

    return (
      <div>
        <Row className="details-display">
          <Col sm={2} smOffset={1} xsHidden={true}>
            {genreHeader}
            {info.genres[0] == null ? unknown : genre}
          </Col>
          <Col sm={2} smOffset={0} xsHidden={true}>
            {countryHeader}
            {info.country == null ? unknown : country}
          </Col>
          <Col sm={2} smOffset={0} xsHidden={true}>
            {stylesHeader}
            <div className="two-bottom">
              {styles}
            </div>
          </Col>
          <Col sm={2} smOffset={0} xsHidden={true}>
            {labelHeader}
            {info.labels[0] == null ? unknown : label}
          </Col>
          <Col sm={2} smOffset={0} xsHidden={true}>
            {formatsHeader}
            <div className="two-bottom">
              {formats}
            </div>
          </Col>
          <Col xs={5} xsOffset={1} smHidden={true} mdHidden={true} lgHidden={true}>
            {genreHeader}
            {info.genres[0] == null ? unknown : genre}
            {countryHeader}
            {info.country == null ? unknown : country}
            {stylesHeader}
            <div className="two-bottom">
              {styles}
            </div>
          </Col>
          <Col xs={5} xsOffset={1} smHidden={true} mdHidden={true} lgHidden={true}>
            {labelHeader}
            {info.labels[0] == null ? unknown : label}
            {formatsHeader}
            <div className="two-bottom">
              {formats}
            </div>
          </Col>
        </Row>
        <Row>
          <Col xs={10} xsOffset={1}>
            <Well>
              <div className="left-text bold">
                {tracklistHeader}
              </div>
              <div className="left-text">
                {tracklist}
              </div>
            </Well>
          </Col>
        </Row>
      </div>

    );
  }
});

module.exports = AlbumDetailsContainer;
