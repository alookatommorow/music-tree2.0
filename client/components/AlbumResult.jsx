var React = require('react');
var DetailsContainer = require('./DetailsContainer.jsx');


var ListItem = require('material-ui/lib/lists/list-item');
var RaisedButton = require('material-ui/lib/raised-button');
var Divider = require('material-ui/lib/divider');

var AlbumResult = React.createClass({
  getInitialState: function(){
    return {
      details: null,
      detailInProgress: false,
      showDetailsContainer: false,
      altPicSource: "https://storage.googleapis.com/west-coast-skateparks/music-tree-alt.jpg"
    };
  },

  handleDetailClick: function() {
    //if details not yet loaded, fetch, else just display
    if (this.state.details === null) {
      this.setState({detailInProgress: true, showDetailsContainer: true});
      this.executeDetail(this.props.resultsKey);
    } else {
      this.setState({showDetailsContainer: true})
    }
  },

  handleDetailCloseClick: function(){
    this.setState({showDetailsContainer: false});
  },

  executeDetail: function(resultsKey) {
    $.ajax({
      url: this.props.origin + "/album_info",
      data: {id: this.props.results[resultsKey]["id"]},
    })
    .done(this.detailSuccessFunction)
    .fail(this.errorFunction);
  },

  detailSuccessFunction: function(response){
    this.setState({details: response, detailInProgress: false});
  },

  errorFunction: function(response){
    console.log(response);
  },

  render: function(){
    if (this.props.result.thumb === "") {
      picSource = "https://storage.googleapis.com/west-coast-skateparks/muisc-tree-alt.jpg"
    } else {
      picSource = this.props.result.thumb
    }
    var detailsCloseButton = <RaisedButton label='Close' onClick={this.handleDetailCloseClick}/>
    var albumDetailsOpenButton = <RaisedButton onClick={this.handleDetailClick} label='Album Details'/>
    var detailsContainer = <DetailsContainer inProgress={this.state.detailInProgress} handleCloseClick={this.handleDetailCloseClick} title={this.props.result.title}  details={this.state.details} queryType={this.props.queryType} />
    return (
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
      );
  },

});

module.exports= AlbumResult;