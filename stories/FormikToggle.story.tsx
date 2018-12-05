// tslint:disable:jsx-no-lambda

import { Field, Formik } from 'formik'
import * as React from 'react'
import { FormikToggle } from '../src/FormikToggle'
import { StoryForm } from './StoryForm'
import { handleSubmit } from './utils'

class Values {
  public isToggled: boolean = false
}

export const FormikToggleStory = () => (
  <Formik initialValues={new Values()} onSubmit={handleSubmit}>
    <StoryForm title="Toggle">
      <Field
        name="isToggled"
        label="Toggle"
        onText="yay"
        offText="nay"
        component={FormikToggle}
      />
    </StoryForm>
  </Formik>
)
