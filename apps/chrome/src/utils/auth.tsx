import { createContext, useContext, useEffect, type ReactNode } from "react";
import { useStorage } from "@plasmohq/storage/hook";

import { storage } from "./storage";

export function signIn() {
  window.open(
    // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
    "http://localhost:3000/api/auth/signin?" +
      new URLSearchParams({
        callbackUrl: "http://localhost:3000/ext-auth/signin",
      }),
  );
}

export function signOut() {
  window.open("http://localhost:3000/ext-auth/signout");
}

type AuthContextType = {
  token: string;
};

export const AuthContext = createContext<AuthContextType | null>(null);

export const useSession = () => {
  const value = useContext(AuthContext);
  return value;
};

export const AuthProvider = (props: { children: ReactNode }) => {
  const [token] = useStorage<string>({ key: "accessToken", instance: storage });

  useEffect(() => {
    void storage.get("accessToken").then((token) => {
      console.log("token", token);
      // maybe validate token on the server
    });
  }, []);

  return (
    <AuthContext.Provider value={token ? { token } : null}>
      {props.children}
    </AuthContext.Provider>
  );
};
