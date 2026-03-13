import { AuthenticateWithRedirectCallback } from "@clerk/clerk-react";

const SsoCallback = () => {
  return (
    <AuthenticateWithRedirectCallback
      afterSignInUrl="/dashboard"
      afterSignUpUrl="/dashboard"
    />
  );
};

export default SsoCallback;