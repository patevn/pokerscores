import React from 'react';
import { connect } from 'react-redux';
import * as initActions from '../actions/initActions.js';

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
    this.props.dispatch(initActions.redo(this.props));
    this.props.dispatch(initActions.calc(this.props));
  }

  handleClickPrev(e) {
    if (this.props.iterator >= 1) {
      this.props.dispatch(initActions.undo(this.props));
    }
  }

  render() {
    return (
      <div>
        <Totals total={this.props.all.kassie.totals} />
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
  if ((props.week.currentData === undefined || props.week.currentData === null))
    return null;
  return (
    <table key={props.week.iterator}>
      {
        props.week.currentData.map((score, index) =>
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
            <td>{props.total.Matty.cashWon}</td>
            <td>tba</td>
            <td>tba</td>
          </tr>
          <tr>
            <th scope="row">Ando</th>
            <td>tba</td>
            <td>{props.total.Ando.cashWon}</td>
            <td>tba</td>
            <td>tba</td>
          </tr>
          <tr>
            <th scope="row">Grady</th>
            <td>tba</td>
            <td>{props.total.Grady.cashWon}</td>
            <td>tba</td>
            <td>tba</td>
          </tr>
          <tr>
            <th scope="row">Greg</th>
            <td>tba</td>
            <td>{props.total.Greg.cashWon}</td>
            <td>tba</td>
            <td>tba</td>
          </tr>
          <tr>
            <th scope="row">Brad</th>
            <td>tba</td>
            <td>{props.total.Brad.cashWon}</td>
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
    iterator: state.kassie.iterator,
    currentData: state.kassie.currentData,
    all: state
  };
}

export default connect(mapStateToProps)(App);
