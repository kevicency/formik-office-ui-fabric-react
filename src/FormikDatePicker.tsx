import { FieldProps } from 'formik'
import { DatePicker, IDatePickerProps } from 'office-ui-fabric-react'
import * as React from 'react'
import { Omit } from './utils'

export function mapFieldToDatePicker<T = any>({
  form,
  field,
}: FieldProps<T>): Pick<IDatePickerProps, 'value' | 'onSelectDate' | 'onBlur'> {
  return {
    value: field.value,
    onBlur: () => form.handleBlur(field.name),
    onSelectDate: date => form.setFieldValue(field.name, date),
  }
}
export type FormikDatePickerProps<T = any> = Omit<
  IDatePickerProps,
  'value' | 'onSelectDate' | 'onBlur'
> &
  FieldProps<T>

export function FormikDatePicker<T = any>({
  field,
  form,
  ...props
}: FormikDatePickerProps<T>) {
  return <DatePicker {...props} {...mapFieldToDatePicker({ field, form })} />
}
