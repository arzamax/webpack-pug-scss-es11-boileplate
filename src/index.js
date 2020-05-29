import { first } from './scripts/first-script'
import { second } from './scripts/second-script'

import './styles/main.scss'

if (process.env.NODE_ENV !== 'production') {
  require('./pages/index.pug')
  require('./pages/first-page.pug')
  require('./pages/second-page.pug')
}

document.addEventListener('DOMContentLoaded', () => {
  first()
  second()
})
