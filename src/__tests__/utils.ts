import renderer from 'react-test-renderer'

export const noop = () => null

export const serialize = (component: renderer.ReactTestRenderer) => {
  return component.toJSON()!.toString()
}
