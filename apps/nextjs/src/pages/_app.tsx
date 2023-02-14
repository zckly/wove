import type { AppType } from "next/app";
import type { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "react-hot-toast";

import { api } from "~/utils/api";
import { OnboardingWrapper } from "~/context/onboarding";
import "../styles/globals.css";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <OnboardingWrapper>
        <div className="h-full scroll-smooth font-sans antialiased">
          <Toaster />

          <Component {...pageProps} />
        </div>
      </OnboardingWrapper>
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
