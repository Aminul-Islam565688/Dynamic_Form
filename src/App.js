import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { Route, Routes } from "react-router-dom";
import Login from "./components/auth/Login";
import PrivateRoute from "./components/auth/PrivateRoute/PrivateRoute";
import Body from './components/Body';
import DragAndDrop from "./components/DragAndDrop/DragAndDrop";
import Navigation from "./components/Navigation";


library.add(fab, fas, far);

function App() {
  const user = localStorage.getItem('user');
  if (!user) {
    localStorage.setItem('user', JSON.stringify({ accessToken: null }))
  }
  return (
    <Routes>
      <Route exact path="/" element={<PrivateRoute> <Navigation otherPage /></PrivateRoute>} />
      <Route path="/form/:id" element={<PrivateRoute> <Body /></PrivateRoute>} />
      <Route path="/drag-and-drop" element={<PrivateRoute><DragAndDrop /></PrivateRoute>} />
      <Route path="/login" element={<PrivateRoute> <Login /></PrivateRoute>} />
    </Routes>
  );
}

export default App;
