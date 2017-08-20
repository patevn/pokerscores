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
  var result = Object.keys(props.testy.scores).map(function (key) {
    return [Number(key), props.testy.scores[key]];
  });
  return (
    <ul >
      {

        result.map(scores => <li key={scores.id}>{scores.gameDate} <b>AssHole:</b> {scores.asshole} <b>Cash Won:</b> {scores.cashWon} <b>Position:</b> {scores.position} <b>President:</b> {scores.president} <b>Who:</b> {scores.who}</li>)
      }
    </ul >
  );
}



export default App;
