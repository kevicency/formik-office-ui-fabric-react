import { FieldProps } from 'formik'
import { DatePicker, IDatePickerProps } from 'office-ui-fabric-react'
import * as React from 'react'
import { Omit } from './utils'

export function mapFieldToDatePicker<T = any>({
  form,
  field,
}: FieldProps<T>): Pick<
  IDatePickerProps,
  'value' | 'onSelectDate' | 'onAfterMenuDismiss'
> {
  const onBlur = form.handleBlur<string>(field.name)

  return {
    value: field.value,
    onAfterMenuDismiss: () => onBlur({ target: { name: field.name } }),
    onSelectDate: date => form.setFieldValue(field.name, date),
  }
}
export type FormikDatePickerProps<T = any> = Omit<
  IDatePickerProps,
  'value' | 'onSelectDate' | 'onBlur' | 'onChange'
> &
  FieldProps<T>

export function FormikDatePicker<T = any>({
  field,
  form,
  ...props
}: FormikDatePickerProps<T>) {
  const { onAfterMenuDismiss, ...fieldProps } = mapFieldToDatePicker({
    field,
    form,
  })

  const blurOnAfterMenuDismiss = props.onAfterMenuDismiss
    ? () => {
        props.onAfterMenuDismiss!()
        onAfterMenuDismiss!()
      }
    : onAfterMenuDismiss

  return (
    <DatePicker
      {...props}
      onAfterMenuDismiss={blurOnAfterMenuDismiss}
      {...fieldProps}
    />
  )
}
