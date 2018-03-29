import React from 'react';
import { connect } from 'react-redux';
import * as initActions from '../actions/initActions.js';
import UndoRedo from './UndoRedo.js'

class App extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.handleClickNext = this.handleClickNext.bind(this);
  }

  handleClickNext(e) {
    if (this.props.all.data.length - 1 != this.props.iterator) {
      this.props.dispatch(initActions.calc(this.props));
    }
  }

  render() {
    return (
      <div>
        <Totals total={this.props.all.totals} />
        <UndoRedo />
        <Buttons onNextClick={this.handleClickNext} />
        <OutputForm week={this.props} />
      </div>
    );
  }
}

class Buttons extends React.Component {

  constructor(props) {
    super(props);
    this.handleChangeNext = this.handleChangeNext.bind(this);
  }

  handleChangeNext(e) {
    this.props.onNextClick(e.target.value);
  }


  render() {
    return (
      <div>
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
            <td>{props.total.Matty.position}</td>
            <td>{props.total.Matty.cashWon}</td>
            <td>{props.total.Matty.president}</td>
            <td>{props.total.Matty.asshole}</td>
          </tr>
          <tr>
            <th scope="row">Ando</th>
            <td>{props.total.Ando.position}</td>
            <td>{props.total.Ando.cashWon}</td>
            <td>{props.total.Ando.president}</td>
            <td>{props.total.Ando.asshole}</td>
          </tr>
          <tr>
            <th scope="row">Grady</th>
            <td>{props.total.Grady.position}</td>
            <td>{props.total.Grady.cashWon}</td>
            <td>{props.total.Grady.president}</td>
            <td>{props.total.Grady.asshole}</td>
          </tr>
          <tr>
            <th scope="row">Greg</th>
            <td>{props.total.Greg.position}</td>
            <td>{props.total.Greg.cashWon}</td>
            <td>{props.total.Greg.president}</td>
            <td>{props.total.Greg.asshole}</td>
          </tr>
          <tr>
            <th scope="row">Brad</th>
            <td>{props.total.Brad.position}</td>
            <td>{props.total.Brad.cashWon}</td>
            <td>{props.total.Brad.president}</td>
            <td>{props.total.Brad.asshole}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

//this returns the props we will use on our component
function mapStateToProps(state, ownProps) {
  return {
    iterator: state.kassie.present.iterator,
    currentData: state.kassie.present.currentData,
    all: state.kassie.present
  };
}

export default connect(mapStateToProps)(App);
