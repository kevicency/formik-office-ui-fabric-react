import { FieldProps } from 'formik'
import { ISpinButtonProps, SpinButton } from 'office-ui-fabric-react'
import * as React from 'react'
import { createFakeEvent, Omit } from './utils'

export function mapFieldToSpinButton<T = any>(
  { form, field }: FieldProps<T>,
  {
    min,
    max,
    onIncrement,
    onDecrement,
    onValidate,
  }: Pick<
    ISpinButtonProps,
    'min' | 'max' | 'onIncrement' | 'onDecrement' | 'onValidate'
  > = {}
): Pick<
  ISpinButtonProps,
  'value' | 'onIncrement' | 'onDecrement' | 'onValidate' | 'onBlur'
> {
  const handleIncrement = (value: string) => {
    const newValue = onIncrement
      ? onIncrement(value)
      : Math.min(typeof max === 'number' ? max : -Infinity, +value + 1)

    form.setFieldValue(field.name, newValue)
    field.onBlur(createFakeEvent(field))

    return `${newValue}`
  }
  const handleDecrement = (value: string) => {
    const newValue = onDecrement
      ? onDecrement(value)
      : Math.max(typeof min === 'number' ? min : Infinity, +value - 1)

    form.setFieldValue(field.name, newValue)
    field.onBlur(createFakeEvent(field))

    return `${newValue}`
  }
  const handleValidate = (value: string) => {
    const newValue = onValidate ? onValidate(value) : +value

    form.setFieldValue(field.name, newValue)

    return `${newValue}`
  }

  return {
    value: field.value,
    onIncrement: handleIncrement,
    onDecrement: handleDecrement,
    onValidate: handleValidate,
    onBlur: () => field.onBlur(createFakeEvent(field)),
  }
}

export type FormikSpinButtonProps<T = any> = Omit<ISpinButtonProps, 'value'> &
  FieldProps<T>

export function FormikSpinButton<T = any>({
  field,
  form,
  ...props
}: FormikSpinButtonProps<T>) {
  return (
    <SpinButton {...props} {...mapFieldToSpinButton({ field, form }, props)} />
  )
}
