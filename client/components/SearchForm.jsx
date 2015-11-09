var React = require('react');

var SearchForm = React.createClass ({
  render: function () {
    return (
      <div>
        <form action="http://localhost:3000/search">
          <input type="text" placeholder="Search..." ></input>
          <input type="button" value="Search"></input>
        </form>
      </div>
    );
  },

});

module.exports = SearchForm;