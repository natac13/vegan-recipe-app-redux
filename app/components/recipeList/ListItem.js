import React, { Component, PropTypes } from 'react';
import { snakeCase } from '../../js/core_helpers';

const RaisedButton = require('material-ui/lib/raised-button');

import style from './style.scss';

export default class ListItem extends Component {
    constructor(props) {
        super(props);
        this.switchVisiblitiy = this.switchVisiblitiy.bind(this);
        this.state = {
            visible: false
        };
    }

    switchVisiblitiy()  {
        this.setState({
            visible: !this.state.visible
        });
    }

    render() {
        const { name, created_date, id, link } = this.props;
        const snakedName = snakeCase(name);

        return (
            <div className={style.recipeItem}>
                <a
                    onClick={this.switchVisiblitiy}
                    className={style.title}>
                    {name} Recipe
                </a>
                <div className={this.state.visible ? style.visible : style.hidden} >
                    <p>Created date: {created_date}</p>
                    <RaisedButton
                        onClick={() => link(`/recipes/${snakedName}`)}
                        label={`View - ${name}`} />
                    <RaisedButton
                        onClick={() => link(`/recipes/${snakedName}`)}
                        label={`Edit - ${name}`} />

                </div>
            </div>
        );
    }
}

// const ListItem = ( { link, name, directions, ingredients, created_date } ) => {
//     const snakedName = snakeCase(name);
//     const visible = false;

//     const switchVisiblitiy = () => {
//         visible = !visible;
//     };

//     return (
//         <div className={style.recipeItem}>
//             <a onClick={switchVisiblitiy}>
//             {name} Recipe
//             </a>
//             <div className=>
//                 <p>Created date: {created_date}</p>
//                 <RaisedButton
//                     onClick={() => link(`/recipes/${snakedName}`)}
//                     label={`View - ${name}`} />
//                 <RaisedButton
//                     onClick={() => link(`/recipes/${snakedName}`)}
//                     label={`Edit - ${name}`} />

//             </div>
//         </div>
//     );
// };

// ListItem.propTypes = {
//     name: PropTypes.string.isRequired,
//     link: PropTypes.func.isRequired
// };

// export default ListItem;