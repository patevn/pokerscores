import React from 'react';

//TODO: turn this into a function and use fat arrow syntax to simplify
export default class Buttons extends React.Component {

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
