import React, { PropTypes } from 'react';
const RaisedButton = require('material-ui/lib/raised-button');
import { snakeCase } from '../../js/core_helpers';


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
    link: PropTypes.func.isRequired,
    name: PropTypes.string.isRequied
};

export default ListItem;