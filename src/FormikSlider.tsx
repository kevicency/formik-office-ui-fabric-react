import { FieldProps } from 'formik'
import { ISliderProps, Slider } from 'office-ui-fabric-react'
import * as React from 'react'
import { createFakeEvent, Omit } from './utils'

export function mapFieldToSlider<T = any>({
  form,
  field,
}: FieldProps<T>): Pick<ISliderProps, 'value' | 'onChange' | 'onChanged'> {
  return {
    value: field.value,
    onChange: value => {
      form.setFieldValue(field.name, value)
    },
    onChanged: () => field.onBlur(createFakeEvent(field)),
  }
}

export type FormikSliderProps<T = any> = Omit<
  ISliderProps,
  'value' | 'onChange' | 'onChanged'
> &
  FieldProps<T>

export function FormikSlider<T = any>({
  field,
  form,
  ...props
}: FormikSliderProps<T>) {
  return <Slider {...props} {...mapFieldToSlider({ field, form })} />
}
