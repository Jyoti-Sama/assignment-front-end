import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

import { Provider } from 'react-redux';

import store from "./reducers/Store";

import AppBar from "./components/Appbar";
import SubjectAdd from "./forms/SubjectAdd";
import Home from "./routes/Home";


function App() {
  return (
    <Provider store={store}>

      <Router>

        <AppBar />

        <Routes>
          <Route exact path='/' element={< Home />}></Route>
          {/* <Route exact path='/about' element={< About />}></Route> */}
          <Route exact path='/add-subject' element={<SubjectAdd />}></Route>
        </Routes>

      </Router>
      
    </Provider>

  )
}

export default App;

