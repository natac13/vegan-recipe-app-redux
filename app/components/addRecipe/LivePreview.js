import React, { PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';

const Paper = require('material-ui/lib/paper');
import style from './style'

const LivePreview = ( { name, directions, ingredients }) => {
    return (
        <div className={style.livePreview}>
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