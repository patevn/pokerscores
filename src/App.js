import React from 'react';
import * as axios from 'axios';
import KeyBinding from 'react-keybinding-component';
import moment from 'moment';
import sortBy from "lodash/sortBy";

class App extends React.Component {

  constructor(props) {
    super(props);
    this.handleClickNext = this.handleClickNext.bind(this);
    this.handleClickPrev = this.handleClickPrev.bind(this);

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
      if (this.state.iterator < Object.keys(this.state.scores).length) {
        this.setState({
          iterator: this.state.iterator + 1
        });
      }
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

  chunker(arr, chunkSize) {
    let R = [];
    for (let i = 0, len = arr.length; i < len; i += chunkSize)
      R.push(arr.slice(i, i + chunkSize));
    return R;
  }

  render() {
    //sorting and chunking array up into lots of 5
    let sorted = sortBy(this.state.scores, function (o) { return new moment(o.gameDate); });
    let chunks = this.chunker(sorted, 5);
    let chunk = chunks[this.state.iterator];

    if (this.state.scores.valueOf(0).length == 0)
      return null;
    else {
      return (
        <div>
          <KeyBinding onKey={(e) => this.handleKeyPressNext(e)} />
          <Totals />
          <Buttons onNextClick={this.handleClickNext} onPrevClick={this.handleClickPrev} validation={this.state} />
          <OutputForm testy={chunk} />
        </div>
      );
    }
  }
}

class Buttons extends React.Component {

  constructor(props) {
    super(props);
    this.handleChangeNext = this.handleChangeNext.bind(this);
    this.handleChangePrev = this.handleChangePrev.bind(this);
  }

  handleChangeNext(e) {
    this.props.onNextClick(e.target.value);
  }

  handleChangePrev(e) {
    this.props.onPrevClick(e.target.value);
  }

  render() {
    return (
      <div>
        <button className="btn btn-danger btn-cons" disabled={this.props.validation.iterator <= 0} onClick={this.handleChangePrev}>
          Prev
          </button>
        <button className="btn btn-success loading" disabled={this.props.validation.iterator >= Object.keys(this.props.validation.scores).length} onClick={this.handleChangeNext} >
          Next
          </button>
      </div>
    );
  }
}

function OutputForm(props) {

  return (
    <ul >
      {
        props.testy.map((score, index) => <li key={index}>{score.gameDate}
          <b>AssHole:</b> {score.asshole}
          <b>Cash Won:</b> {score.cashWon}
          <b>Position:</b> {score.position}
          <b>President:</b> {score.president}
          <b>Who:</b> {score.who}</li>)
      }
    </ul >
  );
}

function Totals(props) {

  return (
    <div>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>#</th>
            <th>Total Points</th>
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
            <td>tba</td>
          </tr>
          <tr>
            <th scope="row">Mark</th>
            <td>tba</td>
            <td>tba</td>
            <td>tba</td>
            <td>tba</td>
          </tr>
          <tr>
            <th scope="row">Grady</th>
            <td>tba</td>
            <td>tba</td>
            <td>tba</td>
            <td>tba</td>
          </tr>
          <tr>
            <th scope="row">Greg</th>
            <td>tba</td>
            <td>tba</td>
            <td>tba</td>
            <td>tba</td>
          </tr>
          <tr>
            <th scope="row">Brad</th>
            <td>tba</td>
            <td>tba</td>
            <td>tba</td>
            <td>tba</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default App;
