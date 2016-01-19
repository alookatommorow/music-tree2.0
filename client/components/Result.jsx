var React = require('react');
var DetailsContainer = require('./DetailsContainer.jsx');
var DiscogContainer = require('./DiscogContainer.jsx');
var ListItem = require('material-ui/lib/lists/list-item');
var Avatar = require('material-ui/lib/avatar');
var RaisedButton = require('material-ui/lib/raised-button');

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
    this.executeDetail(this.props.resultsKey);
  },

  handleDiscogClick: function() {
    this.executeDiscog(this.props.resultsKey);
  },

  handleDiscogCloseClick: function(){
    this.setState({discogDetails: null, showDiscogContainer: false});
  },

  handleDetailCloseClick: function(){
    this.setState({detailsDetails: null, showDetailsContainer: false});
  },

  executeDetail: function(resultsKey) {
    var data = {id: this.props.results[resultsKey]["id"]};
    if (this.props.queryType == "artist"){
      var url = this.state.artistInfoUrl;
    } else if (this.props.queryType == "release_title"){
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
    // var data = {id: this.props.results[resultsKey]["id"]};
    $.ajax({
      url: this.state.discogUrl,
      data: {query: this.props.query},
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


    this.setState({discogDetails: sortedAlbums, lps: lps, eps: eps,showDiscogContainer: true})
  },

  detailSuccessFunction: function(response){
    this.setState({detailsDetails: response, showDetailsCloseButton: true, showDetailsContainer: true});
  },

  errorFunction: function(response){
    console.log(response);
  },

  render: function () {
    var detailsContainer = <DetailsContainer result={this.props.result} handleCloseClick={this.handleDetailCloseClick} details={this.state.detailsDetails} title={this.props.title} queryType={this.props.queryType} />
    var discogContainer = <DiscogContainer result={this.props.result} origin={this.props.origin} handleCloseClick={this.handleDiscogCloseClick} title={this.props.title} albums={this.state.discogDetails} eps={this.state.eps} lps={this.state.lps}/>
    //if artist search
    if (this.props.queryType == "artist") {
      var resultDisplay =
        <div>
          <ListItem className="left-text">
            <div className="right center-text">
              <RaisedButton onClick={this.handleDetailClick} label='Artist Details'/>
              <RaisedButton onClick={this.handleDiscogClick} label='Discography'/>
            </div>
            <div className="left two-right">
              <img src={this.props.picSource} alt="Pic unavailable"></img>
            </div>
            <div className="artist-result-title">
              {this.props.title}
            </div>
            <div className="clear-both"></div>
          </ListItem>
          {this.state.showDetailsContainer ? detailsContainer : null}
          {this.state.showDiscogContainer ? discogContainer : null}
        </div>
    }
    //else if album search
    else if (this.props.queryType == "master") {
      var resultDisplay =
        <div>
          <ListItem className="left-text">
            <div className="right center-text">
              <RaisedButton onClick={this.handleDetailClick} className='right' label='Album Details'/>
            </div>
            <div>
              <img src={this.props.picSource} className="left two-right" ></img>
            </div>
            <div className="album-result-title">
              <div className="bold">
                {this.props.title}
              </div>
              <div className="two-top">
                {this.props.result.year}
              </div>
            </div>
            <div className="clear-both"></div>

          </ListItem>
          {this.state.showDetailsContainer ? detailsContainer : null}
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