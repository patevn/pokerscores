import React from "react";
import ListItem from '../components/ListItem.js';
import sortBy from "lodash/sortBy";

export default class Table extends React.Component {

    constructor(props) {
        super(props);
        let list = Object.values(this.props.total.totals);
        let _sortedList = sortBy(list, ['currentPosition']);
        _sortedList.reverse();
        let _growingList = [];
        this.state = {
            i: 0,
            sortedList: _sortedList,
            growingList: _growingList
        };
        this.handleClickNextPlace = this.handleClickNextPlace.bind(this);
    }

    handleClickNextPlace(e) {
        if (this.state.growingList.length === this.state.sortedList.length) {
            this.setState({ growingList: [] });
            this.setState({ i: 0 });
        };

        let i = this.state.i;
        let glup = this.state.growingList;
        glup.push(this.state.sortedList[i]);
        i++;
        this.setState({ growingList: glup });
        this.setState({ i: i });
    }

    componentWillReceiveProps(newProps) {
        let list = Object.values(newProps.total.totals);
        let _sortedList = sortBy(list, ['currentPosition']);
        _sortedList.reverse();
        let _growingList = [];
        this.setState({
            i: 0,
            sortedList: _sortedList,
            growingList: _growingList
        })

    }
    render() {
        return (
            <div>
                <button className="btn btn-primary" onClick={this.handleClickNextPlace} disabled={this.state.i === 5}> Next Place</button>
                <ListItem list={this.state.growingList} />
            </div>
        )
    }
}