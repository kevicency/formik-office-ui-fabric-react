import { FieldProps } from 'formik'
import { Checkbox, ICheckboxProps } from 'office-ui-fabric-react'
import * as React from 'react'
import { createFakeEvent, Omit } from './utils'

export function mapFieldToCheckbox<T = any>({
  form,
  field: { value, onChange, onBlur, ...field },
}: FieldProps<T>): Pick<ICheckboxProps, 'checked' | 'name' | 'onChange'> {
  return {
    ...field,
    onChange: (_, checked) => {
      form.setFieldValue(field.name, checked)
      onBlur(createFakeEvent(field))
    },
    checked: value,
  }
}

export type FormikCheckboxProps<T = any> = Omit<
  ICheckboxProps,
  'value' | 'checked' | 'name' | 'onChange' | 'onBlur' | 'form'
> &
  FieldProps<T>

export function FormikCheckbox<T = any>({
  field,
  form,
  ...props
}: FormikCheckboxProps<T>) {
  return <Checkbox {...props} {...mapFieldToCheckbox({ field, form })} />
}
