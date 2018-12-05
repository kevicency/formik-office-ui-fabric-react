// tslint:disable:jsx-no-lambda

import { Field, Formik } from 'formik'
import * as React from 'react'
import { FormikMaskedTextField, FormikTextField } from '../src/FormikTextField'
import { StoryForm } from './StoryForm'
import { handleSubmit } from './utils'

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/ // do not use in production

class Values {
  public email: string = ''
  public name: string = ''
  public phone: string = ''
}

const validate = (values: any): any => {
  const errors: any = {}

  if (!values.name) {
    errors.name = 'name is required'
  }

  if (!emailRegex.test(values.email)) {
    errors.email = 'not a valid email'
  }

  return errors
}

export const FormikTextFieldStory = () => (
  <Formik
    initialValues={new Values()}
    onSubmit={handleSubmit}
    validate={validate}>
    <StoryForm title="Text Field">
      <Field
        name="name"
        label="Name"
        required={true}
        component={FormikTextField}
      />
      <Field
        name="email"
        label="Email"
        type="email"
        component={FormikTextField}
      />
      <Field
        name="phone"
        label="Phone"
        mask="(999) 999 - 9999"
        component={FormikMaskedTextField}
      />
    </StoryForm>
  </Formik>
)
