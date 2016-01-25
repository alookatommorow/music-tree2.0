var React = require('react');
var AlbumDetailsContainer = require('../details/AlbumDetailsContainer.jsx');
var SearchIndicator = require('../search/SearchIndicator.jsx');




var ListItem = require('material-ui/lib/lists/list-item');
var RaisedButton = require('material-ui/lib/raised-button');
var Divider = require('material-ui/lib/divider');

var AlbumResult = React.createClass({
  getInitialState: function(){
    return {
      tracklist: null,
      inProgress: false,
      showDetailsContainer: false,
    };
  },

  handleDetailClick: function() {
    //if details not yet loaded, fetch, else just display
    if (this.state.tracklist === null) {
      this.setState({inProgress: true, showDetailsContainer: true});
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
    this.setState({tracklist: response.tracklist, inProgress: false});
  },

  errorFunction: function(response){
    console.log(response);
  },

  render: function(){
    var detailsCloseButton = <RaisedButton label='Close' onClick={this.handleDetailCloseClick}/>
    var albumDetailsOpenButton = <RaisedButton onClick={this.handleDetailClick} label='Album Details'/>
    var albumDetailsContainer = <AlbumDetailsContainer inProgress={this.state.inProgress} handleCloseClick={this.handleDetailCloseClick} title={this.props.result.title}  tracklist={this.state.tracklist} queryType={this.props.queryType} />
    var searchIndicator = <SearchIndicator text={"Fetching Details..."}/>
    var detailProgress = this.state.inProgress ? searchIndicator : albumDetailsContainer;
    return (
        <div className="result-margin">
          <ListItem>
            <div className="button-box">
              {this.state.showDetailsContainer ? detailsCloseButton : albumDetailsOpenButton}
            </div>
            <div className="left three-right">
              <img src={this.props.result.thumb} className="image" ></img>
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
            {this.state.showDetailsContainer ? detailProgress : null}
          </ListItem>
          <Divider />
        </div>
    );
  },

});

module.exports= AlbumResult;