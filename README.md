[![Build Status](https://dev.azure.com/kmees/formik-office-ui-fabric-react/_apis/build/status/kmees.formik-office-ui-fabric-react)](https://dev.azure.com/kmees/formik-office-ui-fabric-react/_build/latest?definitionId=1)
[![Coverage Status](https://coveralls.io/repos/github/kmees/formik-office-ui-fabric-react/badge.svg?branch=master)](https://coveralls.io/github/kmees/formik-office-ui-fabric-react?branch=master)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat)](https://github.com/prettier/prettier)

# formik-office-ui-fabric-react

> Formik ❤️ Office UI Fabric React

## Why?

To reduce the boilerplate code needed to get [Fabrics input components](https://developer.microsoft.com/en-us/fabric#/components) work seamlessly with [Formiks field props](https://jaredpalmer.com/formik/docs/api/field)

## How?

1. Install package

```bash
yarn add formik-office-ui-fabric-react
# or
npm install --save formik-office-ui-fabric-react
```

2. Replace `FooComponent` with `FormikFooComponent`, i.e

```tsx
import { Formik, Form, Field } from 'formik'
import { DatePicker } from 'office-ui-fabric-react'
import { FormikDatePicker } from 'office-ui-fabric-react'

const OldAndUgly = () => (
  <Formik initialValues={{ date: new Date() }}>
    <Form>
      <Field
        name="date"
        render={fieldProps => (
          <DatePicker
            value={/* wrapper code for fieldProps.value */}
            onSelectDate={/* wrapper code for fieldProps.onChange */}
          />
        )}
      />
    </Form>
  </Formik>
)

const NewAndPretty = () => (
  <Formik initialValues={{ date: new Date() }}>
    <Form>
      <Field name="date" component={FormikDatePicker} />
    </Form>
  </Formik>
)
```

For a complete list of support components, see [Storybook](https://kmees.github.io/formik-office-ui-fabric-react)

## Development

###

```
git clone https://github.com/kmees/formik-office-ui-fabric-react
cd formik-office-ui-fabric-react && yarn install
```

### Running development server

```
yarn start
```

### Running tests

```
yarn test
```
