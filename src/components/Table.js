import React from "react";

export default function Table(props) {

    function ListItem(props) {

        const tb =
            <tbody>
                <tr>
                    <th scope="row">{props.value.name}</th>
                    <td>{props.value.position}</td>
                    <td>{props.value.cashWon}</td>
                    <td>{props.value.president}</td>
                    <td>{props.value.asshole}</td>
                </tr>
            </tbody>
        return tb;
    }

    let list = Object.values(props.total)

    const listItems = list.map((number, key) =>
        <ListItem key={key} value={number} />

    );
    return (
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
            {listItems}
        </table>
    );

}