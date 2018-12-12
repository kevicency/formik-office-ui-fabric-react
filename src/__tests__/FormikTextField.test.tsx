import { Field, FieldProps, Form, Formik } from 'formik'
import { TextField } from 'office-ui-fabric-react'
import * as React from 'react'
import renderer from 'react-test-renderer'
import {
  FormikMaskedTextField,
  FormikTextField,
  mapFieldToTextField,
} from '../FormikTextField'
import { noop, serialize } from './utils'

class Values {
  public email: string = 'foo@bar.com'
}

function createFieldProps(
  value: string = 'foo@bar.com',
  errorMessage?: string | undefined
): FieldProps<Values> {
  return {
    field: {
      value,
      onChange: jest.fn(),
      onBlur: jest.fn(),
      name: 'email',
    },
    form: {
      setFieldValue: jest.fn(),
      handleBlur: jest.fn(),
      errors: {
        email: errorMessage,
      },
      touched: {
        email: !!errorMessage,
      },
    },
  } as any
}

test('<FormikTextField /> renders correctly as a field component', () => {
  const component = renderer.create(
    <Formik initialValues={new Values()} onSubmit={noop}>
      <Form>
        <Field name="email" label="Email" component={FormikTextField} />
      </Form>
    </Formik>
  )

  expect(component.toJSON()).toMatchSnapshot()
})

test('<FormikTextField /> renders a Fabric <TextField />', () => {
  const fieldProps = createFieldProps()

  const formikTextField = renderer.create(
    <FormikTextField {...fieldProps} label="Email" />
  )
  const fabricTextField = renderer.create(
    <TextField {...mapFieldToTextField(fieldProps)} label="Email" />
  )
  expect(serialize(formikTextField)).toBe(serialize(fabricTextField))
})

test('mapFieldToTextField() maps FieldProps to ITextFieldProps', () => {
  const { field, form } = createFieldProps()
  const props = mapFieldToTextField({ form, field })

  expect(props.value).toBe(field.value)

  props.onBlur!(null as any)

  expect(field.onBlur).toHaveBeenCalledTimes(1)

  props.onChange!(null as any, 'bar')

  expect(field.onChange).toHaveBeenCalledTimes(1)
  expect(field.onChange).toHaveBeenCalledWith(null, 'bar')
})

test('mapFieldToTextField() additionally maps error message only when touched', () => {
  const errorMessage = 'not a valid email'
  const { field, form } = createFieldProps(new Values().email, errorMessage)

  const props = mapFieldToTextField({
    form: {
      ...form,
      touched: { [field.name]: false },
    },
    field,
  })

  expect(props.errorMessage).not.toBe(errorMessage)

  const propsTouched = mapFieldToTextField({
    form,
    field,
  })

  expect(propsTouched.errorMessage).toBe(errorMessage)
})

test('allow errorMessage prop overwrite', () => {
  const errorMessage = 'not a valid email'
  const { field, form } = createFieldProps(new Values().email, errorMessage)

  const formikTextField = renderer.create(
    <FormikTextField {...{ field, form }} errorMessage={'overwrite'} />
  )
  const instance = formikTextField.root

  expect(instance).not.toBeNull()
  expect(() =>
    instance!.findByProps({ errorMessage: 'overwrite' })
  ).not.toThrow()
})

test('<FormikMaskedTextField /> renders correctly as a field component', () => {
  const component = renderer.create(
    <Formik initialValues={{ masked: '' }} onSubmit={noop}>
      <Form>
        <Field
          name="masked"
          label="Masked"
          mask="(999) 999 - 9999"
          component={FormikMaskedTextField}
        />
      </Form>
    </Formik>
  )

  expect(component.toJSON()).toMatchSnapshot()
})
