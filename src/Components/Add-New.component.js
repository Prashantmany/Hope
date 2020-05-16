import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {createHope} from '../Redux/actions/hopeActions';


class Addnewhope extends Component {
    
    constructor(props) {
        super(props);

        this.onChangeHopeHeader = this.onChangeHopeHeader.bind(this);
        this.onChangeHopeBody = this.onChangeHopeBody.bind(this);
        this.onChangeDate = this.onChangeDate.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            Blog_Header: '',
            Blog_Body: '',
            date: new Date()
        }
    }

    onChangeHopeHeader(e) {
        this.setState({
            Blog_Header: e.target.value
        });
    }

    onChangeHopeBody(e) {
        this.setState({
            Blog_Body: e.target.value
        });
    }
    onChangeDate(date) {
        this.setState({
            date: date
        });
    }
    onSubmit(e) {
        e.preventDefault();

        const NewHope = {
            Blog_Header: this.state.Blog_Header,
            Blog_Body: this.state.Blog_Body,
/*          date: this.state.date,
*/
           };

        this.props.createHope(NewHope);

        this.setState({
            Blog_Header: '',
            Blog_Body: '',
            date: new Date()
        })
    }

    render() {
        return (
            <div style={{ marginTop: 10 }}>
                <h3>Let your words do the magic</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Header: </label>
                        <input type="text"
                            className="form-control"
                            value={this.state.Blog_Header}
                            onChange={this.onChangeHopeHeader}
                        />
                    </div>
                    <div className="form-group">
                        <label>Body: </label>
                        <textarea
                            className="form-control"
                            value={this.state.Blog_Body}
                            onChange={this.onChangeHopeBody}
                        />
                    </div>
                    <div className="form-group">
                        <label>Date: </label>
                        <div>
                            <DatePicker
                                selected={this.state.date}
                                onChange={this.onChangeDate}
                            />
                        </div>
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Add New Hope" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        )
    }
}

Addnewhope.propTypes = {
    createHope: PropTypes.func.isRequired,
    hope: PropTypes.object
};

const mapStateToProps = state => ({
    hope: state.hope.item,
    errors: state.errors
}); 

export default connect(
    mapStateToProps,
    {createHope}
)(Addnewhope);