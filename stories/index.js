import React from 'react'

import { storiesOf } from '@storybook/react'
import TestComponentStory from './TestComponent.story'

storiesOf('formik-office-ui-fabric-react', module).add('Test Component', () => (
  <TestComponentStory />
))
