import { Field, FieldProps, Form, Formik } from 'formik'
import { DatePicker, setIconOptions } from 'office-ui-fabric-react'
import * as React from 'react'
import renderer from 'react-test-renderer'
import { FormikDatePicker, mapFieldToDatePicker } from '../FormikDatePicker'
import { noop, serialize } from './utils'

// Suppress icon warnings.
setIconOptions({
  disableWarnings: true,
})

const now = new Date()
function createFieldProps(date = now): FieldProps<{ test: Date }> {
  return {
    field: {
      value: date,
      onChange: jest.fn(),
      onBlur: jest.fn(),
      name: 'test',
    },
    form: { setFieldValue: jest.fn(), handleBlur: jest.fn() },
  } as any
}

test('<FormikDatePicker /> renders correctly as a field component', () => {
  const component = renderer.create(
    <Formik initialValues={{ test: now }} onSubmit={noop}>
      <Form>
        <Field name="test" label="Date" component={FormikDatePicker} />
      </Form>
    </Formik>
  )

  expect(component.toJSON()).toMatchSnapshot()
})

test('<FormikDatePicker /> renders a Fabric <DatePicker />', () => {
  const label = 'Date'
  const fieldProps = createFieldProps()

  const formikDatePicker = renderer.create(
    <FormikDatePicker {...fieldProps} label={label} />
  )
  const fabricDatePicker = renderer.create(
    <DatePicker {...mapFieldToDatePicker(fieldProps)} label={label} />
  )
  expect(serialize(formikDatePicker)).toBe(serialize(fabricDatePicker))
})

test('mapFieldToDatePicker() maps FieldProps to IDatePickerProps', () => {
  const { field, form } = createFieldProps()
  const props = mapFieldToDatePicker({ form, field })

  expect(props.value).toBe(field.value)

  props.onBlur!(null as any)

  expect(form.handleBlur).toHaveBeenCalledTimes(1)
  expect(form.handleBlur).toHaveBeenCalledWith(field.name)

  const selectedDate = new Date(now.getTime() + 86400 * 1000) // tomorrow
  props.onSelectDate!(selectedDate)

  expect(form.setFieldValue).toHaveBeenCalledTimes(1)
  expect(form.setFieldValue).toHaveBeenCalledWith(field.name, selectedDate)
  expect(field.onChange).not.toHaveBeenCalled()
})
