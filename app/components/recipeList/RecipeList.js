import React, { Component } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';

/*** Components ***/
import ListItem from './ListItem';

/*** Styling ***/
import style from './style.scss';

export default class RecipeList extends Component {

    static propTypes = {
        recipeList: ImmutablePropTypes.map
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
            this.props.actions.buildList();
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
                    link={this.props.actions.push}
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