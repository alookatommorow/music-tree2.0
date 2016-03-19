var React = require('react');

var AlbumDetailsContainer = React.createClass({

  render: function(){
    var header = <div>Tracklist</div>
    var tracklist = this.props.tracklist.map(function(track, index){
        return <div key={index}>{index+1}. {track['title']}</div>
      });

    return (
      <div>
        <div className="details-display">
          <div className="left-text bold one-bottom">
            {header}
          </div>
          <div className="left-text">
            {tracklist}
          </div>
        </div>
      </div>
    );
  }
});

module.exports = AlbumDetailsContainer;
