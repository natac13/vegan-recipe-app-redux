import React, { PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
const Paper = require('material-ui/lib/paper');

const LivePreview = ( { name, directions, ingredients }) => {
    return (
        <div className="col span_4_of_8 recipe-output">
            <Paper
                zDepth={4}
                rounded={false}
                className="live-preview">
                <p>Name: {name}</p>
                Directions:
                <ul>
                    {directions}
                </ul>
                Ingredients
                <ul>
                    {ingredients}
                </ul>

            </Paper>
        </div>
    );
};

LivePreview.propTypes = {
    name: PropTypes.string,
    directions: ImmutablePropTypes.list,
    ingredients: ImmutablePropTypes.list
};

export default LivePreview;