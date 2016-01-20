var React = require('react');
var DetailsContainer = require('./DetailsContainer.jsx');
var DiscogContainer = require('./DiscogContainer.jsx');
var ListItem = require('material-ui/lib/lists/list-item');
var RaisedButton = require('material-ui/lib/raised-button');
var Divider = require('material-ui/lib/divider');

var Result = React.createClass ({
  getInitialState: function(){
    return {
      detailsDetails: null,
      discogDetails: null,
      discogEps: null,
      discogLps: null,
      artistInfoUrl: this.props.origin + "/artist_info",
      albumInfoUrl: this.props.origin + "/album_info",
      discogUrl: this.props.origin + "/discog",
      showDetailsContainer: false,
      showDiscogContainer: false,
      altPicSource: "https://storage.googleapis.com/west-coast-skateparks/music-tree-alt.jpg"
    };
  },

  handleDetailClick: function() {
    if (this.state.detailsDetails === null) {
      this.executeDetail(this.props.resultsKey);
    } else {
      this.setState({showDetailsContainer: true})
    }
  },

  handleDiscogClick: function() {
    if (this.state.discogDetails === null) {
      this.executeDiscog(this.props.resultsKey);
    } else {
      this.setState({showDiscogContainer: true});
    }
  },

  handleDiscogCloseClick: function(){
    this.setState({showDiscogContainer: false});
  },

  handleDetailCloseClick: function(){
    this.setState({showDetailsContainer: false});
  },

  executeDetail: function(resultsKey) {
    var data = {id: this.props.results[resultsKey]["id"]};
    if (this.props.queryType == "artist"){
      var url = this.state.artistInfoUrl;
    } else if (this.props.queryType == "master"){
      var url = this.state.albumInfoUrl;
    }

    $.ajax({
      url: url,
      data: data,
      dataType: 'json',
      success: this.detailSuccessFunction,
      error: this.errorFunction,
    });
  },

  executeDiscog: function(resultsKey) {
    var data = {query: this.props.results[resultsKey]["title"]}
    $.ajax({
      url: this.state.discogUrl,
      data: data,
      dataType: 'json',
      success: this.discogSuccessFunction,
      error: this.errorFunction,
    });
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
    this.setState({discogDetails: sortedAlbums, lps: lps, eps: eps, showDiscogContainer: true})
  },

  detailSuccessFunction: function(response){
    this.setState({detailsDetails: response, showDetailsContainer: true});
  },

  errorFunction: function(response){
    console.log(response);
  },

  render: function () {
    var detailsContainer = <DetailsContainer result={this.props.result} handleCloseClick={this.handleDetailCloseClick} details={this.state.detailsDetails} title={this.props.title} queryType={this.props.queryType} />
    var discogContainer = <DiscogContainer result={this.props.result} origin={this.props.origin} handleCloseClick={this.handleDiscogCloseClick} title={this.props.title} albums={this.state.discogDetails} eps={this.state.eps} lps={this.state.lps}/>
    var detailsCloseButton = <RaisedButton label='Close' onClick={this.handleDetailCloseClick}/>
    var albumDetailsOpenButton = <RaisedButton onClick={this.handleDetailClick} label='Album Details'/>
    //if artist search
    if (this.props.queryType == "artist") {
      var detailsOpenButton = <RaisedButton onClick={this.handleDetailClick} label='Artist Details'/>
      var discogOpenButton = <RaisedButton onClick={this.handleDiscogClick} label='Discography'/>
      var discogCloseButton = <RaisedButton label='Close' onClick={this.handleDiscogCloseClick}/>
      var resultDisplay =
        <div>
          <ListItem>
            <div className="multi-button-box">
              {this.state.showDetailsContainer ? detailsCloseButton : detailsOpenButton}
              {this.state.showDiscogContainer ? discogCloseButton : discogOpenButton}
            </div>
            <div className="left ten-right">
              <img src={this.props.picSource} alt="Pic unavailable"></img>
            </div>
            <div className="clear-right bold">
              {this.props.title}
            </div>
            <div className="clear-both"></div>
          </ListItem>
          {this.state.showDetailsContainer ? detailsContainer : null}
          {this.state.showDiscogContainer ? discogContainer : null}
          <Divider />
        </div>
    }
    //else if album search
    else if (this.props.queryType == "master") {
      var resultDisplay =
        <div>
          <ListItem>
            <div className="button-box">
              {this.state.showDetailsContainer ? detailCloseButton : albumDetailsOpenButton}
            </div>
            <div className="left ten-right">
              <img src={this.props.picSource}  ></img>
            </div>
            <div className="clear-right">
              <div className="bold">
                {this.props.title}
              </div>
              <div className="one-top">
                {this.props.result.year}
              </div>
            </div>
            <div className="clear-both"></div>
          </ListItem>
          {this.state.showDetailsContainer ? detailsContainer : null}
          <Divider />
        </div>
    }

    return (
      <div>
        {resultDisplay}
      </div>
    );
  },

});

module.exports = Result;