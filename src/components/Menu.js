import React from 'react';
import { Link} from 'react-router'

export default function Menu() {
    return (
        <div>
            <h1 className="main">Main Menu</h1>
            <div className="menu">
                <Link className="btn btn-success" to='/app'>Season 1</Link>&nbsp;
                <Link className="btn btn-info" to='/TBA'>Season 2</Link>
            </div>
        </div>
    );
}