import React, { PropTypes } from 'react';

import style from './style.scss';

const LinkButton = ({onClick, label}) => {
    return (
        <button onClick={onClick} className={style.linkButton}>{label}</button>
    );
};

LinkButton.propTypes = {
    label: PropTypes.string.isRequired,
    onClick: PropTypes.func
};

LinkButton.defaultProps = {
    label: 'LinkButton-default'
};

export default LinkButton;