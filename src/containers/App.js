import React from 'react';
import { connect } from 'react-redux';
import * as initActions from '../actions/initActions.js';
import UndoRedo from '../containers/UndoRedo.js';
import OutputForm from '../components/OutputForm.js';
import Table from '../components/Table.js';
import Buttons from '../components/Buttons.js';
import Season from '../components/Season.js';
import Week from '../components/Week.js';

class App extends React.Component {

  constructor(props, context) {
    super(props, context);
  }

  handleClickNext = (e) => {
    if (this.props.all.data.length - 1 !== this.props.all.iterator) {
      this.props.dispatch(initActions.calc(this.props));

    }
    if (this.props.all.data.length - 1 === this.props.all.iterator)
      alert("This is the last game");
  }

  render() {
    return (
      <div>
        <Season season={this.props.all.season} />  
        {this.props.all.currentData != null &&
        <Week week={this.props.all.currentData[0].gameDate} /> }
        <UndoRedo />
        <Buttons onNextClick={this.handleClickNext} />
        <Table total={this.props.all} />
        <div className="top">
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
