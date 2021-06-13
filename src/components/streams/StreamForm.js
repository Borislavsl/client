import React from 'react';
import { Field, reduxForm } from 'redux-form';

const StreamForm = (props) => {

    const renderError = ({ error, touched }) => {
        if (touched && error) {
          return (
            <div className="ui error message">
              <div className="header">{error}</div>
            </div>
          );
        }
      }

    const renderInput  = ({ input, label, meta }) => {
        const className = `field ${meta.error && meta.touched ? 'error' : ''}`;
        return (
            <div className={className}>
                <label>{label}</label>
                <input {...input} />
                {renderError(meta)}
            </div>
        );
    }

    const onSubmit = (formValues) => {
        props.onSubmit(formValues);
    }

    return (
        <form onSubmit={props.handleSubmit(onSubmit)} className="ui form error">
            <Field name = "title" component = {renderInput} label="Enter a Title">
            </Field>

            <Field name = "description"  component = {renderInput} label="Enter a Description">
            </Field>
            <button className="ui button primary">Submit</button>
        </form>
    );
};

const validate = (formValues) => {
    const errors = {};
    if (!formValues.title) {
        errors.title = 'You must enter a title';
    }
    if (!formValues.description) {
        errors.description = 'You must enter a description';
    }
    
    return errors;
}

export default reduxForm({
    form: 'streamForm',
    validate
})(StreamForm);
