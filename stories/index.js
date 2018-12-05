import React from 'react'
import { initializeIcons } from 'office-ui-fabric-react/lib/Icons'
import { storiesOf } from '@storybook/react'
import { FormikCheckboxStory } from './FormikCheckbox.story'
import { FormikDatePickerStory } from './FormikDatePicker.story'
import { FormikTextFieldStory } from './FormikTextField.story'
import { FormikDropdownStory } from './FormikDropdown.story'
import { FormikToggleStory } from './FormikToggle.story'

initializeIcons()

storiesOf('formik-office-ui-fabric-react', module)
  .add('FormikCheckbox', FormikCheckboxStory)
  .add('FormikDatePicker', FormikDatePickerStory)
  .add('FormikDropdown', FormikDropdownStory)
  .add('FormikTextField', FormikTextFieldStory)
  .add('FormikToggle', FormikToggleStory)
