import { action } from '@storybook/addon-actions'
import * as React from 'react'
import { TestComponent } from '../src/TestComponent'

export default () => <TestComponent onClick={action('onClick')()} />
