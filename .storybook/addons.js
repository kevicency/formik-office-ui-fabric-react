import '@storybook/addon-actions/register'
import '@storybook/addon-links/register'

import addons from '@storybook/addons'
import ReactAI from 'react-appinsights'

addons.register('storybook/application-insights', api => {
  ReactAI.init({ instrumentationKey: '276ac3cd-077a-4595-b82e-24732aa75645' })

  var appInsights = ReactAI.ai()

  api.onStory((kind, story) => {
    let path = window.location.pathname

    if (path === '/') {
      path = ''
    }

    appInsights.trackPageView(story, `${path}/${kind}/${story}`)
  })
})
