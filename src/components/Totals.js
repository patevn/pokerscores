import React from 'react';

export default function Totals(props) {
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