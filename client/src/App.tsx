import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import "./index.css";
import Layout from "./pages/layout";
import Login from "./pages/login";
import Register from "./pages/register";
import HomeScreen from "./pages/homeScreen";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/create-account" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Layout />}>
          <Route path="/create-account" element={<HomeScreen />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
