import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/pages/Home";
import NavBar from "./components/layout/navbar";
import NewNote from "./components/pages/NewNote";
import Login from "./components/pages/Login";
import { PrivateRoute } from "./components/utilities/PrivateRoutes/PrivateRoute";
import { UnauthenticatedRoute } from "./components/utilities/PrivateRoutes/UnauthenticatedRoute";
import { AuthProvider } from "./components/contexts/AuthContext";
import Register from "./components/pages/Register";

function App() {
  return (
    <div className="App">
      <Router>
        <AuthProvider>
          <NavBar />
          <Routes>
            <Route
              path="/signin"
              element={<UnauthenticatedRoute item={<Login />} />}
            ></Route>
            <Route
              path="/signup"
              element={<UnauthenticatedRoute item={<Register />} />}
            ></Route>
            <Route
              exact
              path="/"
              element={<PrivateRoute item={<Home />} />}
            ></Route>
            <Route
              path="/new-note"
              element={<PrivateRoute item={<NewNote />} />}
            ></Route>
          </Routes>
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;
