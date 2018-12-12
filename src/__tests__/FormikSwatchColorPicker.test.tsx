// tslint:disable:jsx-no-lambda

import { Field, FieldProps, Form, Formik } from 'formik'
import { IColorCellProps, SwatchColorPicker } from 'office-ui-fabric-react'
import * as React from 'react'
import renderer from 'react-test-renderer'
import {
  FormikSwatchColorPicker,
  mapFieldToSwatchColorPicker,
} from '../FormikSwatchColorPicker'
import { noop, serialize } from './utils'

const colors = [
  { id: 'red', label: 'red', color: '#ff0000' },
  { id: 'green', label: 'green', color: '#00ff00' },
  { id: 'blue', label: 'blue', color: '#0000ff' },
]
function createFieldProps(
  color: IColorCellProps | string = colors[0]
): FieldProps<{ color: IColorCellProps }> {
  return {
    field: {
      value: color,
      onChange: jest.fn(),
      onBlur: jest.fn(),
      name: 'color',
    },
    form: { setFieldValue: jest.fn(), handleBlur: jest.fn(() => jest.fn()) },
  } as any
}

test('<FormikSwatchColorPicker /> renders correctly as a field component', () => {
  const component = renderer.create(
    <Formik initialValues={{ color: colors[0] }} onSubmit={noop}>
      <Form>
        <Field
          name="color"
          render={(fieldProps: FieldProps<{ color: IColorCellProps }>) => (
            <FormikSwatchColorPicker
              {...fieldProps}
              columnCount={3}
              colorCells={[
                { id: '#ff0000', label: 'red', color: '#ff0000' },
                { id: '#00ff00', label: 'green', color: '#00ff00' },
                { id: '#0000ff', label: 'blue', color: '#0000ff' },
              ]}
            />
          )}
        />
      </Form>
    </Formik>
  )

  expect(component.toJSON()).toMatchSnapshot()
})

test('<FormikSwatchColorPicker /> renders a Fabric <SwatchColorPicker />', () => {
  const fieldProps = createFieldProps()

  const formikSwatchColorPicker = renderer.create(
    <FormikSwatchColorPicker
      {...fieldProps}
      colorCells={colors}
      columnCount={3}
    />
  )
  const fabricSwatchColorPicker = renderer.create(
    <SwatchColorPicker
      {...mapFieldToSwatchColorPicker(fieldProps)}
      colorCells={colors}
      columnCount={3}
    />
  )
  expect(serialize(formikSwatchColorPicker)).toBe(
    serialize(fabricSwatchColorPicker)
  )
})

test('mapFieldToSwatchColorPicker() maps FieldProps to ISwatchColorPickerProps', () => {
  const { field, form } = createFieldProps()
  const props = mapFieldToSwatchColorPicker({ form, field })

  expect(props.selectedId).toBe(field.value.id)

  props.onColorChanged!(colors[1].id, colors[1].color)

  expect(form.setFieldValue).toHaveBeenCalledTimes(1)
  expect(form.setFieldValue).toHaveBeenCalledWith(field.name, {
    id: colors[1].id,
    color: colors[1].color,
  })

  // onColorChanged also calls onBlur
  expect(field.onBlur).toHaveBeenCalled()
})

test('mapFieldToSwatchColorPicker() also supports string values', () => {
  const { field, form } = createFieldProps(colors[0].color)
  const props = mapFieldToSwatchColorPicker({ form, field })

  expect(props.selectedId).toBe(field.value)

  props.onColorChanged!(colors[1].id, colors[1].color)

  expect(form.setFieldValue).toHaveBeenCalledTimes(1)
  expect(form.setFieldValue).toHaveBeenCalledWith(field.name, colors[1].color)

  // onColorChanged also calls onBlur
  expect(field.onBlur).toHaveBeenCalled()
})
