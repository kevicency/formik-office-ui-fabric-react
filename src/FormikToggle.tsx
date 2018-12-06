import { FieldProps } from 'formik'
import { IToggleProps, Toggle } from 'office-ui-fabric-react'
import * as React from 'react'
import { createFakeEvent, Omit } from './utils'

export function mapFieldToToggle<T = any>({
  form,
  field,
}: FieldProps<T>): Pick<IToggleProps, 'checked' | 'onChange'> {
  return {
    onChange: (_, checked) => {
      form.setFieldValue(field.name, checked)
      field.onBlur(createFakeEvent(field))
    },
    checked: field.value,
  }
}

export type FormikToggleProps<T = any> = Omit<
  IToggleProps,
  'checked' | 'onChange' | 'onBlur'
> &
  FieldProps<T>

export function FormikToggle<T = any>({
  field,
  form,
  ...props
}: FormikToggleProps<T>) {
  return <Toggle {...props} {...mapFieldToToggle({ field, form })} />
}
