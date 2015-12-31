var React = require('react');
var FlatButton = require('material-ui/lib/flat-button');
var ListItem = require('material-ui/lib/lists/list-item');
var Album = require('./Album.jsx')

var DiscogContainer = React.createClass({

  render: function(){
    var closeButton = <FlatButton label='Close' onClick={this.props.handleCloseClick}/>


    if (this.props.details !== null) {
      var albums = this.props.details.sort(function(a, b){
        return a.year - b.year;
      });

      var discogDisplay = albums.map(function(album, index){
        if (album["type"] === "master"){
          return <Album albumTitle={album.title} albumYear={album.year} />
        }
      });
      // var discogDisplay = albums.map(function(album){
      //   console.log("nutsa");
      //     return <div>{album.title}</div>
      // });
      // var albums = this.state.details.sort(function(a, b){
      //   return a.year - b.year;
      // });
      // var discogDisplay = this.state.details.map(function(album){
      //   console.log("nutsa");
      //   if (album["type"] !== "release"){
      //     return <div>{album.title}</div>
      //   }
      // });
    }
    return(
      <div>
        <div className="details-display">
          <div className="">
            {this.props.showCloseButton ? closeButton : null}
          </div>
          <div>
            {discogDisplay}
          </div>
        </div>
      </div>

      )
  },

});

module.exports = DiscogContainer;