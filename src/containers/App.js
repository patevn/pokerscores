import React from 'react';
import { connect } from 'react-redux';
import * as initActions from '../actions/initActions.js';
import UndoRedo from '../containers/UndoRedo.js';
import OutputForm from '../components/OutputForm.js';
import Table from '../components/Table.js';
import Buttons from '../components/Buttons.js';
import Season from '../components/Season.js';

class App extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.handleClickNext = this.handleClickNext.bind(this);
  }

  handleClickNext(e) {
    if (this.props.all.data.length - 1 !== this.props.all.iterator) {
      this.props.dispatch(initActions.calc(this.props));
    }
    if (this.props.all.data.length - 1 === this.props.all.iterator)
      alert("you are at the end, play more games");
  }

  render() {
    return (
      <div>
        <Season season={this.props.all.season} />
        <Table total={this.props.all.totals} />
        <div className="top">
          <UndoRedo />
          <Buttons onNextClick={this.handleClickNext} />
        </div>
        <OutputForm week={this.props.all} />
      </div>
    );
  }
}

//this returns the props we will use on our component
function mapStateToProps(state, ownProps) {
  return {
    all: state.kassie.present
  };
}

export default connect(mapStateToProps)(App);
