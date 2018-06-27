import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import LoginForm from './LoginForm/index.js';


class Home extends Component {
    render () {
        return (
            <LoginForm />
        );
    }
}
let root = document.getElementById('home');
if (root) {
    ReactDOM.render(<Home/>, root);
}
