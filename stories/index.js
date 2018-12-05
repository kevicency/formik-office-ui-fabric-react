import React from 'react'
import { initializeIcons } from 'office-ui-fabric-react/lib/Icons'
import { storiesOf } from '@storybook/react'
import { FormikDatePickerStory } from './FormikDatePicker.story'
import { FormikTextFieldStory } from './FormikTextField.story'

initializeIcons()

storiesOf('formik-office-ui-fabric-react', module)
  .add('FormikDatePicker', FormikDatePickerStory)
  .add('FormikiTextField', FormikTextFieldStory)
