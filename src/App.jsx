import { BrowserRouter, Route, Routes } from "react-router";
import ProtectedRoute from "./protectedRoute/ProtectedRoute";
import AlreadyLoggedInRedirect from "./protectedRoute/AlreadyLoggedInRedirect";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import Settings from "./pages/Settings";
import Quotes from "./pages/Quotes";
import Admin from "./pages/Admin";
import Home from "./layouts/Home";
import Terms from "./layouts/Terms";
import Privacy from "./layouts/Privacy";
import AppLayout from "./layouts/AppLayout";
import "./App.css";
import RequireAdmin from "./protectedRoute/RequireAdmin";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/terms" element={<Terms />} />
        <Route exact path="/privacy" element={<Privacy />} />
        <Route
          exact
          path="/auth"
          element={
            <AlreadyLoggedInRedirect>
              <Auth />
            </AlreadyLoggedInRedirect>
          }
        />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <AppLayout>
                <Dashboard />
              </AppLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/settings"
          element={
            <ProtectedRoute>
              <AppLayout>
                <Settings />
              </AppLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/quotes"
          element={
            <ProtectedRoute>
              <AppLayout>
                <Quotes mode="create"/>
              </AppLayout>
            </ProtectedRoute>
          }
        />
         <Route
          path="/quote/edit/:id"
          element={
            <ProtectedRoute>
              <AppLayout>
                <Quotes mode="edit"/>
              </AppLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <RequireAdmin>
              <AppLayout>
                <Admin/>
              </AppLayout>
              </RequireAdmin>
            </ProtectedRoute>
          }
        />
        <Route path="/404" element={<h1>404 Not Found</h1>} />
        <Route path="*" element={<h1>Page Not Found</h1>} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
