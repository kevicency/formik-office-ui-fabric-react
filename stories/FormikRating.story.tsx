// tslint:disable:jsx-no-lambda

import { Field, Formik } from 'formik'
import * as React from 'react'
import { FormikRating } from '../src/FormikRating'
import { StoryForm } from './StoryForm'
import { handleSubmit } from './utils'

class Values {
  public rating: number = 5
}

export const FormikRatingStory = () => (
  <Formik initialValues={new Values()} onSubmit={handleSubmit}>
    <StoryForm title="Rating">
      <Field name="rating" label="Rating" component={FormikRating} />
    </StoryForm>
  </Formik>
)
