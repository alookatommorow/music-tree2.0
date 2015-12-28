var React = require('react');


var DiscogContainer = React.createClass({

  render: function(){
    var closeButton = <div><button onClick={this.props.handleCloseClick}>Close</button></div>


    if (this.props.details !== null) {
      var albums = this.props.details.sort(function(a, b){
        return a.year - b.year;
      });

      var discogDisplay = albums.map(function(album, index){
        if (album["type"] === "master"){
          return <div>{album.title} {album.year}</div>
          // return <div>{album["title"]} {album.year}</div>
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
          <div className="right one-left">
            {this.props.showCloseButton ? closeButton : null}
          </div>
          <div className="left-text">
            {discogDisplay}
          </div>
        </div>
      </div>

      )
  },

});

module.exports = DiscogContainer;