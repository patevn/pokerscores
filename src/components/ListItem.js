import React from 'react';

export default function ListItem(props) {

    let listItems = props.list.map((number, key) =>
    <ListItem key={key} value={number} />)

    function ListItem(props) {
        const tb =
            <tbody>
                <tr>
                    <th scope="row">{props.value.name}</th>
                    <td>{props.value.currentPosition}</td>
                    <td>{props.value.totalPoints}</td>
                    <td>{props.value.cashWon}</td>
                    <td>{props.value.president}</td>
                    <td>{props.value.asshole}</td>
                </tr>
            </tbody>
        return tb;
    }

    return (
        <div>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Current Position</th>
                        <th>Total Points</th>
                        <th>Total $</th>
                        <th>President</th>
                        <th>AssHole</th>
                    </tr>
                </thead>
                {listItems}
            </table>
        </div>
    );
}