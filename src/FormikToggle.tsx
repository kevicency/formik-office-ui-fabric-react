import { FieldProps } from 'formik'
import { IToggleProps, Toggle } from 'office-ui-fabric-react'
import * as React from 'react'
import { createFakeEvent, Omit } from './utils'

export function mapFieldToToggle<T = any>({
  form,
  field: { value, onChange, onBlur, ...field },
}: FieldProps<T>): Pick<IToggleProps, 'checked' | 'onChange'> {
  return {
    ...field,
    onChange: (_, checked) => {
      form.setFieldValue(field.name, checked)
      onBlur(createFakeEvent(field))
    },
    checked: value,
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
