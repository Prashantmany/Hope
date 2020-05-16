import axios from 'axios';

import {FETCH_POSTS, 
        CREATE_POST
} from "./types";

//fetch all hopes
export const getHopes = () => dispatch => {
    axios.get('http://localhost:4000/')
        .then(hopes => {
            dispatch({
                type: FETCH_POSTS,
                payload: hopes
            })
        })
        .catch(err => {
            console.log(err)
        });
};

//Create Hope

export const createHope = (newHope) => dispatch => {
    axios.post('http://localhost:4000/add', newHope)
        .then(post => {
            dispatch({
                type: CREATE_POST,
                payload: post
            })
        })
        .catch(err => {
            console.log(err)
        });
};
