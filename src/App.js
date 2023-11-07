import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/pages/Home";
import NavBar from "./components/layout/navbar";
import NewNote from "./components/pages/NewNote";
import Login from "./components/pages/Login";
import { PrivateRoute } from "./components/utilities/PrivateRoutes/PrivateRoute";
import { UnauthenticatedRoute } from "./components/utilities/PrivateRoutes/UnauthenticatedRoute";
import { AuthProvider } from "./components/contexts/AuthContext";
import Register from "./components/pages/Register";
import Note from "./components/pages/Note";
import Favorites from "./components/pages/Favorites";
import EditNote from "./components/pages/EditNote";
import PageNotFound from "./components/pages/404NotFound";

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
            <Route
              path="/note/:id"
              element={<PrivateRoute item={<Note />} />}
            ></Route>
            <Route
              path="/favorites"
              element={<PrivateRoute item={<Favorites />} />}
            ></Route>
            <Route
              path="/edit/:id"
              element={<PrivateRoute item={<EditNote />} />}
            ></Route>
            {/* Rota para caso a url não corresponda a nenhuma rota acima */}
            <Route path="*" element={<PageNotFound />}></Route>
          </Routes>
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;
