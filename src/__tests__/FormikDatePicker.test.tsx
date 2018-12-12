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

const testDate = new Date('2018-12-04T12:00:00Z')
function createFieldProps(date = testDate): FieldProps<{ test: Date }> {
  return {
    field: {
      value: date,
      onChange: jest.fn(),
      onBlur: jest.fn(),
      name: 'test',
    },
    form: { setFieldValue: jest.fn(), handleBlur: jest.fn(() => jest.fn()) },
  } as any
}

test('<FormikDatePicker /> renders correctly as a field component', () => {
  const component = renderer.create(
    <Formik initialValues={{ test: testDate }} onSubmit={noop}>
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

  const selectedDate = new Date(testDate.getTime() + 86400 * 1000) // tomorrow
  props.onSelectDate!(selectedDate)

  expect(form.setFieldValue).toHaveBeenCalledTimes(1)
  expect(form.setFieldValue).toHaveBeenCalledWith(field.name, selectedDate)
  expect(field.onChange).not.toHaveBeenCalled()
})
