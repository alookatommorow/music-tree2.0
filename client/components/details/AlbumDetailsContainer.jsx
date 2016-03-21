var React = require('react');

var AlbumDetailsContainer = React.createClass({
  render: function(){
    var info = this.props.albumInfo;
    var stats = [];
    var header = <div>Tracklist</div>
    var genre = <div>{info.genres[0]}</div>;

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
          <div className="left-text">
            {tracklist}
          </div>
        </div>
      </div>
    );
  }
});

module.exports = AlbumDetailsContainer;
