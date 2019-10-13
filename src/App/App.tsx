import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom'
import Thread from '../containers/Thread/Thread'
import Home from '../containers/Home/Home'
import NotFound from '../containers/NotFound/NotFound'

const App: React.FC = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/r/:subreddit/comments/:commentid">
          <Thread />
        </Route>
        <Route path="*">
          <NotFound />
        </Route>
      </Switch>
    </Router>
  )
}

export default App
