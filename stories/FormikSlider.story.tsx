// tslint:disable:jsx-no-lambda

import { Field, Formik } from 'formik'
import * as React from 'react'
import { FormikSlider } from '../src/FormikSlider'
import { StoryForm } from './StoryForm'
import { handleSubmit } from './utils'

class Values {
  public count: number = 5
}

export const FormikSliderStory = () => (
  <Formik initialValues={new Values()} onSubmit={handleSubmit}>
    <StoryForm title="Count">
      <Field name="count" label="Slider" component={FormikSlider} />
    </StoryForm>
  </Formik>
)
