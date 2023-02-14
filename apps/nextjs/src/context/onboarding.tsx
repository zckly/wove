/* eslint-disable @typescript-eslint/no-unsafe-return */
import { createContext, useContext, useEffect, useState } from "react";

import { getLocalStorage, setLocalStorage } from "~/utils/helpers/localStorage";

/*
 * This is a custom context that is used to share data between components used in the Onboarding.
 */

/*
 * Curriculum store
 */

export type OnboardingContent = {
  firstName: string;
  setFirstName: (firstName: string) => void;
  email: string;
  setEmail: (email: string) => void;

  goal: string;
  setGoal: (goal: string) => void;
};

const OnboardingContext = createContext<OnboardingContent>({
  firstName: "",
  setFirstName: () => undefined,
  email: "",
  setEmail: () => undefined,
  goal: "",
  setGoal: () => undefined,
});

export function OnboardingWrapper({ children }: { children: React.ReactNode }) {
  const [firstName, setFirstName] = useState<string>(() =>
    getLocalStorage("firstName", ""),
  );
  const [email, setEmail] = useState<string>(() =>
    getLocalStorage("email", ""),
  );
  const [goal, setGoal] = useState<string>(() => getLocalStorage("goal", ""));

  useEffect(() => {
    setLocalStorage("firstName", firstName);
  }, [firstName]);

  useEffect(() => {
    setLocalStorage("email", email);
  }, [email]);

  useEffect(() => {
    setLocalStorage("goal", goal);
  }, [goal]);

  const sharedState: OnboardingContent = {
    firstName,
    setFirstName,
    email,
    setEmail,
    goal,
    setGoal,
  };
  return (
    <OnboardingContext.Provider value={sharedState}>
      {children}
    </OnboardingContext.Provider>
  );
}

export function useOnboardingContext() {
  return useContext(OnboardingContext);
}
