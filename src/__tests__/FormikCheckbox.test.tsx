import { Field, FieldProps, Form, Formik } from 'formik'
import { Checkbox, setIconOptions } from 'office-ui-fabric-react'
import * as React from 'react'
import renderer from 'react-test-renderer'
import { FormikCheckbox, mapFieldToCheckbox } from '../FormikCheckbox'
import { noop, serialize } from './utils'

// Suppress icon warnings.
setIconOptions({
  disableWarnings: true,
})

function createFieldProps(): FieldProps<{ test: Date }> {
  return {
    field: {
      value: false,
      onChange: jest.fn(),
      onBlur: jest.fn(),
      name: 'isChecked',
    },
    form: { setFieldValue: jest.fn(), handleBlur: jest.fn(() => jest.fn()) },
  } as any
}

test('<FormikCheckbox /> renders correctly as a field component', () => {
  const component = renderer.create(
    <Formik initialValues={{ isChecked: true }} onSubmit={noop}>
      <Form>
        <Field name="test" label="Checkbox" component={FormikCheckbox} />
      </Form>
    </Formik>
  )

  expect(component.toJSON()).toMatchSnapshot()
})

test('<FormikCheckbox /> renders a Fabric <Checkbox />', () => {
  const label = 'Date'
  const fieldProps = createFieldProps()

  const formikCheckbox = renderer.create(<FormikCheckbox {...fieldProps} />)
  const fabricCheckbox = renderer.create(
    <Checkbox {...mapFieldToCheckbox(fieldProps)} label={label} />
  )
  expect(serialize(formikCheckbox)).toBe(serialize(fabricCheckbox))
})

test('mapFieldToCheckbox() maps FieldProps to ICheckboxProps', () => {
  const { field, form } = createFieldProps()
  const props = mapFieldToCheckbox({ form, field })

  expect(props.checked).toBe(field.value)

  props.onChange!(null as any, true)

  expect(form.setFieldValue).toHaveBeenCalledTimes(1)
  expect(form.setFieldValue).toHaveBeenCalledWith(field.name, true)

  // onChange also calls onBlur
  expect(field.onBlur).toHaveBeenCalled()
})
