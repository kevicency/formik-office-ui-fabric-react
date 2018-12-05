import { getErrorMessage, invokeAll } from '../utils'

test('invokeAll', () => {
  const cbs = [jest.fn(), jest.fn()]

  invokeAll(...cbs)()

  expect(cbs[0]).toHaveBeenCalledTimes(1)
  expect(cbs[1]).toHaveBeenCalledTimes(1)

  expect(invokeAll(cbs[0], null)).not.toThrow()
  expect(invokeAll(cbs[0], true)).not.toThrow()
})

test('getErrorMessage', () => {
  expect(
    getErrorMessage({
      field: { name: 'foo' },
      form: { errors: { foo: 'error' }, touched: { foo: false } },
    } as any)
  ).toBe(undefined)

  expect(
    getErrorMessage({
      field: { name: 'foo' },
      form: { errors: { bar: 'error' }, touched: { foo: true } },
    } as any)
  ).toBe(undefined)

  expect(
    getErrorMessage({
      field: { name: 'foo' },
      form: { errors: { foo: 'error' }, touched: { foo: true } },
    } as any)
  ).toBe('error')
})
