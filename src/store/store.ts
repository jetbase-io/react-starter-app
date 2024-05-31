import type { RematchDispatch, RematchRootState } from '@rematch/core'

import { init } from '@rematch/core'
import type { RootModel } from './models'

import { models } from './models'

export const store = init({
  models,
  redux: {
    devtoolOptions: {
      actionSanitizer: action => action,
    },
  },
})

export type Store = typeof store

export type Dispatch = RematchDispatch<RootModel>

export type RootState = RematchRootState<RootModel>
