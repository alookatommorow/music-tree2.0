var React = require('react');


var DiscogContainer = React.createClass({
  getInitialState: function(){
    return {
      details: null,
      url: this.props.origin + "/discog",
      showCloseButton: false,
    };
  },

  handleDiscogClick: function() {
    this.executeDiscog(this.props.resultsKey);
  },

  handleCloseClick: function(){
    this.setState({details: null, showCloseButton: false});
  },

  executeDiscog: function(resultsKey) {
    console.log(this.props.query)
    var data = {id: this.props.results[resultsKey]["id"]};

    $.ajax({
      url: this.state.url,
      // data: {query: this.props.query},
      data: data,
      dataType: 'json',
      success: this.successFunction,
      error: this.errorFunction,
    });

  },

  successFunction: function(response){
    this.setState({details: response, showCloseButton: true});
    console.log(response);
  },

  errorFunction: function(){
    console.log("error");
  },

  render: function(){
    var closeButton = <div><button onClick={this.handleCloseClick}>Close</button></div>


    if (this.state.details !== null) {
      var albums = this.state.details.sort(function(a, b){
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
        <button onClick={this.handleDiscogClick}>Get Discography</button>
        {discogDisplay}
        {this.state.showCloseButton ? closeButton : null}
      </div>

      )
  },

});

module.exports = DiscogContainer;