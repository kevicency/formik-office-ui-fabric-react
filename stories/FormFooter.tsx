import { connect, FormikProps } from 'formik'
import { PrimaryButton, ProgressIndicator } from 'office-ui-fabric-react'
import { FontClassNames } from 'office-ui-fabric-react/lib/Styling'
import React from 'react'

export const FormFooter = connect(
  ({ formik }: { formik?: FormikProps<any> }) => (
    <div style={{ marginTop: '1em' }}>
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
        <hr style={{ marginTop: '9px' }} />
      )}
      <div className={FontClassNames.large}>Values</div>
      <pre
        style={{
          fontFamily: 'Consolas, monospace',
          whiteSpace: 'pre-wrap',
          width: '100%',
        }}>
        {JSON.stringify(formik!.values)}
      </pre>
    </div>
  )
)
