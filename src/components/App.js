import React from 'react';
import * as axios from 'axios';
import KeyBinding from 'react-keybinding-component';
import moment from 'moment';
import sortBy from "lodash/sortBy";
import { connect } from 'react-redux';
import * as trackerActions from '../actions/trackerActions.js';

class App extends React.Component {

  constructor(props, context) {
    super(props, context);
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
        }).then(function (result) {
          let sort = sortBy(_this.state.scores, function (o) { return new moment(o.gameDate); });
          let chunks = chunker(sort, 5);

          function chunker(arr, chunkSize) {
            let R = [];
            for (let i = 0, len = arr.length; i < len; i += chunkSize)
              R.push(arr.slice(i, i + chunkSize));
            return R;
          }
          _this.setState({
            chunks: chunks
          });
          _this.setState({
            chunkLength: chunks.length
          });
        }).catch(function (error) {
          console.log(error);
        });
  }

  componentWillUnmount() {
    this.serverRequest.abort();
  }

  componentDidMount() {
  }

  //TODO: hate this solution but it works. we shoulnd't need to call a whole new function for keypress. Will use for now so i can move on
  handleKeyPressNext(e) {
    if (e.keyCode == 32) {
      if (this.state.iterator < (this.state.chunks.length - 1)) {
        this.setState({
          iterator: this.state.iterator + 1
        });
      }
    }
  }

  handleClickNext(e) {
    this.props.dispatch(trackerActions.redo(this.state.iterator));
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
    if (this.state.chunks == undefined)
      return null;
    else {
      return (
        <div>
          <KeyBinding onKey={(e) => this.handleKeyPressNext(e)} />
          <Totals />
          <Buttons onNextClick={this.handleClickNext} onPrevClick={this.handleClickPrev} validation={this.state} />
          <OutputForm week={this.state} />
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
        <button className="btn btn-success loading" disabled={this.props.validation.iterator > (this.props.validation.chunks.length - 2)} onClick={this.handleChangeNext} >
          Next
          </button>
      </div>
    );
  }
}

function OutputForm(props) {

  if ((props.week == undefined))
    return null;
  return (
    <table key={props.week.iterator}>
      {
        props.week.chunks[props.week.iterator].map((score, index) =>
          <tbody key={index}><tr>
            <td>{score.gameDate}</td>
            <td><b>AssHole:</b>{String(score.asshole)}</td>
            <td><b>Cash Won:</b>{score.cashWon}</td>
            <td><b>Position:</b>{score.position}</td>
            <td><b>President:</b>{String(score.president)}</td>
            <td><b>Who:</b>{score.who}</td>
          </tr></tbody>
        )
      }
    </table >
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

//this returns the props we will use on our component
function mapStateToProps(state, ownProps) {
  return {
    iterator: state.iterator
  };
}

export default connect(mapStateToProps)(App);
