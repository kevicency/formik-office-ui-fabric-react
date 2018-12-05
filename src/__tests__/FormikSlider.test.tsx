import { Field, FieldProps, Form, Formik } from 'formik'
import { setIconOptions, Slider } from 'office-ui-fabric-react'
import * as React from 'react'
import renderer from 'react-test-renderer'
import { FormikSlider, mapFieldToSlider } from '../FormikSlider'
import { noop, serialize } from './utils'

// Suppress icon warnings.
setIconOptions({
  disableWarnings: true,
})

function createFieldProps(): FieldProps<{ test: Date }> {
  return {
    field: {
      value: 5,
      onChange: jest.fn(),
      onBlur: jest.fn(),
      name: 'isChecked',
    },
    form: { setFieldValue: jest.fn(), handleBlur: jest.fn(() => jest.fn()) },
  } as any
}

test('<FormikSlider /> renders correctly as a field component', () => {
  const component = renderer.create(
    <Formik initialValues={{ isChecked: true }} onSubmit={noop}>
      <Form>
        <Field name="test" label="Count" component={FormikSlider} />
      </Form>
    </Formik>
  )

  expect(component.toJSON()).toMatchSnapshot()
})

test('<FormikSlider /> renders a Fabric <Slider />', () => {
  const label = 'Count'
  const fieldProps = createFieldProps()

  const formikSlider = renderer.create(<FormikSlider {...fieldProps} />)
  const fabricSlider = renderer.create(
    <Slider {...mapFieldToSlider(fieldProps)} label={label} />
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
