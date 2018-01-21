import React from 'react';
import { connect } from 'react-redux';
import * as trackerActions from '../actions/trackerActions.js';

class App extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.handleClickNext = this.handleClickNext.bind(this);
    this.handleClickPrev = this.handleClickPrev.bind(this);
  }

  componentWillUnmount() {
    this.serverRequest.abort();
  }

  componentDidMount() {
  }

  handleClickNext(e) {
    this.props.dispatch(trackerActions.redo(this.props.iterator));
  }

  handleClickPrev(e) {
    this.props.dispatch(trackerActions.undo(this.props.iterator));
  }

  render() {
    return (
      <div>
        <Totals total={this.props} />
        <Buttons onNextClick={this.handleClickNext} onPrevClick={this.handleClickPrev} />
        <OutputForm week={this.props} />
      </div>
    );
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
        <button className="btn btn-danger btn-cons" onClick={this.handleChangePrev}>
          Prev
          </button>
        <button className="btn btn-success loading" onClick={this.handleChangeNext} >
          Next
          </button>
      </div>
    );
  }
}

function OutputForm(props) {
  if ((props.week.data === undefined))
    return null;
  return (
    <table key={props.week.iterator.length}>
      {
        props.week.data[props.week.iterator.length].map((score, index) =>
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
            <th>{props.total.iterator.length}</th>
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
    iterator: state.iterator,
    data: state.data[0]
  };
}

export default connect(mapStateToProps)(App);
