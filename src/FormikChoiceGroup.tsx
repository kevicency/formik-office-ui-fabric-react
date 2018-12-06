import { FieldProps } from 'formik'
import { ChoiceGroup, IChoiceGroupProps } from 'office-ui-fabric-react'
import * as React from 'react'
import { createFakeEvent, Omit } from './utils'

export function mapFieldToChoiceGroup<T = any>({
  form,
  field,
}: FieldProps<T>): Pick<
  IChoiceGroupProps,
  'selectedKey' | 'onChange' | 'name'
> {
  return {
    name: field.name,
    selectedKey: field.value,
    onChange: (_, option) => {
      form.setFieldValue(field.name, option ? option!.key : null)
      field.onBlur(createFakeEvent(field))
    },
  }
}

export type FormikChoiceGroupProps<T = any> = Omit<
  IChoiceGroupProps,
  'selectedKey' | 'name' | 'onChange' | 'onBlur' | 'form'
> &
  FieldProps<T>

export function FormikChoiceGroup<T = any>({
  field,
  form,
  ...props
}: FormikChoiceGroupProps<T>) {
  return <ChoiceGroup {...props} {...mapFieldToChoiceGroup({ field, form })} />
}
