import React, { PropTypes } from 'react';
import { snakeCase } from '../../js/core_helpers';

const RaisedButton = require('material-ui/lib/raised-button');

import style from './style.scss';

const ListItem = ( { link, name } ) => {
    const snakedName = snakeCase(name);
    return (
        <li className="recipe-item">
            <RaisedButton
                onClick={() => link(`/recipes/${snakedName}`)}
                label={name} />
        </li>
    );
};

ListItem.propTypes = {
    name: PropTypes.string.isRequired,
    link: PropTypes.func.isRequired
};

export default ListItem;