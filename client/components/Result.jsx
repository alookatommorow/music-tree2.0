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
    var data = {id: this.props.results[resultsKey]["id"]};
    $.ajax({
      url: this.state.discogUrl,
      data: {query: this.props.query},
      // data: data,
      dataType: 'json',
      success: this.discogSuccessFunction,
      error: this.errorFunction,
    });
  },

  discogSuccessFunction: function(response){
    this.setState({discogDetails: response, showDiscogCloseButton: true, showDiscogContainer: true})
    console.log(response);
  },

  detailSuccessFunction: function(response){
    this.setState({detailsDetails: response, showDetailsCloseButton: true, showDetailsContainer: true});
  },

  errorFunction: function(response){
    console.log(response);
  },

  render: function () {
    var detailsContainer = <DetailsContainer result={this.props.result} handleCloseClick={this.handleDetailCloseClick} details={this.state.detailsDetails} title={this.props.title} queryType={this.props.queryType} />
    var discogContainer = <DiscogContainer result={this.props.result} handleCloseClick={this.handleDiscogCloseClick} title={this.props.title} albums={this.state.discogDetails}/>
    //if artist search
    if (this.props.queryType == "artist") {
      if (this.props.result.type == "artist") {
        var resultDisplay =
          <div>
            <ListItem className="left-text">
              <div className="right center-text">
                <div className='four-bottom'>
                  <RaisedButton onClick={this.handleDetailClick} label='Artist Details'/>
                </div>
                <div>
                  <RaisedButton onClick={this.handleDiscogClick} label='Discography'/>
                </div>
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
    }
    //if album search
    else if (this.props.queryType == "release_title") {
      if (this.props.result.type == "master") {
        var resultDisplay =
          <div>
            <ListItem className="left-text">
              <div className="right center-text">
                <RaisedButton onClick={this.handleDetailClick} className='right' label='Album Details'/>
              </div>
              <div>
                <img src={this.props.picSource} className="left two-right" ></img>
                <div className="album-result-title">
                  <div className="bold">
                    {this.props.title}
                  </div>
                  <div className="ten-top">
                    {this.props.result.year}
                  </div>
                </div>
              </div>
              <div className="clear-both"></div>

            </ListItem>
            {this.state.showDetailsContainer ? detailsContainer : null}
          </div>
      }
    }

    return (
        <div>
          {resultDisplay}
        </div>
    );
  },

});

module.exports = Result;