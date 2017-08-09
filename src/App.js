import React, { Component } from 'react';
import fire from './fire';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { scores: [] }; // <- set up react state
  }
  componentWillMount() {
    /* Create reference to scores in Firebase Database */
    let scoresRef = fire.database().ref('scores').orderByKey().limitToLast(100);
    scoresRef.on('child_added', snapshot => {
      /* Update React state when score is added at Firebase Database */
      let score = { text: snapshot.val(), id: snapshot.key };
      this.setState({ scores: [score].concat(this.state.scores) });
    })
  }
  render() {
    debugger;
    return (
      <div>
        <InputForm />
        <OutputForm testy={this.state} />
      </div>
    );
  }
}


class InputForm extends React.Component {
  addscore(e) {
    e.preventDefault(); // <- prevent form submit from reloading the page
    /* Send the score to Firebase */
    fire.database().ref('scores').push({
      gameDate: this.date.value,
      asshole: this.assHole.value,
      cashWon: this.cashWon.value,
      position: this.position.value,
      president: this.president.value,
      who: this.who.value
    }
    );
    // <- clear the input
    this.date.value = '';
    this.assHole.value = '';
    this.cashWon.value = '';
    this.position.value = '';
    this.president.value = '';
    this.who.value = '';
  }
  render() {
    return (
      <form onSubmit={this.addscore.bind(this)}>
        <input type="text" placeholder="Date " ref={el => this.date = el} />
        <input type="text" placeholder="Cash won " ref={el => this.cashWon = el} />
        <input type="text" placeholder="Position " ref={el => this.position = el} />
        President:
        <select ref={el => this.president = el} onChange={this.handleChange}>
          <option value="true">true</option>
          <option value="false">false</option>
        </select>
        <input type="text" placeholder="Who " ref={el => this.who = el} />
        Asshole:
        <select ref={el => this.assHole = el} onChange={this.handleChange}>
          <option value="true">true</option>
          <option value="false">false</option>
        </select>

        <input type="submit" />
      </form>)
  }
}

function OutputForm(props) {
  debugger;
  return (
    <ul >
      { /* Render the list of scores */

        props.testy.scores.map(score => <li key={score.id}>{score.text.gameDate} <b>AssHole:</b> {score.text.asshole} <b>Cash Won:</b> {score.text.cashWon} <b>Position:</b> {score.text.position} <b>President:</b> {score.text.president} <b>Who:</b> {score.text.who}</li>)
      }
    </ul >
  );
}

export default App;
