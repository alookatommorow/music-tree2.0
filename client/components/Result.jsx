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
      discogInProgress: false,
      detailInProgress: false,
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
      this.setState({detailInProgress: true, showDetailsContainer: true});
      this.executeDetail(this.props.resultsKey);
    } else {
      this.setState({showDetailsContainer: true})
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

  handleDetailCloseClick: function(){
    this.setState({showDetailsContainer: false});
  },

  executeDetail: function(resultsKey) {
    if (this.props.queryType == "artist"){
      var url = this.state.artistInfoUrl;
    } else if (this.props.queryType == "master"){
      var url = this.state.albumInfoUrl;
    }
    $.ajax({
      url: url,
      data: {id: this.props.results[resultsKey]["id"]},
    })
    .done(this.detailSuccessFunction)
    .fail(this.errorFunction);
  },

  executeDiscog: function(resultsKey) {
    $.ajax({
      url: this.state.discogUrl,
      data: {query: this.props.results[resultsKey]["title"]},
    })
    .done(this.discogSuccessFunction)
    .fail(this.errorFunction);;
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

  detailSuccessFunction: function(response){
    this.setState({detailsDetails: response, detailInProgress: false});
  },

  errorFunction: function(response){
    console.log(response);
  },

  render: function () {
    var picSource
    if (this.props.result.thumb === "") {
      picSource = "https://storage.googleapis.com/west-coast-skateparks/muisc-tree-alt.jpg"
    } else {
      picSource = this.props.result.thumb
    }
    var detailsContainer = <DetailsContainer inProgress={this.state.detailInProgress} handleCloseClick={this.handleDetailCloseClick} title={this.props.result.title}  details={this.state.detailsDetails} queryType={this.props.queryType} />
    var discogContainer = <DiscogContainer inProgress={this.state.discogInProgress} origin={this.props.origin} title={this.props.result.title} handleCloseClick={this.handleDiscogCloseClick} albums={this.state.discogDetails} eps={this.state.eps} lps={this.state.lps}/>
    var detailsCloseButton = <RaisedButton label='Close' onClick={this.handleDetailCloseClick}/>
    var albumDetailsOpenButton = <RaisedButton onClick={this.handleDetailClick} label='Album Details'/>
    // if artist search
    if (this.props.queryType == "artist") {
      var detailsOpenButton = <RaisedButton className="change-font" onClick={this.handleDetailClick} label='Artist Details'/>
      var discogOpenButton = <RaisedButton onClick={this.handleDiscogClick} label='Discography'/>
      var discogCloseButton = <RaisedButton label='Close' onClick={this.handleDiscogCloseClick}/>
      var resultDisplay =
        <div className="result-margin">
          <ListItem>
            <div className="multi-button-box">
              {this.state.showDetailsContainer ? detailsCloseButton : detailsOpenButton}
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
          {this.state.showDetailsContainer ? detailsContainer : null}
          {this.state.showDiscogContainer ? discogContainer : null}
          <Divider />
        </div>
    }
    //else if album search
    else if (this.props.queryType == "master") {
      var resultDisplay =
        <div className="result-margin">
          <ListItem>
            <div className="button-box">
              {this.state.showDetailsContainer ? detailsCloseButton : albumDetailsOpenButton}
            </div>
            <div className="left three-right">
              <img src={picSource} className="image" ></img>
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
            {this.state.showDetailsContainer ? detailsContainer : null}
          </ListItem>
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