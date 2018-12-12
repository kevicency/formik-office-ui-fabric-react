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

class Values {
  public rating: number = 3
}

function createFieldProps(value: number = 3): FieldProps<Values> {
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

test('<FormikRating /> renders correctly as a field component', () => {
  const component = renderer.create(
    <Formik initialValues={new Values()} onSubmit={noop}>
      <Form>
        <Field name="rating" label="Rating" component={FormikRating} />
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
