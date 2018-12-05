import { FieldProps, getIn } from 'formik'

export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>

export function getErrorMessage<T = any>({ field, form }: FieldProps<T>) {
  const error = getIn(form.errors, field.name)
  const touched = getIn(form.touched, field.name)

  return touched ? error : undefined
}

export function invokeAll(...callbacks: any[]) {
  return () => {
    for (const callback of callbacks) {
      if (callback && typeof callback === 'function') {
        callback()
      }
    }
  }
}

export function createFakeEvent({ name }: { name: string }) {
  return { target: { name } }
}
