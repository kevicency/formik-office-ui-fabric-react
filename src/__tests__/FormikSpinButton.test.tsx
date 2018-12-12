import { Field, FieldProps, Form, Formik } from 'formik'
import { setIconOptions, SpinButton } from 'office-ui-fabric-react'
import * as React from 'react'
import renderer from 'react-test-renderer'
import { FormikSpinButton, mapFieldToSpinButton } from '../FormikSpinButton'
import { noop, serialize } from './utils'

// Suppress icon warnings.
setIconOptions({
  disableWarnings: true,
})

class Values {
  public rating: number | string = 3
}

function createFieldProps(value: number | string = 3): FieldProps<Values> {
  return {
    field: {
      value,
      onChange: jest.fn(),
      onBlur: jest.fn(),
      name: 'rating',
    },
    form: { setFieldValue: jest.fn(), handleBlur: jest.fn(() => jest.fn()) },
  } as any
}

test('<FormikSpinButton /> renders correctly as a field component', () => {
  const component = renderer.create(
    <Formik initialValues={new Values()} onSubmit={noop}>
      <Form>
        <Field name="rating" label="Rating" component={FormikSpinButton} />
      </Form>
    </Formik>
  )

  expect(component.toJSON()).toMatchSnapshot()
})

test('<FormikSpinButton /> renders a Fabric <SpinButton />', () => {
  const label = 'Test'
  const fieldProps = createFieldProps()

  const formikSpinButton = renderer.create(
    <FormikSpinButton {...fieldProps} label={label} />
  )
  const fabricSpinButton = renderer.create(
    <SpinButton {...mapFieldToSpinButton(fieldProps, {})} label={label} />
  )
  expect(serialize(formikSpinButton)).toBe(serialize(fabricSpinButton))
})

test('mapFieldToSpinButton() maps FieldProps to ISpinButtonProps', () => {
  const { field, form } = createFieldProps()
  const props = mapFieldToSpinButton({ form, field }, { min: 0, max: 10 })

  expect(props.value).toBe(field.value)

  props.onIncrement!('9')

  expect(form.setFieldValue).toHaveBeenCalledTimes(1)
  expect(form.setFieldValue).toHaveBeenCalledWith(field.name, 10)
  expect(field.onBlur).toHaveBeenCalledTimes(1)

  props.onIncrement!('10')

  expect(form.setFieldValue).toHaveBeenCalledTimes(2)
  expect(form.setFieldValue).toHaveBeenCalledWith(field.name, 10)
  expect(field.onBlur).toHaveBeenCalledTimes(2)

  props.onDecrement!('1')

  expect(form.setFieldValue).toHaveBeenCalledTimes(3)
  expect(form.setFieldValue).toHaveBeenCalledWith(field.name, 0)
  expect(field.onBlur).toHaveBeenCalledTimes(3)

  props.onDecrement!('0')

  expect(form.setFieldValue).toHaveBeenCalledTimes(4)
  expect(form.setFieldValue).toHaveBeenCalledWith(field.name, 0)
  expect(field.onBlur).toHaveBeenCalledTimes(4)

  props.onValidate!('5')

  expect(form.setFieldValue).toHaveBeenCalledTimes(5)
  expect(form.setFieldValue).toHaveBeenCalledWith(field.name, 5)
  expect(field.onBlur).toHaveBeenCalledTimes(4)
})

test('mapFieldToSpinButton() with custom change handlers', () => {
  const { field, form } = createFieldProps()
  const props = mapFieldToSpinButton(
    { form, field },
    {
      onIncrement: value => `${+value.replace(/[\D\s]/g, '') + 1} cm`,
      onDecrement: value => `${+value.replace(/[\D\s]/g, '') - 1} cm`,
      onValidate: value => `${+value.replace(/[\D\s]/g, '')} cm`,
    }
  )

  expect(props.value).toBe(field.value)

  props.onIncrement!('9 cm')

  expect(form.setFieldValue).toHaveBeenCalledTimes(1)
  expect(form.setFieldValue).toHaveBeenCalledWith(field.name, '10 cm')
  expect(field.onBlur).toHaveBeenCalledTimes(1)

  props.onDecrement!('1 cm')

  expect(form.setFieldValue).toHaveBeenCalledTimes(2)
  expect(form.setFieldValue).toHaveBeenCalledWith(field.name, '0 cm')
  expect(field.onBlur).toHaveBeenCalledTimes(2)

  props.onValidate!('5 cm')

  expect(form.setFieldValue).toHaveBeenCalledTimes(3)
  expect(form.setFieldValue).toHaveBeenCalledWith(field.name, '5 cm')
  expect(field.onBlur).toHaveBeenCalledTimes(2)
})
