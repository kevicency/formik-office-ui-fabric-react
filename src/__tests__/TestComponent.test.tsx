import * as React from 'react'
import renderer from 'react-test-renderer'
import { TestComponent } from '../TestComponent'

test('TestComponent renders correctly', () => {
  const component = renderer.create(<TestComponent />)

  expect(component.toJSON()).toMatchSnapshot()
})
