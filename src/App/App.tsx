import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom'
import Thread from '../containers/Thread/Thread'
import Home from '../containers/Home/Home'
import Landing from '../containers/Landing/Landing'
import NotFound from '../containers/NotFound/NotFound'

const App: React.FC = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Landing />
        </Route>
        <Route path="/r/:subreddit/comments/:threadID/:threadSlug">
          <Thread scrollable={false} />
        </Route>
        <Route path="*">
          <NotFound />
        </Route>
      </Switch>
    </Router>
  )
}

export default App
