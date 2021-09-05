
import { Provider } from 'react-redux';
import store from './redux/store'
import {BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom'
import React from 'react';
function App() {
  const loading = (
    <div className="lds-ring">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  )

  const SignIn = React.lazy(() => import("./Components/SignIn"))
  const HomePage = React.lazy(() => import("./Components/HomePage"))
  const SignUp = React.lazy(() => import("./Components/SignUp"))
  

  return (
    <React.Suspense fallback={loading}>
      <Provider store={store}>

        <Router >

          <Switch>
            <Route exact path="/" component={SignIn} />
            <Route exact path="/signup" component={SignUp} />

            <Route path="/blogs" component={HomePage}/>
            <Route path="/error/error-v1" render={() => <h1 className="not">404 NOT FOUND</h1>}/>
            <Redirect to="error/error-v1" />

          </Switch>
          
        </Router>
      </Provider>
    </React.Suspense>
  );
}

export default App;
