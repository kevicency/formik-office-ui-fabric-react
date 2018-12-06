import { FieldProps } from 'formik'
import { IRatingProps, Rating } from 'office-ui-fabric-react'
import * as React from 'react'
import { createFakeEvent, Omit } from './utils'

export function mapFieldToRating<T = any>({
  form,
  field,
}: FieldProps<T>): Pick<IRatingProps, 'value' | 'onChange'> {
  return {
    value: field.value,
    onChange: (_, value) => {
      form.setFieldValue(field.name, value)
      field.onBlur(createFakeEvent(field))
    },
  }
}

export type FormikRatingProps<T = any> = Omit<
  IRatingProps,
  'value' | 'onChange' | 'onBlur' | 'form'
> &
  FieldProps<T>

export function FormikRating<T = any>({
  field,
  form,
  ...props
}: FormikRatingProps<T>) {
  return <Rating {...props} {...mapFieldToRating({ field, form })} />
}
