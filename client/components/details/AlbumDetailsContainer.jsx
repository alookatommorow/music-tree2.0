var React = require('react');

var AlbumDetailsContainer = React.createClass({
  render: function(){
    var info = this.props.albumInfo;
    // Subgenres
    var styles = info.styles.map(function(style){
      return <div key={style}>{style}</div>;
    });
    //Formats
    var formats = info.formats[0].descriptions.map(function(format){
      return <div key={format}>{format}</div>;
    });
    var label = info.labels[0].name;
    var country = <div>{info.country}</div>
    var header = <div>Tracklist</div>
    var genre = <div>Genre: {info.genres[0]}</div>

    var tracklist = info.tracklist.map(function(track, index){
        return <div key={index}>{index+1}. {track['title']}</div>
      });

    return (
      <div>
        <div className="details-display">
          <div className="left-text bold one-bottom">
            {header}
          </div>
            {genre}
            {label}
            {country}
            {formats}
            {styles}
          <div className="left-text">
            {tracklist}
          </div>
        </div>
      </div>
    );
  }
});

module.exports = AlbumDetailsContainer;
