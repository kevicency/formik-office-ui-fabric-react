// tslint:disable:jsx-no-lambda

import { Field, Formik } from 'formik'
import * as React from 'react'
import { FormikDatePicker } from '../src/FormikDatePicker'
import { StoryForm } from './StoryForm'
import { handleSubmit } from './utils'

class Values {
  public date: Date = new Date()
}

export const FormikDatePickerStory = () => (
  <Formik initialValues={new Values()} onSubmit={handleSubmit}>
    <StoryForm title="Date Picker">
      <Field name="date" label="Date" component={FormikDatePicker} />
    </StoryForm>
  </Formik>
)
