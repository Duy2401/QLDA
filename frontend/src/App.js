import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Fragment } from "react";

import Login from "./Pages/Login/login";
import {
  Routers,
  RouterAdmin,
  RouterStaff,
  RouterManageProject,
} from "./Router/routers";
import DefaultLayout from "./Layout/DefaultLayout/DefaultLayout";
import PrivateRouters from "./Router/privateRouter";
import { useSelector } from "react-redux";
function App() {
  const currentUser = useSelector((state) => state.auth.login?.currentUser);
  let publicRouter = Routers;
  if (currentUser?.isRole === 2003) {
    publicRouter = Routers;
  } else if (currentUser?.isRole === 2002) {
    publicRouter = RouterAdmin;
  } else if (currentUser?.isRole === 2001) {
    publicRouter = RouterStaff;
  } else if (currentUser?.isRole === 2004) {
    publicRouter = RouterManageProject;
  }
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/login" element={<Login />} />
          {publicRouter.map((router, index) => {
            let Page = router.component;
            let Layout = DefaultLayout;
            if (router.layout) {
              Layout = router.layout;
            } else if (router.layout === null) {
              Layout = Fragment;
            }
            return (
              <Route
                key={index}
                path={router.path}
                element={
                  <Layout>
                    <PrivateRouters>
                      <Page />
                    </PrivateRouters>
                  </Layout>
                }
              >
                {router.children?.map((child, index) => {
                  const PageChild = child.component;
                  return (
                    <Route
                      key={index}
                      path={child.path}
                      element={
                        <PrivateRouters>
                          <PageChild />
                        </PrivateRouters>
                      }
                    />
                  );
                })}
              </Route>
            );
          })}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
