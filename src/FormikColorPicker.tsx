import { FieldProps } from 'formik'
import { ColorPicker, IColorPickerProps } from 'office-ui-fabric-react'
import * as React from 'react'
import { createFakeEvent, Omit } from './utils'

export function mapFieldToColorPicker<T = any>({
  form,
  field,
}: FieldProps<T>): Pick<IColorPickerProps, 'color' | 'onColorChanged'> {
  return {
    color: field.value,
    onColorChanged: color => {
      form.setFieldValue(field.name, color),
        field.onBlur(createFakeEvent(field))
    },
  }
}
export type FormikColorPickerProps<T = any> = Omit<
  IColorPickerProps,
  'color' | 'onColorChanged'
> &
  FieldProps<T>

export function FormikColorPicker<T = any>({
  field,
  form,
  ...props
}: FormikColorPickerProps<T>) {
  return (
    <ColorPicker
      {...props}
      {...mapFieldToColorPicker({
        field,
        form,
      })}
    />
  )
}
