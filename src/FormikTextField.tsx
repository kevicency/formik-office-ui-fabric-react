import { FieldProps, getIn } from 'formik'
import {
  ITextFieldProps,
  MaskedTextField,
  TextField,
} from 'office-ui-fabric-react'
import * as React from 'react'
import { Omit } from './utils'

export function mapFieldToTextField<T = any>({
  form,
  field,
}: FieldProps<T>): Pick<
  ITextFieldProps,
  'value' | 'name' | 'onChange' | 'onBlur' | 'errorMessage' | 'form'
> {
  const error = getIn(form.errors, field.name)
  const touched = getIn(form.touched, field.name)

  return {
    ...field,
    errorMessage: touched ? error : undefined,
  }
}

export function mapFieldToMaskedTextField<T = any>({
  form,
  field,
}: FieldProps<T>): Pick<
  ITextFieldProps,
  'value' | 'name' | 'onChange' | 'onBlur' | 'errorMessage' | 'form'
> {
  return {
    ...mapFieldToTextField({ form, field }),
    // ev hsa wrong balue for MaskedTextField
    onChange: (_, value) => form.setFieldValue(field.name, value),
  }
}

export type FormikTextFieldProps<T = any> = Omit<
  ITextFieldProps,
  'value' | 'name' | 'onChange' | 'onBlur' | 'form'
> &
  FieldProps<T>

export function FormikTextField<T = any>({
  field,
  form,
  ...props
}: FormikTextFieldProps<T>) {
  const { errorMessage, ...fieldProps } = mapFieldToTextField({ field, form })

  return (
    <TextField
      errorMessage={errorMessage} // allow for prop overwrite
      {...props}
      {...fieldProps}
    />
  )
}

export function FormikMaskedTextField<T = any>({
  field,
  form,
  ...props
}: FormikTextFieldProps<T>) {
  const { errorMessage, ...fieldProps } = mapFieldToMaskedTextField({
    field,
    form,
  })

  return (
    <MaskedTextField
      errorMessage={errorMessage} // allow for prop overwrite
      {...props}
      {...fieldProps}
    />
  )
}
