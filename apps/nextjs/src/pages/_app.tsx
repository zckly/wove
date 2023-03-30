import type { AppType } from "next/app";
import { Inter } from "@next/font/google";
import clsx from "clsx";
import type { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "react-hot-toast";

import { api } from "~/utils/api";
import { OnboardingWrapper } from "~/context/onboarding";
import "../styles/globals.css";

const inter = Inter({ subsets: ["latin"] });

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <OnboardingWrapper>
        <div
          className={clsx(
            "h-full scroll-smooth font-sans antialiased",
            inter.className,
          )}
        >
          <Toaster />

          <Component {...pageProps} />
        </div>
      </OnboardingWrapper>
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
