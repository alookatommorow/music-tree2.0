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
      showDetailsCloseButton: false,
      showDiscogCloseButton: false,
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
    this.setState({discogDetails: null, showDiscogCloseButton: false});
  },

  handleDetailCloseClick: function(){
    this.setState({detailsDetails: null, showDetailsCloseButton: false});
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
      // data: {query: this.props.query},
      data: data,
      dataType: 'json',
      success: this.discogSuccessFunction,
      error: this.errorFunction,
    });

  },

  discogSuccessFunction: function(response){
    this.setState({discogDetails: response, showDiscogCloseButton: true, showDiscogContainer: true});
  },

  detailSuccessFunction: function(response){
    this.setState({detailsDetails: response, showDetailsCloseButton: true, showDetailsContainer: true});
    console.log(response["profile"])
  },

  errorFunction: function(){
    console.log("error");
  },

  render: function () {
    var detailsContainer = <DetailsContainer handleCloseClick={this.handleDetailCloseClick} details={this.state.detailsDetails} queryType={this.props.queryType} showCloseButton={this.state.showDetailsCloseButton}/>
    var discogContainer = <DiscogContainer handleCloseClick={this.handleDiscogCloseClick} details={this.state.discogDetails} showCloseButton={this.state.showDiscogCloseButton}/>
    //if artist search
    if (this.props.queryType == "artist") {
      if (this.props.result.type == "artist") {
        var resultDisplay =
          <ListItem className="left-text blue">
            <div className="right center-text">
              <div className='two-bottom'>
                <RaisedButton onClick={this.handleDetailClick} label='Artist Details'/>
              </div>
              <div>
                <RaisedButton onClick={this.handleDiscogClick} label='Discography'/>
              </div>
            </div>
            <div>
              <img src={this.props.picSource} alt="Pic unavailable" className="left two-right"></img>
              <div className="result-title">
                {this.props.result.title}
              </div>
            </div>
            <div className="clear-both"></div>
            {this.state.showDetailsContainer ? detailsContainer : null}
            {this.state.showDiscogContainer ? discogContainer : null}
          </ListItem>;
      }
    }
    //if album search
    else if (this.props.queryType == "release_title") {
      if (this.props.result.type == "master") {
        var resultDisplay =
        <ListItem className="left-text">
          <div className="right center-text">
            <RaisedButton onClick={this.handleDetailClick} className='right' label='Album Details'/>
          </div>
          <div>
            <img src={this.props.picSource} className="left two-right"></img>
            <div className="result-title">
              {this.props.result.title}
            </div>
          </div>
          <div className="clear-both"></div>
          {this.state.showDetailsContainer ? detailsContainer : null}
        </ListItem>
      }
    }
    //if song search
    else if (this.props.queryType == "track") {
      if (this.props.result.type == "master") {
        var resultDisplay =
        <ListItem>
          {this.props.result.title}
          <DetailsContainer origin={this.props.origin} queryType={this.props.queryType} results={this.props.results} resultsKey={this.props.resultsKey} />
        </ListItem>;
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