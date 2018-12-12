import { FieldProps } from 'formik'
import { Dropdown, IDropdownProps } from 'office-ui-fabric-react'
import * as React from 'react'
import { createFakeEvent, getErrorMessage, invokeAll, Omit } from './utils'

export function mapFieldToDropdown<T = any>({
  form,
  field,
}: FieldProps<T>): Pick<
  IDropdownProps,
  'selectedKey' | 'selectedKeys' | 'onDismiss' | 'onChange' | 'errorMessage'
> {
  const multiSelect = Array.isArray(field.value)
  const shared = {
    errorMessage: getErrorMessage({ field, form }),
    onDismiss: () => field.onBlur(createFakeEvent(field)),
  }

  return multiSelect
    ? {
        ...shared,
        selectedKeys: field.value,
        onChange: (_, option) => {
          const value = field.value as any[]

          if (option!.selected) {
            form.setFieldValue(field.name, [...value, option!.key])
          } else {
            const idx = field.value.indexOf(option!.key)

            if (idx !== -1) {
              form.setFieldValue(field.name, [
                ...value.slice(0, idx),
                ...value.slice(idx + 1),
              ])
            }
          }
        },
      }
    : {
        ...shared,
        selectedKey: field.value,
        onChange: (_, option) => {
          form.setFieldValue(field.name, option!.key)
        },
      }
}

export type FormikDropdownProps<T> = Omit<IDropdownProps, 'selectedKey'> &
  FieldProps<T>
export function FormikDropdown<T = any>({
  field,
  form,
  ...props
}: FormikDropdownProps<T>) {
  const { errorMessage, onDismiss, ...fieldProps } = mapFieldToDropdown({
    field,
    form,
  })

  return (
    <Dropdown
      errorMessage={errorMessage}
      {...props}
      onDismiss={invokeAll(onDismiss, props.onDismiss)}
      {...fieldProps}
    />
  )
}
