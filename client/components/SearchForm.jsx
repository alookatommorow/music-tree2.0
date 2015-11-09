var React = require('react');

var SearchForm = React.createClass ({
  render: function () {
    return (
      <div>
        <form action="http://localhost:3000/search" method="get">
          <input type="text" name="query" placeholder="Search..." ></input>
          <input type="submit" value="Search"></input>
        </form>
      </div>
    );
  },

});

module.exports = SearchForm;