var React = require('react');


var ResultsContainer = React.createClass ({

  render: function () {

    var queryType = this.props.queryType;


    if (this.props.results == null) {
      var searchResult = "Enter search terms"
    } else {
      var searchResult = this.props.results.map(function(result, index){
        console.log(queryType)
        //if artist search
        if (queryType == "artist") {
          if (result.type == "artist") {
            return <li className="collection-item" key={index}> {result.title} <button>Get details</button> </li> ;
          }
        }
        //if album search
        else if (queryType == "release_title") {
          if (result.type == "master") {
            return <li className="collection-item" key={index}> {result.title} </li>;
          }
        }
        //if song search
        else if (queryType == "track") {
          if (result.type == "master") {
            return <li className="collection-item" key={index}> {result.title} </li>;
          }
        }
      });
    };
    return (
        <div className="collection">
          {searchResult}
        </div>
    )
  },
});

module.exports = ResultsContainer;