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
      discogUrl: this.props.orgin + "/discog",
      showDetailsCloseButton: false,
    };
  },

  handleDetailClick: function() {
    this.executeDetail(this.props.resultsKey);
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
      success: this.successFunction,
      error: this.errorFunction,
    });
  },

  successFunction: function(response){
    this.setState({detailsDetails: response, showDetailsCloseButton: true});
  },

  errorFunction: function(){
    console.log("error");
  },

  render: function () {

        //if artist search
        if (this.props.queryType == "artist") {
          if (this.props.result.type == "artist") {
            var resultDisplay = <div><ListItem leftAvatar={<Avatar src={this.props.picSource} size={75} />} > <div className='inline-block big-text' >{this.props.result.title} </div><div className='inline-block right' ><FlatButton onClick={this.handleDetailClick} label='Artist Details'/></div> <DiscogContainer query={this.props.query} resultsKey={this.props.resultsKey} origin={this.props.origin} results={this.props.results}/><DetailsContainer handleCloseClick={this.handleDetailCloseClick} details={this.state.detailsDetails} queryType={this.props.queryType} showCloseButton={this.state.showDetailsCloseButton}/></ListItem> </div>;
          }
        }
        //if album search
        else if (this.props.queryType == "release_title") {
          if (this.props.result.type == "master") {
            var resultDisplay = <div><ListItem leftAvatar={<Avatar src={this.props.picSource} size={75} />} > {this.props.result.title} <FlatButton onClick={this.handleDetailClick} className='right' label='Album Details'/> <DetailsContainer handleCloseClick={this.handleDetailCloseClick} details={this.state.detailsDetails} queryType={this.props.queryType} showCloseButton={this.state.showDetailsCloseButton}/> </ListItem></div>;
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