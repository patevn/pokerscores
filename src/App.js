import React, { Component } from 'react';
import * as axios from 'axios';
import KeyBinding from 'react-keybinding-component';

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

  //TODO: hate this solution but it works. we shoulnd't need to call a whole new function for keypress. Will use for now so i can move on
  handleKeyPressNext(e) {
    if (e.keyCode == 32) {
      this.setState({
        iterator: this.state.iterator + 1
      });
    }
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
          <Totals />
          <KeyBinding onKey={(e) => this.handleKeyPressNext(e)} />
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

function Totals(props) {

  return (
    <div>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>#</th>
            <th>Total $</th>
            <th>President</th>
            <th>AssHole</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">Matty</th>
            <td>tba</td>
            <td>tba</td>
            <td>tba</td>
          </tr>
          <tr>
            <th scope="row">Mark</th>
            <td>tba</td>
            <td>tba</td>
            <td>tba</td>
          </tr>
          <tr>
            <th scope="row">Grady</th>
            <td>tba</td>
            <td>tba</td>
            <td>tba</td>
          </tr>
          <tr>
            <th scope="row">Greg</th>
            <td>tba</td>
            <td>tba</td>
            <td>tba</td>
          </tr>
          <tr>
            <th scope="row">Brad</th>
            <td>tba</td>
            <td>tba</td>
            <td>tba</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
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
      <table className="table table-striped">
        {
          results
        }
      </table>
    </div>
  );
}

export default App;
