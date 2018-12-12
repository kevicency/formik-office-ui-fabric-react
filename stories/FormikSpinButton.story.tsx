// tslint:disable:jsx-no-lambda

import { Field, FieldProps, Formik } from 'formik'
import * as React from 'react'
import { FormikSpinButton } from '../src/FormikSpinButton'
import { StoryForm } from './StoryForm'
import { handleSubmit } from './utils'

class Values {
  public rating: number = 3
  public length: string = '10 cm'
}

export const FormikSpinButtonStory = () => (
  <Formik initialValues={new Values()} onSubmit={handleSubmit}>
    <StoryForm title="Spin Button">
      <Field
        name="rating"
        label="SpinButton"
        min={0}
        max={5}
        component={FormikSpinButton}
      />
      <br />
      <Field
        name="length"
        render={(fieldProps: FieldProps<Values>) => (
          <FormikSpinButton
            {...fieldProps}
            onIncrement={value => `${+value.replace(/[\D\s]/g, '') + 1} cm`}
            onDecrement={value => `${+value.replace(/[\D\s]/g, '') - 1} cm`}
            onValidate={value => `${+value.replace(/[\D\s]/g, '')} cm`}
            label="SpinButton w/ custom format"
          />
        )}
      />
    </StoryForm>
  </Formik>
)
