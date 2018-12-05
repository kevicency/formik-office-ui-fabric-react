// tslint:disable:jsx-no-lambda

import { Field, FieldProps, Formik } from 'formik'
import { IDropdownOption } from 'office-ui-fabric-react'
import * as React from 'react'
import { FormikDropdown } from '../src/FormikDropdown'
import { StoryForm } from './StoryForm'
import { handleSubmit } from './utils'

class Values {
  public single: string = ''
  public multi: string[] = ['bar']
}

const options: IDropdownOption[] = [
  { key: '', text: '' },
  { key: 'foo', text: 'Foo' },
  { key: 'bar', text: 'Bar' },
  { key: 'qux', text: 'Qux' },
  { key: 'gorge', text: 'Gorge' },
]

const validate = (values: any) => {
  const errors: any = {}

  if (!values.single) {
    errors.single = 'required'
  }

  if (!values.multi || values.multi.length < 2) {
    errors.multi = 'pick at least 2'
  }
}

export const FormikDropdownStory = () => (
  <Formik
    initialValues={new Values()}
    onSubmit={handleSubmit}
    validate={validate}>
    <StoryForm title="Dropdown">
      <Field
        name="single"
        render={(fieldProps: FieldProps<Values>) => (
          <FormikDropdown
            label="Single"
            required={true}
            {...fieldProps}
            options={options}
          />
        )}
      />
      <Field
        name="multi"
        render={(fieldProps: FieldProps<Values>) => (
          <FormikDropdown
            label="Multi"
            multiSelect={true}
            {...fieldProps}
            options={options.slice(1)}
          />
        )}
      />
    </StoryForm>
  </Formik>
)
