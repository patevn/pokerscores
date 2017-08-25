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

  var results = [];
  var result = Object.values(props.testy.scores);
  var i;

  for (i = 0; i < result.length; i++) {
    results.push(<tbody key={result[i].id}><tr><td>{result[i].gameDate}</td> <td><b>AssHole:</b>{result[i].asshole}</td> <td><b>Cash Won:</b>{result[i].cashWon}</td>
      <td><b>Position:</b>{result[i].position}</td> <td><b>President:</b>{result[i].president}</td> <td><b>Who:</b>{result[i].who}</td></tr></tbody>)
  }

  return (
    <table >
      {
        results
      }
    </table>
  );
}



export default App;
