import { Field, FieldProps, Form, Formik } from 'formik'
import { ChoiceGroup } from 'office-ui-fabric-react'
import * as React from 'react'
import renderer from 'react-test-renderer'
import { FormikChoiceGroup, mapFieldToChoiceGroup } from '../FormikChoiceGroup'
import { noop, serialize } from './utils'

class Values {
  public selection: string | null = null
}

function createFieldProps(value: string | null = null): FieldProps<Values> {
  return {
    field: {
      value,
      onChange: jest.fn(),
      onBlur: jest.fn(),
      name: 'selection',
    },
    form: { setFieldValue: jest.fn(), handleBlur: jest.fn(() => jest.fn()) },
  } as any
}

const options = ['foo', 'bar', 'baz'].map(x => ({ key: x, text: x }))

test('<FormikChoiceGroup /> renders correctly as a field component', () => {
  const component = renderer.create(
    <Formik initialValues={new Values()} onSubmit={noop}>
      <Form>
        <Field
          name="selection"
          label="Selection"
          component={FormikChoiceGroup}
        />
      </Form>
    </Formik>
  )

  expect(component.toJSON()).toMatchSnapshot()
})

test('<FormikChoiceGroup /> renders a Fabric <ChoiceGroup />', () => {
  const fieldProps = createFieldProps()

  const formikChoiceGroup = renderer.create(
    <FormikChoiceGroup {...fieldProps} options={options} label="Selection" />
  )
  const fabricChoiceGroup = renderer.create(
    <ChoiceGroup
      {...mapFieldToChoiceGroup(fieldProps)}
      label="Selection"
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
