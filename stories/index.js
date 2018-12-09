import React from 'react'
import { initializeIcons } from 'office-ui-fabric-react/lib/Icons'
import { storiesOf } from '@storybook/react'
import { FormikCheckboxStory } from './FormikCheckbox.story'
import { FormikChoiceGroupStory } from './FormikChoiceGroup.story'
import { FormikDatePickerStory } from './FormikDatePicker.story'
import { FormikDropdownStory } from './FormikDropdown.story'
import { FormikPeoplePickerStory } from './FormikPeoplePicker.story'
import { FormikRatingStory } from './FormikRating.story'
import { FormikSliderStory } from './FormikSlider.story'
import { FormikTextFieldStory } from './FormikTextField.story'
import { FormikToggleStory } from './FormikToggle.story'

initializeIcons()

storiesOf('formik-office-ui-fabric-react', module)
  .add('FormikCheckbox', FormikCheckboxStory)
  .add('FormikChoiceGroup', FormikChoiceGroupStory)
  .add('FormikDatePicker', FormikDatePickerStory)
  .add('FormikDropdown', FormikDropdownStory)
  .add('FormikPeoplePicker', FormikPeoplePickerStory)
  .add('FormikRating', FormikRatingStory)
  .add('FormikSlider', FormikSliderStory)
  .add('FormikTextField', FormikTextFieldStory)
  .add('FormikToggle', FormikToggleStory)
