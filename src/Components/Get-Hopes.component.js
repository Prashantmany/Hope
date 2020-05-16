import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {getHopes} from '../Redux/actions/hopeActions';

const mapStateToProps = state => ({
    posts: state.hope.items,
    errors: state.errors
});

class Hopeslist extends Component {

    componentDidMount() {
        this.props.getHopes();
    }

    render() {
        const hopelist = this.props.posts.map(blogs => (
            <div key = {blogs._id}>
                <h3>{blogs.Blog_Header}</h3>
                <p>{blogs.Blog_Body}</p>
                <h4>{blogs.Blog_date.substring(0, 10)}</h4>
            </div>
        ));

        return (
            <div>
                <h2> Hopes List  </h2>
                    { hopelist }
            </div>
        )
    }
}

Hopeslist.propTypes = {
    getHopes: PropTypes.func.isRequired,
    posts: PropTypes.array.isRequired
};

export default connect(
    mapStateToProps,
    { getHopes }
)(Hopeslist);