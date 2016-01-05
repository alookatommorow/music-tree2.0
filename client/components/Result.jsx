var React = require('react');

var DetailsContainer = require('./DetailsContainer.jsx');
var DiscogContainer = require('./DiscogContainer.jsx');
var ListItem = require('material-ui/lib/lists/list-item');
var Avatar = require('material-ui/lib/avatar');
var FlatButton = require('material-ui/lib/flat-button');

var Result = React.createClass ({
  getInitialState: function(){
    return {
      detailsDetails: null,
      discogDetails: null,
      artistInfoUrl: this.props.origin + "/artist_info",
      albumInfoUrl: this.props.origin + "/album_info",
      discogUrl: this.props.origin + "/discog",
      showDetailsCloseButton: false,
      showDiscogCloseButton: false,
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
    this.setState({discogDetails: response, showDiscogCloseButton: true});
    console.log(response);
  },

  detailSuccessFunction: function(response){
    this.setState({detailsDetails: response, showDetailsCloseButton: true});
  },

  errorFunction: function(){
    console.log("error");
  },

  render: function () {

        //if artist search
        if (this.props.queryType == "artist") {
          if (this.props.result.type == "artist") {
            var resultDisplay =
              <ListItem className="left-text">
                <img src={this.props.picSource} className="left two-right"></img>
                <div className="result-title">
                  {this.props.result.title}
                </div>
                <FlatButton className='right' onClick={this.handleDetailClick} label='Artist Details'/>
                <FlatButton className='right right-clear' onClick={this.handleDiscogClick} label='Discography'/>
                <DetailsContainer handleCloseClick={this.handleDetailCloseClick} details={this.state.detailsDetails} queryType={this.props.queryType} showCloseButton={this.state.showDetailsCloseButton}/>
                <DiscogContainer handleCloseClick={this.handleDiscogCloseClick} details={this.state.discogDetails} showCloseButton={this.state.showDiscogCloseButton}/>
                <div className="clear-both"></div>
              </ListItem>;
          }
        }
        //if album search
        else if (this.props.queryType == "release_title") {
          if (this.props.result.type == "master") {
            var resultDisplay =
            <div>
              <ListItem>
                <img src={this.props.picSource} className="left"></img>
                {this.props.result.title}
                <FlatButton onClick={this.handleDetailClick} className='right' label='Album Details'/>
                <DetailsContainer handleCloseClick={this.handleDetailCloseClick} details={this.state.detailsDetails} queryType={this.props.queryType} showCloseButton={this.state.showDetailsCloseButton}/>
                <div className="clear-both"></div>
              </ListItem>
            </div>;
          }
        }
        //if song search
        else if (this.props.queryType == "track") {
          if (this.props.result.type == "master") {
            var resultDisplay = <div><ListItem> {this.props.result.title} <DetailsContainer origin={this.props.origin} queryType={this.props.queryType} results={this.props.results} resultsKey={this.props.resultsKey} /> </ListItem></div>;
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