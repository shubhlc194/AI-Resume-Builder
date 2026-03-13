import { AuthenticateWithRedirectCallback } from "@clerk/clerk-react";

const SsoCallback = () => {
  return (
    <AuthenticateWithRedirectCallback
      fallbackRedirectUrl="/dashboard"
      signUpFallbackRedirectUrl="/dashboard"
    />
  );
};

export default SsoCallback;