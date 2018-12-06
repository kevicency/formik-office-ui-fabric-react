// tslint:disable:jsx-no-lambda

import { Field, FieldProps, Formik } from 'formik'
import { IChoiceGroupOption } from 'office-ui-fabric-react'
import * as React from 'react'
import { FormikChoiceGroup } from '../src/FormikChoiceGroup'
import { StoryForm } from './StoryForm'
import { handleSubmit } from './utils'

class Values {
  public winner: string = ''
}

export const FormikChoiceGroupStory = () => (
  <Formik initialValues={new Values()} onSubmit={handleSubmit}>
    <StoryForm title="ChoiceGroup">
      <Field
        name="winner"
        render={(fieldProps: FieldProps<Values>) => (
          <FormikChoiceGroup
            label="Pick a winner"
            options={
              [
                { key: 'foo', text: 'Foo' },
                { key: 'bar', text: 'Bar' },
                { key: 'baz', text: 'Baz' },
                { key: 'qux', text: 'Qux' },
              ] as IChoiceGroupOption[]
            }
            {...fieldProps}
          />
        )}
      />
    </StoryForm>
  </Formik>
)
