var React = require('react');

var AlbumDetailsContainer = require('../details/AlbumDetailsContainer.jsx');

var ListItem = require('material-ui/lib/lists/list-item');
var RaisedButton = require('material-ui/lib/raised-button');
var Divider = require('material-ui/lib/divider');

var AlbumResult = React.createClass({
  getInitialState: function(){
    return {
      tracklist: null,
      showDetailsContainer: false,
    };
  },

  handleDetailClick: function() {
    //if details not yet loaded, fetch, else just display
    if (this.state.tracklist === null) {
      var query = this.props.result["id"]
      this.props.ajaxRequest(query, '/album_info', this.successFunction, this.errorFunction);
    } else {
      this.setState({showDetailsContainer: true})
    }
  },

  handleDetailCloseClick: function(){
    this.setState({showDetailsContainer: false});
  },

  successFunction: function(response){
    this.setState({tracklist: response.tracklist, showDetailsContainer: true});
  },

  errorFunction: function(response){
    console.log(response);
  },

  render: function(){
    var detailsCloseButton = <RaisedButton className="red" label='Close' onClick={this.handleDetailCloseClick}/>
    var albumDetailsOpenButton = <RaisedButton onClick={this.handleDetailClick} label='Album Details'/>
    var detailsContainer = <AlbumDetailsContainer handleCloseClick={this.handleDetailCloseClick} title={this.props.result.title}  tracklist={this.state.tracklist} queryType={this.props.queryType} />

    return (
        <div className="result-margin">
          <ListItem>
            <div className="button-box">
              {this.state.showDetailsContainer ? detailsCloseButton : albumDetailsOpenButton}
            </div>
            <div className="left three-right">
              <img src={this.props.result.thumb} className="image" ></img>
            </div>
            <div className="clear-right">
              <div className="bold one-five-em">
                {this.props.result.title}
              </div>
              <div className="two-top one-five-em">
                {this.props.result.year}
              </div>
            </div>
            <div className="clear-both"></div>
            {this.state.showDetailsContainer ? detailsContainer : null }
          </ListItem>
          <Divider />
        </div>
    );
  },

});

module.exports= AlbumResult;