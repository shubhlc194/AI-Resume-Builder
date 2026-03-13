import { SignIn, useUser } from "@clerk/clerk-react";
import { Navigate } from "react-router-dom";

const SignInPage = () => {
  const { isSignedIn, isLoaded } = useUser();

  if (isLoaded && isSignedIn) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-violet-50">
      <div className="w-full max-w-md p-6 rounded-2xl bg-white shadow-xl border border-gray-200">
        <h1 className="text-2xl font-bold text-gray-900 text-center mb-2">
          Welcome Back
        </h1>
        <p className="text-sm text-gray-500 text-center mb-6">
          Sign in to continue building your AI-powered resume
        </p>
        <SignIn
          routing="hash"
          fallbackRedirectUrl="/dashboard"
          signUpFallbackRedirectUrl="/dashboard"
        />
      </div>
    </div>
  );
};

export default SignInPage;