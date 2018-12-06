import { Field, FieldProps, Form, Formik } from 'formik'
import { Rating, setIconOptions } from 'office-ui-fabric-react'
import * as React from 'react'
import renderer from 'react-test-renderer'
import { FormikRating, mapFieldToRating } from '../FormikRating'
import { noop, serialize } from './utils'

// Suppress icon warnings.
setIconOptions({
  disableWarnings: true,
})

function createFieldProps(): FieldProps<{ test: Date }> {
  return {
    field: {
      rating: 3,
      onChange: jest.fn(),
      onBlur: jest.fn(),
      name: 'isChecked',
    },
    form: { setFieldValue: jest.fn(), handleBlur: jest.fn(() => jest.fn()) },
  } as any
}

test('<FormikRating /> renders correctly as a field component', () => {
  const component = renderer.create(
    <Formik initialValues={{ isChecked: true }} onSubmit={noop}>
      <Form>
        <Field name="test" label="Count" component={FormikRating} />
      </Form>
    </Formik>
  )

  expect(component.toJSON()).toMatchSnapshot()
})

test('<FormikRating /> renders a Fabric <Rating />', () => {
  const label = 'Rating'
  const fieldProps = createFieldProps()

  const formikRating = renderer.create(<FormikRating {...fieldProps} />)
  const fabricRating = renderer.create(
    <Rating {...mapFieldToRating(fieldProps)} label={label} />
  )
  expect(serialize(formikRating)).toBe(serialize(fabricRating))
})

test('mapFieldToRating() maps FieldProps to IRatingProps', () => {
  const { field, form } = createFieldProps()
  const props = mapFieldToRating({ form, field })

  expect(props.value).toBe(field.value)

  props.onChange!(null as any, 5)

  expect(form.setFieldValue).toHaveBeenCalledTimes(1)
  expect(form.setFieldValue).toHaveBeenCalledWith(field.name, 5)

  // onChange also calls onBlur
  expect(field.onBlur).toHaveBeenCalled()
})
