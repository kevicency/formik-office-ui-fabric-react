import { action } from '@storybook/addon-actions'
import { FormikActions } from 'formik'

export function handleSubmit<T>(
  values: T,
  { setSubmitting }: FormikActions<T>
) {
  action('submit:start')(values)
  setTimeout(() => {
    setSubmitting(false)
    action('submit:done')()
  }, 2000)
}
