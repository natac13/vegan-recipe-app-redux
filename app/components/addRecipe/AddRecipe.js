import React, { PropTypes } from 'react';
import { fromJS, Map, List } from 'immutable';
import { reduxForm } from 'redux-form';


import axios   from 'axios';
import Promise from 'bluebird';
import moment  from 'moment';
import uuid    from 'node-uuid';

import format, {
  formatDate,
  handlePreview,
  dropExtension
} from '../../js/format';
import { snakedNameOf } from '../../js/core_helpers';

/*** Components ***/
import LivePreview from '../livePreview/';
import InputForm from '../inputForm';

/*** styling ***/
import style from './style';

const AddRecipe = (props) => {

  const onSubmit = (values, dispatch) => {
    return new Promise((resolve, reject) => {

      const { name, created_date, img, ingredients, directions } = values;
      if (!name) {
        const err = {
          name: 'There needs to be a name', // props.errors.name
          _error: 'validation'   // props.error
        };
        reject(err);
      }
      /*====================================
      =            Image upload            =
      ====================================*/
      // let fileName = '';
      // if (img) {
    //     // Send the image file to the server if added by user.
    //     const cloudinaryUrl = 'http://res.cloudinary.com/dxmist0g2/image/upload/c_scale,h_400,r_10,w_500/';
    //     const file = img[0];
    //     const reader = new FileReader;
    //     fileName = `${cloudinaryUrl}${dropExtension(file.name)}`;
    //     reader.onload = () => {
  //         axios.post('/img', {
//             imageUrl: reader.result,
//             name: dropExtension(file.name)
  //         });
    //     };
    //     reader.readAsDataURL(file);

      // }

      /*=====  End of Image upload  ======*/

      /*** Create date ***/
      const defaultDate = moment();
      const finalDate = formatDate(!created_date ?
                                    defaultDate :
                                    created_date
                                  );

      const newRecipe = fromJS({
        name: format('name')(!name ? '' : name),
        id: uuid.v4(),
        created_date: finalDate,
        imageURL: img, // empty if no img uploaded
        ingredients: format('ingredients')(!ingredients ? '' : ingredients),
        directions: format('directions')(!directions ? '' : directions)
      });

      /**
       * DBPromise is being returned from the custom Firebase middleware.
       * It will be either the addSuccessful or addFailure promise.
       * The action param is the returned value from that promise. Which
       * is either the next(action) or the dispatch(failedRequest(err))
       * @type {promise}
       */
      const DBPromise = props.actions.recipeAdd(newRecipe);
      DBPromise.then((action) => {
        setTimeout(() => {
          if (action.error) {
            reject({
              name: 'Need to be logged in to add recipes',
              _error: 'Database'
            });
          } else {
            resolve();
            props.actions.push(`/recipes/${snakedNameOf(newRecipe)}`);
          }

        }, 600); // simulate latency
      });
    });
  };

  const { fields, handleSubmit } = props;

  return (
    <div className={style.wrapper}>
      <InputForm
        submitText="Add New Recipe!"
        { ...props }
        handleSubmit={handleSubmit.bind(null, onSubmit)} />
      <LivePreview
        className={style.livePreview}
        { ...handlePreview(fields) }
        img={fields.img} />
    </div>
  );
};

export default reduxForm({
  form: 'addRecipe',
  fields: [
    'name',
    'created_date',
    'imageURL',
    'directions',
    'ingredients',
    'img'
  ]
})(AddRecipe);