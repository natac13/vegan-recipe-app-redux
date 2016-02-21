import React, { Component, PropTypes } from 'react';

/*** Third Party Components ***/
import Dialog from 'react-toolbox/lib/dialog';
import { Button, IconButton } from 'react-toolbox/lib/button';
import Icon from 'react-fa';

import style from './style.scss';

class NavButton extends Component {
    constructor(props) {
      super(props);
      this.state = {
        open: false
      };
    }

    handleOpen = () => {
      this.setState({
        open: true
      });
    };

    handleClose = () => {
      this.setState({
        open: false
      });
    };

    render() {
      return (
        <div className={`${style.root} ${this.props.className}`}  >
          <IconButton
            className={style.navBars}
            neutral={false}
            onClick={this.handleOpen}>
            <Icon
              name={this.state.open ? 'times-circle-o' : 'bars'} />
          </IconButton>
          <Dialog
            active={this.state.open}
            onOverlayClick={this.handleClose}
            className={style.dialog} >


              <Button
                flat
                label="What is this?"
                target="_blank"
                neutral={false}
                className={style.link} />
              <Button
                flat
                label="Why?"
                target="_blank"
                neutral={false}
                className={style.link} />
              <Button
                flat
                label="Contact"
                target="_blank"
                neutral={false}
                className={style.link} />

          </Dialog>
        </div>

      );
    }

}

export default NavButton;