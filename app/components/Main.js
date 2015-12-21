import React, { Component, PropTypes } from 'react';

export default class Main extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: 'sean cam'
        }
    }

    render() {
        return (
            <div className="">
                {this.state.name}
                testi
            </div>
        );
    }
}