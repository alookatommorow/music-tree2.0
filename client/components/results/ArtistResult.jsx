var React = require('react');
var ArtistProfileContainer = require('../details/ArtistProfileContainer.jsx');
var DiscogContainer = require('../DiscogContainer.jsx');
var SearchIndicator = require('../search/SearchIndicator.jsx');

var ListItem = require('material-ui/lib/lists/list-item');
var RaisedButton = require('material-ui/lib/raised-button');
var Divider = require('material-ui/lib/divider');

var ArtistResult = React.createClass({

  getInitialState: function(){
    return {
      profile: null,
      discogDetails: null,
      profileInProgress: false,
      discogInProgress: false,
      discogEps: null,
      discogLps: null,
      discogUrl: this.props.origin + "/discog",
      showDiscogContainer: false,
      showProfileContainer: false,
      altPicSource: "https://storage.googleapis.com/west-coast-skateparks/music-tree-alt.jpg"
    };
  },

  executeProfile: function(resultsKey) {
    $.ajax({
      url: this.props.origin + "/artist_info",
      data: {id: this.props.results[resultsKey]["id"]},
    })
    .done(this.profileSuccessFunction)
    .fail(this.errorFunction);
  },

  handleProfileClick: function() {
    if (this.state.profile === null) {
      this.setState({profileInProgress: true, showProfileContainer: true});
      this.executeProfile(this.props.resultsKey);
    } else {
      this.setState({showProfileContainer: true})
    }
  },

  handleDiscogClick: function() {
    if (this.state.discogDetails === null) {
      this.setState({discogInProgress: true, showDiscogContainer: true});
      this.executeDiscog(this.props.resultsKey);
    } else {
      this.setState({showDiscogContainer: true});
    }
  },

  handleDiscogCloseClick: function(){
    this.setState({showDiscogContainer: false});
  },

  handleProfileCloseClick: function(){
    this.setState({showProfileContainer: false});
  },

  executeDiscog: function(resultsKey) {
    $.ajax({
      url: this.state.discogUrl,
      data: {query: this.props.results[resultsKey]["title"]},
    })
    .done(this.discogSuccessFunction)
    .fail(this.errorFunction);;
  },

  profileSuccessFunction: function(response){
    this.setState({profile: response.profile, profileInProgress: false});
  },

  discogSuccessFunction: function(response){
    var sortedAlbums = response.sort(function(a, b){
      return a.year - b.year
    });
    var lps = [];
    var eps = [];
    sortedAlbums.map(function(album) {
      if (album.format.includes('Album') || album.format.includes('Compilation')) {
        lps.push(album);
      }
      else {
        eps.push(album)
      }
    });
    this.setState({discogDetails: sortedAlbums, lps: lps, eps: eps, discogInProgress: false})
  },

  render: function(){
    var picSource
    if (this.props.result.thumb === "") {
      picSource = "https://storage.googleapis.com/west-coast-skateparks/muisc-tree-alt.jpg"
    } else {
      picSource = this.props.result.thumb
    }
    var detailsContainer = <ArtistProfileContainer handleCloseClick={this.handleprofileCloseClick} title={this.props.result.title}  profile={this.state.profile} queryType={this.props.queryType} />
    var discogContainer = <DiscogContainer inProgress={this.state.discogInProgress} origin={this.props.origin} title={this.props.result.title} handleCloseClick={this.handleDiscogCloseClick} albums={this.state.discogDetails} eps={this.state.eps} lps={this.state.lps}/>
    var profileCloseButton = <RaisedButton label='Close' onClick={this.handleProfileCloseClick}/>
    var profileOpenButton = <RaisedButton className="change-font" onClick={this.handleProfileClick} label='Artist Profile'/>
    var discogOpenButton = <RaisedButton onClick={this.handleDiscogClick} label='Discography'/>
    var discogCloseButton = <RaisedButton label='Close' onClick={this.handleDiscogCloseClick}/>
    var searchIndicator = <SearchIndicator text={"Fetching Profile..."}/>
    var profileProgress = this.state.profileInProgress ? searchIndicator : detailsContainer;

    return (
      <div className="result-margin">
        <ListItem>
          <div className="multi-button-box">
            {this.state.showProfileContainer ? profileCloseButton : profileOpenButton}
            {this.state.showDiscogContainer ? discogCloseButton : discogOpenButton}
          </div>
          <div className="left five-right">
            <img src={picSource} className="image"></img>
          </div>
          <div className="clear-right bold one-five-em">
            {this.props.result.title}
          </div>
          <div className="clear-both"></div>
        </ListItem>
        {this.state.showProfileContainer ? profileProgress : null}
        {this.state.showDiscogContainer ? discogContainer : null}
        <Divider />
      </div>
    );
  },

});

module.exports = ArtistResult;