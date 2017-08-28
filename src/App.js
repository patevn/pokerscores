import React, { Component } from 'react';
import * as axios from 'axios';

class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      scores: [],
      iterator: 0
    };

    var _this = this;
    this.serverRequest =
      axios
        .get('https://pokerscores-a9da7.firebaseio.com/scores.json')
        .then(function (result) {
          console.log(result.data);
          console.log(result.status);
          _this.setState({
            scores: result.data
          });
        }).catch(function (error) {
          console.log(error);
        });
  }

  componentWillUnmount() {
    this.serverRequest.abort();
  }

  handleClickNext(e) {
    this.setState({
      iterator: this.state.iterator + 1
    });
  }

  handleClickPrev(e) {
    this.setState({
      iterator: this.state.iterator - 1
    });
  }

  render() {
    if (this.state.scores.valueOf(0).length == 0)
      return null;
    else {
      return (
        <div>
          <button disabled={this.state.iterator <= 0} onClick={(e) => this.handleClickPrev(e)}>
            Prev
          </button>
          <button disabled={this.state.iterator >= Object.keys(this.state.scores).length} onClick={(e) => this.handleClickNext(e)} >
            Next
          </button>
          <OutputForm testy={this.state} />
        </div>
      );
    }
  }
}

function OutputForm(props) {

  var results = [];
  var result = Object.values(props.testy.scores);
  var i;

  for (i = 0; i < props.testy.iterator; i++) {
    results.push(<tbody key={result[i].id}><tr><td>{result[i].gameDate}</td><td><b>AssHole:</b>{result[i].asshole.toString()}</td><td><b>Cash Won:</b>{result[i].cashWon}</td>
      <td><b>Position:</b>{result[i].position}</td><td><b>President:</b>{result[i].president.toString()}</td><td><b>Who:</b>{result[i].who}</td></tr></tbody>)
  }

  return (
    <div>
      <table >
        {
          results
        }
      </table>
    </div>
  );
}

export default App;
