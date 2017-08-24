import React, { Component } from 'react';
import fire from './fire';
import * as axios from 'axios';

class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      scores: []
    };

    var _this = this;
    this.serverRequest =
      axios
        .get('https://pokerscores-b2b64.firebaseio.com/scores.json')
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

  render() {
    if (this.state.scores.valueOf(0).length == 0)
      return null;
    else {
      return (
        <div>
          <OutputForm testy={this.state} />
        </div>
      );
    }
  }
}

function OutputForm(props) {

var result = Object.values(props.testy.scores);

  return (
    <ul >
      {
        <li key={result[0].id}>
          {result[0].gameDate} <b>AssHole:</b> {result[0].asshole} <b>Cash Won:</b> {result[0].cashWon} <b>Position:</b> {result[0].position} <b>President:</b> {result[0].president} <b>Who:</b> {result[0].who}
        </li>
      }
    </ul >
  );
}



export default App;
