import React, { PropTypes } from 'react';

import style from './style.scss';

const LinkButton = ({ onClick, label, icon, disabled, type }) => {
    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={style.linkButton}>
            {label}

            {!icon ? null :
                <i className={`${icon} ${style.icon}`}/>
            }
        </button>
    );
};

LinkButton.propTypes = {
    label: PropTypes.string.isRequired,
    icon: PropTypes.string,
    onClick: PropTypes.func,
    type: PropTypes.string
};

LinkButton.defaultProps = {
    label: 'LinkButton-default',
    type: 'button',
    onClick: () => {}
};

export default LinkButton;