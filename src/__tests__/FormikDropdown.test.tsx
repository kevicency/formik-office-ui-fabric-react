// tslint:disable:jsx-no-lambda

import { Field, FieldProps, Form, Formik } from 'formik'
import { Dropdown, setIconOptions } from 'office-ui-fabric-react'
import * as React from 'react'
import renderer from 'react-test-renderer'
import { FormikDropdown, mapFieldToDropdown } from '../FormikDropdown'
import { noop, serialize } from './utils'

// Suppress icon warnings.
setIconOptions({
  disableWarnings: true,
})

function createFieldProps(
  value: string | string[]
): FieldProps<{ test: Date }> {
  return {
    field: {
      value,
      onChange: jest.fn(),
      onBlur: jest.fn(),
      name: Array.isArray(value) ? 'multi' : 'single',
    },
    form: { setFieldValue: jest.fn(), handleBlur: jest.fn(() => jest.fn()) },
  } as any
}

const options = ['foo', 'bar', 'baz'].map(x => ({ key: x, text: x }))

test('<FormikDropdown /> renders correctly as a field component', () => {
  const component = renderer.create(
    <Formik
      initialValues={{ single: 'foo', multi: ['bar', 'baz'] }}
      onSubmit={noop}>
      <Form>
        <Field
          name="single"
          render={(fieldProps: FieldProps<any>) => (
            <FormikDropdown {...fieldProps} options={options} />
          )}
        />
        <Field
          name="multi"
          render={(fieldProps: FieldProps<any>) => (
            <FormikDropdown {...fieldProps} options={options} />
          )}
        />
      </Form>
    </Formik>
  )

  expect(component.toJSON()).toMatchSnapshot()
})

test('<FormikDropdown /> renders a Fabric <Dropdown />', () => {
  const fieldProps = createFieldProps('foo')

  const formikDropdown = renderer.create(
    <FormikDropdown {...fieldProps} options={options} />
  )
  const fabricDropdown = renderer.create(
    <Dropdown {...mapFieldToDropdown(fieldProps)} options={options} />
  )
  expect(serialize(formikDropdown)).toBe(serialize(fabricDropdown))
})

test('mapFieldToDropdown() maps FieldProps to IDropdownProps for single select', () => {
  const { field, form } = createFieldProps('foo')

  const props = mapFieldToDropdown({ form, field })

  expect(props.selectedKey).toBe(field.value)

  props.onChange!(null as any, options[1])

  expect(form.setFieldValue).toHaveBeenCalledTimes(1)
  expect(form.setFieldValue).toHaveBeenCalledWith(field.name, options[1].key)
})

test('mapFieldToDropdown() maps FieldProps to IDropdownProps for multi select', () => {
  const { field, form } = createFieldProps(['bar', 'baz'])

  const props = mapFieldToDropdown({ form, field })

  expect(props.selectedKeys).toBe(field.value)

  // remove 'bar'
  props.onChange!(null as any, { ...options[1], selected: false })

  expect(form.setFieldValue).toHaveBeenCalledTimes(1)
  expect(form.setFieldValue).toHaveBeenCalledWith(field.name, ['baz'])

  // add 'foo
  props.onChange!(null as any, { ...options[0], selected: true })

  expect(form.setFieldValue).toHaveBeenCalledTimes(2)
  expect(form.setFieldValue).toHaveBeenCalledWith(field.name, [
    'bar',
    'baz',
    'foo',
  ])
})
