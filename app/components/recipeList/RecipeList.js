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
    const { routing, recipeList, asyncRequest } = state;
    return {
        recipeList,
        asyncRequest,
        routing
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
    };

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        // need to dispatch the async action here.
        // ONLY if recipeList is empty
        if(!!this.props.actions && this.props.recipeList.size === 0) {
            console.log('FIREBASE SEARCH');
            // let snapshotPromise = this.props.actions.getRecipeListFirebase();
            this.props.actions.buildList('test');
        }
    }

    render() {
        let list = this.props.recipeList.toArray().map((recipe, index) =>{
            const {
                name,
                directions,
                ingredients,
                created_date,
                id
            } = recipe.toJS();
            return (
                <ListItem
                    name={name}
                    directions={directions}
                    ingredients={ingredients}
                    created_date={created_date}
                    link={this.props.actions.pushPath}
                    key={id || index} />
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