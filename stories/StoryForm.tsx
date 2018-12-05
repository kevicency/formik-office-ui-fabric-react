import { connect, Form, FormikProps } from 'formik'
import {
  Fabric,
  FontClassNames,
  PrimaryButton,
  ProgressIndicator,
} from 'office-ui-fabric-react'
import * as React from 'react'

export const StoryForm = connect(
  ({
    title,
    children,
    formik,
  }: {
    title?: string
    children: any
    formik?: FormikProps<any>
  }) => (
    <Fabric style={{ maxWidth: '480px' }}>
      <Form>
        {title && <h1 className={FontClassNames.xLarge}>{title}</h1>}
        {children}
        <footer style={{ marginTop: '2em' }}>
          <div>
            <PrimaryButton
              onClick={formik!.submitForm}
              disabled={formik!.isSubmitting}>
              Submit
            </PrimaryButton>
          </div>
          {formik!.isSubmitting ? (
            <ProgressIndicator />
          ) : (
            <hr style={{ marginTop: '9px', marginBottom: '7px' }} />
          )}
          <pre
            style={{
              fontFamily: 'Consolas, monospace',
              whiteSpace: 'pre-wrap',
              width: '100%',
              marginTop: '0',
            }}>
            {JSON.stringify(
              {
                values: formik!.values,
                dirty: formik!.dirty,
                touched: formik!.touched,
              },
              null,
              2
            )}
          </pre>
        </footer>
      </Form>
    </Fabric>
  )
)
