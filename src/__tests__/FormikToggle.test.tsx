import { Field, FieldProps, Form, Formik } from 'formik'
import { Toggle } from 'office-ui-fabric-react'
import * as React from 'react'
import renderer from 'react-test-renderer'
import { FormikToggle, mapFieldToToggle } from '../FormikToggle'
import { noop, serialize } from './utils'

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

test('<FormikToggle /> renders correctly as a field component', () => {
  const component = renderer.create(
    <Formik initialValues={{ isChecked: true }} onSubmit={noop}>
      <Form>
        <Field name="test" label="Toggle" component={FormikToggle} />
      </Form>
    </Formik>
  )

  expect(component.toJSON()).toMatchSnapshot()
})

test('<FormikToggle /> renders a Fabric <Toggle />', () => {
  const label = 'Date'
  const fieldProps = createFieldProps()

  const formikToggle = renderer.create(<FormikToggle {...fieldProps} />)
  const fabricToggle = renderer.create(
    <Toggle {...mapFieldToToggle(fieldProps)} label={label} />
  )
  expect(serialize(formikToggle)).toBe(serialize(fabricToggle))
})

test('mapFieldToToggle() maps FieldProps to IToggleProps', () => {
  const { field, form } = createFieldProps()
  const props = mapFieldToToggle({ form, field })

  expect(props.checked).toBe(field.value)

  props.onChange!(null as any, true)

  expect(form.setFieldValue).toHaveBeenCalledTimes(1)
  expect(form.setFieldValue).toHaveBeenCalledWith(field.name, true)

  // onChange also calls onBlur
  expect(field.onBlur).toHaveBeenCalled()
})
