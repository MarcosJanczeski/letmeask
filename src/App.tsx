import { BrowserRouter, Route, Switch } from 'react-router-dom'

import { AuthCtxProvider } from './contexts/AuthCtx'
import { RoomCtxProvider } from './contexts/RoomCtx'

import {
  Home,
  NewRoom,
  Room,
} from './pages'

function App() {

  return (
    <BrowserRouter>
      <AuthCtxProvider>
        <Switch>
          <Route exact path='/' component={Home} />
          <Route exact path='/rooms/new' component={NewRoom} />
          <RoomCtxProvider>
            <Route path='/rooms/:code' component={Room} />
          </RoomCtxProvider>
        </Switch>
      </AuthCtxProvider>
    </BrowserRouter>
  )
}

export default App
