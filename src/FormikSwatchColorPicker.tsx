import { FieldProps } from 'formik'
import {
  ISwatchColorPickerProps,
  SwatchColorPicker,
} from 'office-ui-fabric-react'
import * as React from 'react'
import { createFakeEvent, Omit } from './utils'

export function mapFieldToSwatchColorPicker<T = any>({
  form,
  field,
}: FieldProps<T>): Pick<
  ISwatchColorPickerProps,
  'selectedId' | 'onColorChanged'
> {
  const valueType = typeof field.value

  return {
    selectedId:
      valueType === 'string'
        ? field.value
        : field.value
        ? field.value.id
        : null,
    onColorChanged: (id, color) => {
      form.setFieldValue(
        field.name,
        valueType === 'string' ? color : { id, color }
      )
      field.onBlur(createFakeEvent(field))
    },
  }
}
export type FormikSwatchColorPickerProps<T = any> = Omit<
  ISwatchColorPickerProps,
  'selectedId' | 'onColorChanged'
> &
  FieldProps<T>

export function FormikSwatchColorPicker<T = any>({
  field,
  form,
  ...props
}: FormikSwatchColorPickerProps<T>) {
  return (
    <SwatchColorPicker
      {...props}
      {...mapFieldToSwatchColorPicker({
        field,
        form,
      })}
    />
  )
}
