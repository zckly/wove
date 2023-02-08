import { useEffect } from "react";
import { type NextPage } from "next";
import { useRouter } from "next/router";
import { signOut, useSession } from "next-auth/react";

import { env } from "~/env.mjs";

const Success: NextPage = () => {
  const { status } = useSession();
  const router = useRouter();

  useEffect(() => {
    const query = router.query;

    if (query.success === "true") {
      // pass down message to extension
      chrome.runtime.sendMessage(
        env.NEXT_PUBLIC_EXTENSION_ID,
        { action: "signout" },
        (_res: { success: boolean }) => {
          // do something with response
          setTimeout(() => close(), 1000);
        },
      );
    }
  }, [router]);

  return (
    <div className="flex flex-col mx-auto max-w-lg items-center justify-center h-screen">
      <p>Are you sure you&apos;d like to sign out?</p>
      <button
        className="border border-gray-300 rounded-md px-4 py-2 mt-4 cursor-pointer"
        onClick={() =>
          void signOut({ callbackUrl: "/ext-auth/signout?success=true" })
        }
      >
        Sign Out
      </button>
    </div>
  );
};
export default Success;
