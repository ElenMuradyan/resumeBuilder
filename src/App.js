import { createBrowserRouter, createRoutesFromElements, Navigate, Route, RouterProvider } from "react-router-dom";
import Register from "./pages/auth/Register";
import Login from "./pages/auth/Login";
import MainPage from "./pages/MainPage";
import MainLayout from "./layouts/MainLayout";
import CabinetLayout from "./layouts/CabinetLayout";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserProfileInfo } from "./state-management/slices/userProfile";
import { useEffect } from "react";
import ResumesPage from "./pages/ResumesPage";
import { ROUTE_CONSTANTS } from "./core/utils/constants";
import LoadingWrapper from "./components/sheard/LoadingWrapper";
import WelcomePage from "./pages/WelcomePage";
import ResumePage from "./pages/ResumePage";

import './styles/global.css';

function App() {
  const dispatch = useDispatch();
  const { userProfileInfo: { isAuth } } = useSelector(store => store.userProfile);

  useEffect(() => {
    dispatch(fetchUserProfileInfo());
  },[dispatch]);

  return (
    <LoadingWrapper>
      <RouterProvider
      router={
        createBrowserRouter(
          createRoutesFromElements(
            <Route path="/" element={<MainLayout />}>
                <Route index element={isAuth ? <Navigate to={ROUTE_CONSTANTS.CABINET} /> : <Login />}/>
                <Route path={ROUTE_CONSTANTS.LOGIN} element={isAuth ? <Navigate to={ROUTE_CONSTANTS.CABINET} /> : <Login />}/>
                <Route path={ROUTE_CONSTANTS.REGISTER} element={isAuth ? <Navigate to={ROUTE_CONSTANTS.CABINET} /> : <Register />}/>

                {/*Cabinet */}

              <Route path={ROUTE_CONSTANTS.CABINET} element={isAuth ? <CabinetLayout /> : <Navigate to={ROUTE_CONSTANTS.LOGIN} />}>
                <Route index element={<WelcomePage />}></Route>
                <Route path={ROUTE_CONSTANTS.MAIN} element={<MainPage />}/>
                <Route path={ROUTE_CONSTANTS.WELCOMEPAGE} element={<WelcomePage />}/>
                <Route path={ROUTE_CONSTANTS.RESUME} element={<ResumePage />}/>
                <Route path={ROUTE_CONSTANTS.RESUMES} element={<ResumesPage />}/>
                <Route path={ROUTE_CONSTANTS.CREATED_RESUME} element={<ResumePage/>}/>
              </Route>
            </Route>
          )
        )
      }
      />
    </LoadingWrapper>
  )
}

export default App;