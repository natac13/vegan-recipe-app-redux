import React, { Component, PropTypes } from 'react';
import shouldPureComponentUpdate from 'react-pure-render/function';
import { fromJS, Map, List } from 'immutable';
import { reduxForm } from 'redux-form';
import moment from 'moment';
import axios from 'axios';
import Promise from 'bluebird';


import format, {
    handlePreview,
    dropExtension
} from '../../js/format';

import { formatDate } from '../../js/formatting/helpers';

import { stringifyRecipe } from '../../js/formatting/recipe';

import { snakedNameOf } from '../../js/core_helpers';

/*** Components ***/
import LivePreview from '../livePreview/';
import Button from '../linkButton/';
import InputForm from '../inputForm/';

/*** styling ***/
import style from './style';

class EditRecipe extends Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);

  }

  componentWillMount() {
    const {
      params: { key }
    } = this.props;
    const recipeToEdit = this.props.recipeList.get(key);
    this.props.initializeForm(stringifyRecipe(recipeToEdit));
  }

  shouldComponentUpdate = shouldPureComponentUpdate;

  onSubmit(values, dispatch) {
    return new Promise((resolve, reject) => {
      const { name, created_date, img, ingredients, directions } = values;
      if (!name) {
        const err = {
          name: 'There needs to be a name', // props.error
          _error: 'Failed to save recipe'   // props.errors.name
        };
        reject(err);
      }
      let fileName = '';
      /*====================================
      =            Image upload            =
      ====================================*/
      if(!!img) {
        const file = img[0];
        const reader = new FileReader;
        const cloudinaryUrl = 'http://res.cloudinary.com/dxmist0g2/image/upload/c_scale,h_400,r_10,w_500/';
        fileName = `${cloudinaryUrl}${dropExtension(file.name)}`;
        reader.onload = () => {
          axios.post('/img', {
            imageUrl: reader.result,
            name: dropExtension(file.name)
          });
        };
        reader.readAsDataURL(file);

      }

      /*=====  End of Image upload  ======*/

      const finalDate = formatDate(!created_date ? moment() : created_date);

      const updatedRecipe = fromJS({
        name: format('name')(name),
        created_date: finalDate,
        imageURL: fileName,
        ingredients: format('ingredients')(!ingredients ? '' : ingredients),
        directions: format('directions')(!directions ? '' : directions)
      });
      const {
        params: { key },
        actions: { recipeUpdate },
        recipeList
      } = this.props;
      const DBPromise = recipeUpdate(
            updatedRecipe,
            recipeList.get(key)
          );
      DBPromise.then((action) => {
        setTimeout(() => {
          if (action.error) {
            reject({
              name: 'Need to be logged in to update recipes',
              _error: 'Database'
            });
          } else {
            resolve();
            this.props.actions.push(
              `/recipes/${snakedNameOf(updatedRecipe)}`
            );
          }
        }, 600); // simulate latency
      });
    });
  }

  render() {
    const { handleSubmit, fields } = this.props;
    return (
      <div className={style.wrapper}>
        <InputForm
          submitText="Update Recipe"
          {...this.props}
          handleSubmit={handleSubmit.bind(null, this.onSubmit)} />
        <LivePreview
          className={style.livePreview}
          { ...handlePreview(fields) }
          img={fields.img} />


      </div>
    );

  }

}

export default reduxForm({
  form: 'editRecipe',
  fields: [
    'name',
    'created_date',
    'imageURL',
    'img',
    'directions',
    'ingredients'
  ]
})(EditRecipe);