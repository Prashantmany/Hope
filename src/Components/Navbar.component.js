import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Navbar extends Component {

    render() {
        return (
            <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
                <Link to="/" className="navbar-brand">Home</Link>
                <div className="collpase navbar-collapse">
                    <ul className="navbar-nav mr-auto">
                        <li className="navbar-item">
                            <Link to="/" className="nav-link">Blogs</Link>
                        </li>
                        <li className="navbar-item">
                            <Link to="/Add" className="nav-link">Write a new Blog</Link>
                        </li>
                        <li className="navbar-item">
                            <Link to="/Register" className="nav-link">Register New User</Link>
                        </li>
                        <li className="navbar-item">
                            <Link to="/Login" className="nav-link">Login Existing Users</Link>
                        </li>
                    </ul>
                </div>
            </nav>
        );
    }
}