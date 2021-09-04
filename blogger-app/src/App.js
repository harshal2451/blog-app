
import { Provider } from 'react-redux';
import store from './redux/store'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
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
  // const Dashboard = React.lazy(() => import("./Components/Dashboard"))

  return (
    <React.Suspense fallback={loading}>
      <Provider store={store}>

        <Router >

          <Switch>
            <Route exact path="/" component={SignIn} />

            <Route path="/home" component={HomePage}/>

          </Switch>
          
        </Router>
      </Provider>
    </React.Suspense>
  );
}

export default App;
