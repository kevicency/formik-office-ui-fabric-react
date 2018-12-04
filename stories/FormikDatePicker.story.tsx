// tslint:disable:jsx-no-lambda

import { Field, Formik } from 'formik'
import * as React from 'react'
import { FormikDatePicker } from '../src/FormikDatePicker'
import { StoryForm } from './StoryForm'
import { handleSubmit } from './utils'

interface Values {
  date: Date
}

const values: Values = {
  date: new Date(),
}

export const FormikDatePickerStory = () => (
  <Formik initialValues={values} onSubmit={handleSubmit}>
    <StoryForm title="Date Picker">
      <Field name="date" label="Date" component={FormikDatePicker} />
    </StoryForm>
  </Formik>
)
