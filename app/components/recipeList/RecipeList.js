import React, { Component } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';

/*** Components ***/
import ListItem from './ListItem';

/*** Styling ***/
import style from './style.scss';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as ActionCreators from '../../actions/';


function mapStateToProps(state) {
    const { routing, recipeList } = state;
    return {
        routing,
        recipeList
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(ActionCreators, dispatch),
        dispatch
    };
}


export class RecipeList extends Component {

    static propTypes = {
        recipeList: ImmutablePropTypes.map.isRequired
    }

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        // need to dispatch the async action here.
        // ONLY if recipeList is empty
        if(!!this.props.actions && this.props.recipeList.size === 0) {
            console.log('FIREBASE SEARCH')
            this.props.actions.getRecipeListFirebase(this);
        }
    }

    render() {
        let list = this.props.recipeList.toArray().map((recipe, index) =>{
            return (
                <ListItem
                    name={recipe.get('name')}
                    link={this.props.actions.pushPath}
                    key={recipe.get('id') || index} />
            );
        });

        return (
            <div className={style.recipeList}>

                    {list}

            </div>
        );
    }
}



export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(RecipeList);