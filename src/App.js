import "./App.css";
import { privateRoutes, publicRoutes } from "./routes";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LayoutDefault from "./components/Layout/LayoutDefault";
import LayoutDangNhap from "./components/Layout/LayoutDangNhap";
import LayoutTaiKhoan from "./components/Layout/LayoutTaiKhoan";

function App() {
  return (
    <div>
      <Router>
        <div>
          <Routes>
            {privateRoutes.map((route, index) => {
              const Layout =
                route.layout === "LayoutDefault"
                  ? LayoutDefault
                  : LayoutTaiKhoan;
              const Page = route.component;
              return (
                <Route
                  key={index}
                  path={route.path}
                  element={
                    <Layout>
                      <Page />
                    </Layout>
                  }
                />
              );
            })}

            {publicRoutes.map((route, index) => {
              const Page = route.component;
              return (
                <Route
                  key={index}
                  path={route.path}
                  element={
                    <LayoutDangNhap>
                      <Page />
                    </LayoutDangNhap>
                  }
                />
              );
            })}
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
