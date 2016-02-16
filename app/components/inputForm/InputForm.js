import React, { Component, PropTypes } from 'react';
import R from 'ramda';

/*** Third-Party Components ***/
import Input from 'react-toolbox/lib/input';
import DatePicker from 'react-toolbox/lib/date_picker';
import Icon from 'react-fa';
import Dropzone from 'react-dropzone';

import Button from '../linkButton/';
/*** styling ***/
import style from './style';

const InputForm = (props) => {
  const {
    fields: {
      name,
      created_date,
      directions,
      ingredients,
      img
    },
    handleSubmit,  // redux-form
    submitting,    // redux-form
    resetForm,     // redux-form
    onSubmit,      // add/edit Recipe Component
    submitText,    // add/edit Recipe Component
    error,         // String
    errors,        // Object with a name property
    submitFailed   // boolean
  } = props;

  const fileToUri = (tempPath, file) => {
    file.preventDefault();
    // spread files into an array
    // each time I try to console.log the file variable the target property is
    // null so I am not sure where it actually find the files lol
    const files = [ ...file.target.files ];
    const imgFile = files[0];
    const reader = new FileReader;
    const fileName = file.name;
    // when the reader has loaded then I will call the
    // redux form img.onChange function.
    // I had to remove the {...img} from this input, since
    // the onBlur function will change the imageURI back to
    // the actual File object.
    reader.onload = () => {
      img.onChange(reader.result);
    };
    reader.readAsDataURL(imgFile);
  };

  const date = typeof created_date.value == 'string' ? new Date(created_date.value) : created_date.value;

  return (
    <form
      role="form"
      encType="multipart/form-data"
      className={style.recipeForm}>

      <Input
        {...name}
        id="name"
        label="New Recipe Name"
        className={style.input}
        error={submitFailed && error == 'validation'? errors.name : null} />

      <div className={style.inputField}>
        <DatePicker
          label="Data Created"
          id="created_date"
          className={style.datePicker}
          value={date}
          onChange={(value) => {
            created_date.onChange(value);
          }}
             />
      </div>

        <Input
          id="img"
          type="file"
          value={null}
          className={style.input}
          onChange={fileToUri.bind(this)} />

{/*   <div className={style.inputField}>
        <Dropzone
          onDrop={ (filesToUpload, event) => {
            console.log(filesToUpload);
          }}>
          <div>Try dropping some files here, or click to select files to upload.</div>
        </Dropzone>
      </div>*/}

      <Input
        {...ingredients}
        id="ingredients"
        label="Ingredients"
        className={style.input}
        multiline={true}
        rows={2} />

      <Input
        {...directions}
        id="directions"
        label="Directions"
        className={style.input}
        multiline={true}
        rows={1} />

      <div className={style.buttonGroup}>
        <Button
          type="submit"
          onClick={handleSubmit(onSubmit)}
          label={submitText}
          icon={
              submitting ?
              <Icon spin name="cog" /> :
              <Icon name="paper-plane"/>
          }
          disabled={submitting} />
        <Button
          onClick={resetForm}
          label="Reset"
          icon={<Icon name="undo"/> }
          disabled={submitting} />
      </div>
    </form>
  );
};

export default InputForm;
