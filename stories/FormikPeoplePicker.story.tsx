// tslint:disable:jsx-no-lambda

import { Field, FieldProps, Formik } from 'formik'
import { IPersonaProps, Label } from 'office-ui-fabric-react'
import * as React from 'react'
import {
  FormikCompactPeoplePicker,
  FormikListPeoplePicker,
  FormikNormalPeoplePicker,
} from '../src/FormikPeoplePicker'
import { StoryForm } from './StoryForm'
import { handleSubmit } from './utils'

class Values {
  public normal: IPersonaProps[] = []
  public compact: IPersonaProps[] = []
  public list: IPersonaProps[] = []
}

const handleResolveSuggestions = (filter: string): IPersonaProps[] =>
  [
    { text: 'Foo Bar', secondaryText: 'foo@bar.com' },
    { text: 'Jane Doe', secondaryText: 'jane@doe.com' },
    { text: 'John Doe', secondaryText: 'john@doe.com' },
    { text: 'Kevin Mees', secondaryText: 'kev.mees@gmail.com' },
  ].filter(x => x.text !== filter && x.secondaryText !== filter)

export const FormikPeoplePickerStory = () => (
  <Formik initialValues={new Values()} onSubmit={handleSubmit}>
    <StoryForm title="People Pickers">
      <Label>NormalPeoplePicker</Label>
      <Field
        name="normal"
        render={(fieldProps: FieldProps<Values>) => (
          <FormikNormalPeoplePicker
            {...fieldProps}
            onResolveSuggestions={handleResolveSuggestions}
          />
        )}
      />
      <Label>CompactPeoplePicker</Label>
      <Field
        name="compact"
        render={(fieldProps: FieldProps<Values>) => (
          <FormikCompactPeoplePicker
            {...fieldProps}
            onResolveSuggestions={handleResolveSuggestions}
          />
        )}
      />
      <Label>ListPeoplePicker</Label>
      <Field
        name="list"
        render={(fieldProps: FieldProps<Values>) => (
          <FormikListPeoplePicker
            {...fieldProps}
            onResolveSuggestions={handleResolveSuggestions}
          />
        )}
      />
    </StoryForm>
  </Formik>
)
