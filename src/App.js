import React, { Component } from 'react';
import fire from './fire';

class App extends Component {
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
  addscore(e) {
    e.preventDefault(); // <- prevent form submit from reloading the page
    /* Send the score to Firebase */
    fire.database().ref('scores').push(this.inputEl.value);
    this.inputEl.value = ''; // <- clear the input
  }
  render() {
    return (
      <form onSubmit={this.addscore.bind(this)}>
        <input type="text" placeholder="don't use me yet" ref={el => this.inputEl = el} />
        <input type="submit" />
        <ul>
          { /* Render the list of scores */
            this.state.scores.map(score => <li key={score.id}>{score.text.gameDate} <b>AssHole:</b> {score.text.asshole} <b>Cash Won:</b> {score.text.cashWon} <b>Position:</b> {score.text.position} <b>President:</b> {score.text.president} <b>Who:</b> {score.text.who}</li>)
          }
        </ul>
      </form>
    );
  }
}

export default App;

