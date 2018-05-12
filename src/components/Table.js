import React from "react";

export default function Table(props) {

    function ListItem(props) {

        const ul = <ul>
            <li>{props.value.name}</li>
            <li>{props.value.president}</li>
            <li>{props.value.asshole}</li>
            <li>{props.value.cashWon}</li>
            <li>{props.value.position}</li>
        </ul>
        return ul;
    }

    let list = Object.values(props.total)

    const listItems = list.map((number, key) =>
        <ListItem key={key} value={number} />

    );
    return (
        <ul>
            {listItems}
        </ul>
    );

}