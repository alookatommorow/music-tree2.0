var React = require('react');
var AlbumDetailsContainer = require('../details/AlbumDetailsContainer.jsx');
var ListGroupItem = require('react-bootstrap/lib/ListGroupItem');
var Button = require('react-bootstrap/lib/Button');
var Image = require('react-bootstrap/lib/Image');
var Col = require('react-bootstrap/lib/Col');
var Row = require('react-bootstrap/lib/Row');

var AlbumResult = React.createClass({
  getInitialState: function(){
    return {
      albumInfo: null,
      showDetailsContainer: false,
    };
  },

  handleDetailClick: function() {
    //if details not yet loaded, fetch, else just display
    if (this.state.albumInfo === null) {
      var query = this.props.result["id"];
      this.props.ajaxRequest(query, '/album_info', this.successFunction, this.errorFunction);
    } else {
      this.setState({showDetailsContainer: true})
    }
  },

  handleDetailCloseClick: function(){
    this.setState({showDetailsContainer: false});
  },

  successFunction: function(response){
    this.setState({albumInfo: response, showDetailsContainer: true});
  },

  errorFunction: function(response){
    console.log(response);
  },

  render: function(){
    var detailsCloseButton =
      <Button onClick={this.handleDetailCloseClick} bsStyle="danger" >CLOSE</Button>
    var detailsOpenButton =
      <Button onClick={this.handleDetailClick} bsStyle="primary" >Album Details</Button>
    var detailsContainer = <AlbumDetailsContainer handleCloseClick={this.handleDetailCloseClick} albumInfo={this.state.albumInfo} />

    return (
      <ListGroupItem>
        <Row>
          <Col xs={4}>
            <div className="result-image">
              <Image src={this.props.result.thumb} className="image" />
            </div>
          </Col>
          <Col xs={8}>
            <div className="album-button">
              {this.state.showDetailsContainer ? detailsCloseButton : detailsOpenButton }
           </div>
          </Col>
          <Col xs={8}>
            <div className="bold one-five-em">
              {this.props.result.title}
            </div>
            <div className="one-top one-five-em">
              {this.props.result.year}
            </div>
          </Col>
        </Row>
        <div className="clear-both">
          {this.state.showDetailsContainer ? detailsContainer : null }
        </div>
      </ListGroupItem>
    );
  },
});

module.exports= AlbumResult;