import React from 'react';

export default function OutputForm(props) {
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