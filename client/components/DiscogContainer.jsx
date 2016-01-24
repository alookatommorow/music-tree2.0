var React = require('react');
var RaisedButton = require('material-ui/lib/raised-button');
var ListItem = require('material-ui/lib/lists/list-item');
var AlbumContainer = require('./AlbumContainer.jsx');
var LinearProgress = require('material-ui/lib/linear-progress');

var DiscogContainer = React.createClass({
  getInitialState: function(){
    return {
      showMixed: true,
      showLps: false,
      showEps: false,
    };
  },

  handleAllClick: function(){
    this.setState({showEps: false, showLps: true, showMixed: true,})
  },

  handleLpClick: function(){
    this.setState({showEps: false, showMixed: false, showLps: true, })
  },

  handleEpClick: function(){
    this.setState({showLps: false, showMixed: false, showEps: true})
  },

  render: function(){
    if (this.props.inProgress === true) {
      return (
        <div className='search-bar'>
          <h3>Fetching Discography...</h3>
          <LinearProgress mode="indeterminate" className="two-left two-right" />
        </div>
        )
    } else {
      var allButton = <RaisedButton label='All' onClick={this.handleAllClick}/>
      var lpButton = <RaisedButton label='Full Length Albums' onClick={this.handleLpClick}/>
      var epButton = <RaisedButton label='Singles and Other' onClick={this.handleEpClick}/>
      var header = <div className="detail-discog-header">{this.props.title} Discography</div>

      var mixed = this.props.albums.map(function(album, index){
        return <AlbumContainer origin={this.props.origin} key={album.uri} album={album} albumKey={index} />
      }.bind(this));

      var discogLps = this.props.lps.map(function(album, index){
            return <AlbumContainer origin={this.props.origin} key={album.uri} album={album} albumKey={index} />
          }.bind(this));

      var discogEps= this.props.eps.map(function(album, index){
          return <AlbumContainer origin={this.props.origin} key={album.uri} album={album} albumKey={index} />
        }.bind(this));

      var discogDisplay =
        <div>
          {this.state.showMixed ? mixed : null}
          {this.state.showLps ? discogLps : null}
          {this.state.showEps ? discogEps : null}
        </div>

      return(
        <div className="details-display">
          <div className="center-text">
            {header}
            <div className="three-bottom">
              {allButton}
              {lpButton}
              {epButton}
            </div>
           </div>
          <div className="clear-right left-text">
            {discogDisplay}
          </div>
        </div>
      )
    }
  },

});

module.exports = DiscogContainer;