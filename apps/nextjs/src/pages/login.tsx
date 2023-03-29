import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import * as EmailValidator from "email-validator";
import { signIn, useSession } from "next-auth/react";
import toast from "react-hot-toast";

import AuthLayout from "~/components/layouts/AuthLayout";
import { useOnboardingContext } from "~/context/onboarding";

export default function LoginPage() {
  const { status } = useSession();
  const router = useRouter();
  const { error } = router.query;
  const { setEmail } = useOnboardingContext();
  const [emailInput, setEmailInput] = useState("");

  useEffect(() => {
    console.log({ error });
    if (error === "OAuthAccountNotLinked") {
      toast.error(
        "Looks like you already have an account with us - please sign in with the same account you used to sign up.",
      );
    }
  }, [error]);

  if (status === "authenticated") {
    void router.push("/app");
    return;
  } else if (status === "loading") {
    return <div>Loading...</div>;
  }
  return (
    <AuthLayout
      mode="login"
      emailInput={emailInput}
      setEmailInput={setEmailInput}
      onGoogleSignIn={onGoogleSignIn}
      onDiscordSignIn={onDiscordSignIn}
      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      onEmailSignIn={onEmailSignIn}
    />
  );

  function onGoogleSignIn() {
    signIn("google").catch((error) => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
      toast.error(error.message);
    });
  }

  function onDiscordSignIn() {
    signIn("discord").catch((error) => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
      toast.error(error.message);
    });
  }

  async function onEmailSignIn() {
    if (!emailInput) {
      toast.error("Please enter your email");
      return;
    }
    // This might never even fire, but just in case
    if (!EmailValidator.validate(emailInput)) {
      toast.error("Please enter a valid email");
      return;
    }
    try {
      setEmail(emailInput);

      await signIn("email", { email: emailInput });
    } catch (error) {
      console.log({ error });
    }
  }
}
