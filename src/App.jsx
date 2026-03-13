import { useUser } from "@clerk/clerk-react";
import { Navigate, Outlet } from "react-router-dom";
import Header from "./components/custom/Header";
import { Toaster } from "sonner";

function App() {
  const { isLoaded, isSignedIn } = useUser();

  console.log("App render - isLoaded:", isLoaded, "isSignedIn:", isSignedIn);

  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (!isSignedIn) {
    return <Navigate to="/auth/sign-in" replace />;
  }

  return (
    <>
      <Header />
      <Outlet />
      <Toaster />
    </>
  );
}

export default App;