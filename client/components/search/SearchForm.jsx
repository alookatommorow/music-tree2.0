var React = require('react');
var ResultsContainer = require('../results/ResultsContainer.jsx');
var FormGroup = require('react-bootstrap/lib/FormGroup');
var FormControl = require('react-bootstrap/lib/FormControl');
var Button = require('react-bootstrap/lib/Button');
var Col = require('react-bootstrap/lib/Col');
var Row = require('react-bootstrap/lib/Row');

var SearchForm = React.createClass ({
  render: function () {
    return (
      <Row className="two-bottom">
        <Col xs={10} md={8} lg={4} xsOffset={1} lgOffset={4} mdOffset={2} >
          <div className="search-form">
            <form onSubmit={this.props.handleSubmit} >
              <FormGroup>
                <FormControl className="query" type="text" placeholder="Enter search..." onChange={this.props.handleChange} />
              </FormGroup>
              <FormGroup>
                <FormControl componentClass="select"  placeholder="Artist" onChange={this.props.toggleQueryType}>
                  <option value='artist'>Artist</option>
                  <option value="master">Album</option>
                </FormControl>
              </FormGroup>
              <Button bsStyle="primary" bsSize="large" onClick={this.props.handleSubmit}>Search</Button>
            </form>
          </div>
        </Col>
      </Row >
    );
  },
});

module.exports = SearchForm;