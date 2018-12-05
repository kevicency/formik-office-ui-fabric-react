// tslint:disable:jsx-no-lambda

import { Field, Formik } from 'formik'
import * as React from 'react'
import { FormikCheckbox } from '../src/FormikCheckbox'
import { StoryForm } from './StoryForm'
import { handleSubmit } from './utils'

class Values {
  public isChecked: boolean = false
}

export const FormikCheckboxStory = () => (
  <Formik initialValues={new Values()} onSubmit={handleSubmit}>
    <StoryForm title="Checkbox">
      <Field name="isChecked" label="Checkbox" component={FormikCheckbox} />
    </StoryForm>
  </Formik>
)
