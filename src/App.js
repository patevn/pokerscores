import React, { Component } from 'react';
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

  render() {
    if (this.state.scores.valueOf(0).length == 0)
      return null;
    else {
      return (
        <div>
          <KeyBinding onKey={(e) => this.handleKeyPressNext(e)} />
          <Buttons onNextClick={this.handleClickNext} onPrevClick={this.handleClickPrev} validation={this.state} />
          <OutputForm testy={this.state} />
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
        <button className="btn btn-danger btn-cons" disabled={true} onClick={this.handleChangePrev}>
          Prev
          </button>
        <button className="btn btn-success loading" disabled={this.props.validation.iterator >= Object.keys(this.props.validation.scores).length} onClick={this.handleChangeNext} >
          Next
          </button>
      </div>
    );
  }
}

class OutputForm extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    var results = [];
    var result = Object.values(this.props.testy.scores);
    var i;

    var sorted = sortBy(result, function(o) { return new moment(o.gameDate); });

    for (i = 0; i < this.props.testy.iterator; i++) {
      results.push(<tbody key={sorted[i].id}><tr>
        <td>{sorted[i].gameDate}</td>
        <td><b>AssHole:</b>{String(sorted[i].asshole)}</td>
        <td><b>Cash Won:</b>{sorted[i].cashWon}</td>
        <td><b>Position:</b>{sorted[i].position}</td>
        <td><b>President:</b>{String(sorted[i].president)}</td>
        <td><b>Who:</b>{sorted[i].who}</td></tr></tbody>)
    }

    return (
      <div>
        <Totals totally={sorted} interator={this.props.testy.iterator} />
        <table className="table table-striped">
          {
            results
          }
        </table>
      </div>
    );
  }
}

class Totals extends React.Component {
  constructor(props) {
    super(props);


    this.state = {
      mattyTotal: 0.00,
      gradyTotal: 0.00,
      gregTotal: 0.00,
      bradTotal: 0.00,
      andoTotal: 0.00,
      mattyPoints: 0,
      gradyPoints: 0,
      gregPoints: 0,
      bradPoints: 0,
      andoPoints: 0,
      mattyAss: 0,
      gradyAss: 0,
      gregAss: 0,
      bradAss: 0,
      andoAss: 0,
      mattyPres: 0,
      gradyPres: 0,
      gregPres: 0,
      bradPres: 0,
      andoPres: 0
    };
  }


  componentWillReceiveProps(nextProps) {

    switch (this.props.totally[this.props.interator].who) {
      case "Matty":
        this.state.mattyTotal += Number(this.props.totally[this.props.interator].cashWon);
        this.state.mattyPoints += Number(this.props.totally[this.props.interator].position);
        if(this.props.totally[this.props.interator].asshole == true){
          this.state.mattyAss++;
        }
        if(this.props.totally[this.props.interator].president == true){
          this.state.mattyAss++;
        }
        break;
      case "Grady":
        this.state.gradyTotal += Number(this.props.totally[this.props.interator].cashWon);
        this.state.gradyPoints += Number(this.props.totally[this.props.interator].position);
        if(this.props.totally[this.props.interator].asshole === true){
          this.state.mattyAss++;
        }
        if(this.props.totally[this.props.interator].president === true){
          this.state.mattyPres++;
        }
        break;
      case "Greg":
        this.state.gregTotal += Number(this.props.totally[this.props.interator].cashWon);
        this.state.gregPoints += Number(this.props.totally[this.props.interator].position);
        if(this.props.totally[this.props.interator].asshole === true){
          this.state.gregAss++;
        }
        if(this.props.totally[this.props.interator].president === true){
          this.state.gregPres++;
        }
        break;
      case "Brad":
        this.state.bradTotal += Number(this.props.totally[this.props.interator].cashWon);
        this.state.bradPoints += Number(this.props.totally[this.props.interator].position);
        if(this.props.totally[this.props.interator].asshole === true){
          this.state.bradAss++;
        }
        if(this.props.totally[this.props.interator].president === true){
          this.state.bradPres++;
        }
        break;
        case "Ando":
        this.state.andoTotal += Number(this.props.totally[this.props.interator].cashWon);
        this.state.andoPoints += Number(this.props.totally[this.props.interator].position);
        if(this.props.totally[this.props.interator].asshole === true){
          this.state.andoAss++;
        }
        if(this.props.totally[this.props.interator].president === true){
          this.state.andoPres++;
        }
        break;
    }
  }

  render() {
    if (this.state == null) {
      return null;
    } else {
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
                <td>{this.state.mattyPoints}</td>
                <td>{this.state.mattyTotal}</td>
                <td>{this.state.mattyPres}</td>
                <td>{this.state.mattyAss}</td>
              </tr>
              <tr>
                <th scope="row">Grady</th>
                <td>{this.state.gradyPoints}</td>
                <td>{this.state.gradyTotal}</td>
                <td>{this.state.gradyPres}</td>
                <td>{this.state.gradyAss}</td>
              </tr>
              <tr>
                <th scope="row">Greg</th>
                <td>{this.state.gregPoints}</td>
                <td>{this.state.gregTotal}</td>
                <td>{this.state.gregPres}</td>
                <td>{this.state.gregAss}</td>
              </tr>
              <tr>
                <th scope="row">Brad</th>
                <td>{this.state.bradPoints}</td>
                <td>{this.state.bradTotal}</td>
                <td>{this.state.bradPres}</td>
                <td>{this.state.bradAss}</td>
              </tr>
              <tr>
                <th scope="row">Ando</th>
                <td>{this.state.andoPoints}</td>
                <td>{this.state.andoTotal}</td>
                <td>{this.state.andoPres}</td>
                <td>{this.state.andoAss}</td>
              </tr>
            </tbody>
          </table>
        </div>
      );
    }
  }
}

export default App;
