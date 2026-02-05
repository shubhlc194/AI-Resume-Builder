import { Button } from "@/components/ui/button";
import { useUser } from "@clerk/clerk-react";
import { useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import Header from "./components/custom/Header";

function App(){
  const { isLoaded, isSignedIn } = useUser();
  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  // 🔒 Not logged in → go to sign-in
  if (!isSignedIn) {
    return <Navigate to="/auth/sign-in" replace />;
  }

  // ✅ Logged in → show routes
  return (
    <>
    <Header/>
    <Outlet />;
    </>
  )
  
}

export default App;

