import { useRouterHistory } from 'react-router'
import { createHistory, useBeforeUnload } from 'history'

export const history = useRouterHistory(
  useBeforeUnload(createHistory)
)()
