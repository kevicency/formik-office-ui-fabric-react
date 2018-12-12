// tslint:disable:jsx-no-lambda

import { Field, FieldProps, Formik } from 'formik'
import { Label } from 'office-ui-fabric-react'
import * as React from 'react'
import { FormikSwatchColorPicker } from '../src/FormikSwatchColorPicker'
import { StoryForm } from './StoryForm'
import { handleSubmit } from './utils'

class Values {
  public strColor: null | string = '' // initial value must be a string
  public objColor: any = null
}

export const FormikSwatchColorPickerStory = () => (
  <Formik initialValues={new Values()} onSubmit={handleSubmit}>
    <StoryForm title="SwatchColorPicker">
      <Label>SwatchColorPicker w/ string value</Label>
      <Field
        name="strColor"
        render={(fieldProps: FieldProps<Values>) => (
          <FormikSwatchColorPicker
            {...fieldProps}
            columnCount={3}
            colorCells={[
              { id: '#ff0000', label: 'red', color: '#ff0000' },
              { id: '#00ff00', label: 'green', color: '#00ff00' },
              { id: '#0000ff', label: 'blue', color: '#0000ff' },
            ]}
          />
        )}
      />
      <Label>SwatchColorPicker w/ object value</Label>
      <Field
        name="objColor"
        render={(fieldProps: FieldProps<Values>) => (
          <FormikSwatchColorPicker
            {...fieldProps}
            columnCount={3}
            colorCells={[
              { id: 'red', label: 'red', color: '#ff0000' },
              { id: 'green', label: 'green', color: '#00ff00' },
              { id: 'blue', label: 'blue', color: '#0000ff' },
            ]}
          />
        )}
      />
    </StoryForm>
  </Formik>
)
