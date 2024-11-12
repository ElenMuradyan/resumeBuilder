import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom";
import Register from "./pages/auth/Register";
import Login from "./pages/auth/Login";
import Main from "./pages/MainPage";
import MainLayout from "./layouts/MainLayout";
import CabinetLayout from "./layouts/CabinetLayout";
function App() {
  return (
    <div className="App">
      <RouterProvider
      router={
        createBrowserRouter(
          createRoutesFromElements(
            <Route path="/" element={<MainLayout/>}>
                <Route index element={<Login/>}></Route>
                <Route path="/login" element={<Login/>}></Route>
                <Route path="/register" element={<Register/>}></Route>
              <Route path="/cabinet" element={<CabinetLayout/>}>
                <Route path="/main" element={<Main/>}></Route>
              </Route>
            </Route>
          )
        )
      }
      />
    </div>
  );
}

export default App;
