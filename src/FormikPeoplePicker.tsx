import { FieldProps } from 'formik'
import {
  CompactPeoplePicker,
  IPeoplePickerProps,
  ListPeoplePicker,
  NormalPeoplePicker,
} from 'office-ui-fabric-react'
import * as React from 'react'
import { createFakeEvent, Omit } from './utils'

export function mapFieldToPeoplePicker<T = any>({
  form,
  field,
}: FieldProps<T>): Pick<
  IPeoplePickerProps,
  'selectedItems' | 'onChange' | 'onBlur'
> {
  return {
    selectedItems: field.value,
    onBlur: () => field.onBlur(createFakeEvent(field)),
    onChange: items => form.setFieldValue(field.name, items),
  }
}
export type FormikPeoplePickerProps<T = any> = Omit<
  IPeoplePickerProps,
  'selectedItems' | 'onBlur' | 'onChange'
> &
  FieldProps<T>

export function FormikNormalPeoplePicker<T = any>({
  field,
  form,
  ...props
}: FormikPeoplePickerProps<T>) {
  return (
    <NormalPeoplePicker
      {...props}
      {...mapFieldToPeoplePicker({
        field,
        form,
      })}
    />
  )
}

export function FormikCompactPeoplePicker<T = any>({
  field,
  form,
  ...props
}: FormikPeoplePickerProps<T>) {
  return (
    <CompactPeoplePicker
      {...props}
      {...mapFieldToPeoplePicker({
        field,
        form,
      })}
    />
  )
}

export function FormikListPeoplePicker<T = any>({
  field,
  form,
  ...props
}: FormikPeoplePickerProps<T>) {
  return (
    <ListPeoplePicker
      {...props}
      {...mapFieldToPeoplePicker({
        field,
        form,
      })}
    />
  )
}
