import { SignIn } from "@clerk/clerk-react";

const SignInPage = () => {
  return (
    <SignIn
      routing="path"
      path="/auth/sign-in"
      signUpUrl="/auth/sign-up"
      redirectUrl="/"
    />
  );
};

export default SignInPage;
