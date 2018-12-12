import { Field, FieldProps, Form, Formik } from 'formik'
import { Slider } from 'office-ui-fabric-react'
import * as React from 'react'
import renderer from 'react-test-renderer'
import { FormikSlider, mapFieldToSlider } from '../FormikSlider'
import { noop, serialize } from './utils'

class Values {
  public rating: number = 3
}

function createFieldProps(value: number = 3): FieldProps<{ test: Date }> {
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

test('<FormikSlider /> renders correctly as a field component', () => {
  const component = renderer.create(
    <Formik initialValues={new Values()} onSubmit={noop}>
      <Form>
        <Field name="rating" label="Rating" component={FormikSlider} />
      </Form>
    </Formik>
  )

  expect(component.toJSON()).toMatchSnapshot()
})

test('<FormikSlider /> renders a Fabric <Slider />', () => {
  const fieldProps = createFieldProps()

  const formikSlider = renderer.create(
    <FormikSlider {...fieldProps} label="Rating" />
  )
  const fabricSlider = renderer.create(
    <Slider {...mapFieldToSlider(fieldProps)} label="Rating" />
  )
  expect(serialize(formikSlider)).toBe(serialize(fabricSlider))
})

test('mapFieldToSlider() maps FieldProps to ISliderProps', () => {
  const { field, form } = createFieldProps()
  const props = mapFieldToSlider({ form, field })

  expect(props.value).toBe(field.value)

  props.onChange!(10)

  expect(form.setFieldValue).toHaveBeenCalledTimes(1)
  expect(form.setFieldValue).toHaveBeenCalledWith(field.name, 10)

  props.onChanged!(null as any, 10)
  // onChanged calls onBlur
  expect(field.onBlur).toHaveBeenCalled()
})
