import React from 'react';
import { Link } from 'react-router'
import * as initActions from '../actions/initActions.js';
import { connect } from 'react-redux';

let Menu = ({season1 }) => (
    <div>
        <h1 className="main">Main Menu</h1>
        <div className="menu">
            <Link className="btn btn-success" onClick={season1} to='/app'   >Season 1</Link>&nbsp;
                <Link className="btn btn-info" onClick={season1} to='/app'  >Season 2</Link>
        </div>
    </div>
)

const mapStateToProps = (state) => ({
   
})

const mapDispatchToProps = ({
    season1: initActions.season
})

Menu = connect(
    mapStateToProps,
    mapDispatchToProps
)(Menu)

export default Menu