var React = require('react');

var App = React.createClass({

  render: function () {
    var menu = this.state.showMenu ? 'show-menu' : 'hide-menu';

    return (
      <div id="app" className={menu}>
        <NavBar signedIn={this.state.signedIn} currentUser={this.state.currentUser} origin={this.props.origin} sendMenuClick={this.handleMenuClick}/>
          <RouteHandler origin={this.props.origin} readFromAPI={this.readFromAPI} writeToAPI={this.writeToAPI} signedIn={this.state.signedIn} currentUser={this.state.currentUser}/>
      </div>
    );
  },

});


module.exports = App;
