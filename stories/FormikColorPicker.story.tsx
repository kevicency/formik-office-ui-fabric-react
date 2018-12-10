// tslint:disable:jsx-no-lambda

import { Field, Formik } from 'formik'
import { Label } from 'office-ui-fabric-react'
import * as React from 'react'
import { FormikColorPicker } from '../src/FormikColorPicker'
import { StoryForm } from './StoryForm'
import { handleSubmit } from './utils'

class Values {
  public color: string = '#000000'
}

export const FormikColorPickerStory = () => (
  <Formik initialValues={new Values()} onSubmit={handleSubmit}>
    <StoryForm title="ColorPicker">
      <Label>ColorPicker</Label>
      <Field name="color" component={FormikColorPicker} />
    </StoryForm>
  </Formik>
)
