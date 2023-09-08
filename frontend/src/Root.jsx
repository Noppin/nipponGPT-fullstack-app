import { Routes, Route } from "react-router-dom";
import { Signup, Dashboard, ErrorPage, Home } from "./components";
import ProtectedRoute from "./ProtectedRoute";
export default function Root() {
  return (
    <Routes>
      <Route path="/" element={<Home />}>
        <Route
          index
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
      </Route>
      <Route path="*" element={<ErrorPage />} />
      <Route path="/signup" element={<Signup />} />
    </Routes>
  );
}
