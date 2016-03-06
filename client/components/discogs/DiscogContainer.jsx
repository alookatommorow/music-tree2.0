var React = require('react');

var AlbumResult = require('../results/AlbumResult.jsx');

var LinearProgress = require('material-ui/lib/linear-progress');
var RaisedButton = require('material-ui/lib/raised-button');
var ListItem = require('material-ui/lib/lists/list-item');

var DiscogContainer = React.createClass({
  getInitialState: function(){
    return {
      showMixed: true,
      showLps: false,
      showEps: false,
    };
  },

  handleAllClick: function(){
    this.setState({showEps: false, showLps: false, showMixed: true,})
  },

  handleLpClick: function(){
    this.setState({showEps: false, showMixed: false, showLps: true, })
  },

  handleEpClick: function(){
    this.setState({showLps: false, showMixed: false, showEps: true})
  },

  render: function(){
    var generateDiscog = function(collection) {
      var albums = []
      collection.map(function(album, index){
        albums.push(<AlbumResult closeButtonStyle={this.props.closeButtonStyle} buttonStyle={this.props.buttonStyle} key={album.id} ajaxRequest={this.props.ajaxRequest} result={album} origin={this.props.origin} query={this.props.query} />);
      }.bind(this));
      return albums;
    }.bind(this);

    var generateButton = function(label, handler){
      return <RaisedButton labelStyle={this.props.buttonStyle} label={label} onClick={handler}/>;
    }.bind(this);

    var closeButton =
    <div className="right two-bottom">
      <RaisedButton labelStyle={this.props.closeButtonStyle} onClick={this.props.handleCloseClick} label="Close" />
    </div>

    var allButton = generateButton('All', this.handleAllClick);
    var lpButton = generateButton('Full Length Albums', this.handleLpClick);
    var epButton = generateButton('Singes and Other', this.handleEpClick);
    var header = <div className="detail-discog-header">{this.props.title} Discography</div>

    var mixed = generateDiscog(this.props.albums)
    // var discogLps = generateDiscog(this.props.lps)
    // var discogEps = generateDiscog(this.props.eps)

    var discog =
      <div className="details-display">
        {closeButton}
        <div className="center-text">
          {header}
          <div className="three-bottom">
            {allButton}
            {lpButton}
            {epButton}
          </div>
         </div>
        <div className="clear-right left-text">
          {this.state.showMixed ? mixed : null}
          {this.state.showLps ? discogLps : null}
          {this.state.showEps ? discogEps : null}
        </div>
      </div>

    var noDiscog =
      <div>
        {closeButton}
        <div className="no-results">Discography Unavailable</div>
      </div>
    var discogDisplay = (this.props.albums.length > 0) ? discog : noDiscog;

    return(
      <div>
        {discogDisplay}
      </div>
    );

  },

});

module.exports = DiscogContainer;