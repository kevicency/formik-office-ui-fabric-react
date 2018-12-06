import { Field, FieldProps, Form, Formik } from 'formik'
import { ChoiceGroup } from 'office-ui-fabric-react'
import * as React from 'react'
import renderer from 'react-test-renderer'
import { FormikChoiceGroup, mapFieldToChoiceGroup } from '../FormikChoiceGroup'
import { noop, serialize } from './utils'

function createFieldProps(): FieldProps<{ test: Date }> {
  return {
    field: {
      rating: 'foo',
      onChange: jest.fn(),
      onBlur: jest.fn(),
      name: 'winner',
    },
    form: { setFieldValue: jest.fn(), handleBlur: jest.fn(() => jest.fn()) },
  } as any
}

const options = ['foo', 'bar', 'baz'].map(x => ({ key: x, text: x }))

test('<FormikChoiceGroup /> renders correctly as a field component', () => {
  const component = renderer.create(
    <Formik initialValues={{ isChecked: true }} onSubmit={noop}>
      <Form>
        <Field name="test" label="Count" component={FormikChoiceGroup} />
      </Form>
    </Formik>
  )

  expect(component.toJSON()).toMatchSnapshot()
})

test('<FormikChoiceGroup /> renders a Fabric <ChoiceGroup />', () => {
  const label = 'ChoiceGroup'
  const fieldProps = createFieldProps()

  const formikChoiceGroup = renderer.create(
    <FormikChoiceGroup {...fieldProps} options={options} />
  )
  const fabricChoiceGroup = renderer.create(
    <ChoiceGroup
      {...mapFieldToChoiceGroup(fieldProps)}
      label={label}
      options={options}
    />
  )
  expect(serialize(formikChoiceGroup)).toBe(serialize(fabricChoiceGroup))
})

test('mapFieldToChoiceGroup() maps FieldProps to IChoiceGroupProps', () => {
  const { field, form } = createFieldProps()
  const props = mapFieldToChoiceGroup({ form, field })

  expect(props.selectedKey).toBe(field.value)

  props.onChange!(null as any, options[1])

  expect(form.setFieldValue).toHaveBeenCalledTimes(1)
  expect(form.setFieldValue).toHaveBeenCalledWith(field.name, options[1].key)

  // onChange also calls onBlur
  expect(field.onBlur).toHaveBeenCalled()
})
