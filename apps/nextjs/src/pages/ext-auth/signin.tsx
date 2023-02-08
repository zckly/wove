import { useEffect, useState } from "react";
import { type GetServerSideProps } from "next";
import { getToken } from "next-auth/jwt";

import { env } from "~/env.mjs";

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const sessionToken = await getToken({ req, raw: true });
  return { props: { accessToken: sessionToken } };
};

export default function AuthRedirect(props: { accessToken: string }) {
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  /**
   * This effect sends the accessToken to the extension,
   * awaits the response, and sets the state accordingly.
   */
  useEffect(() => {
    if (!props.accessToken) return;
    setIsLoading(true);

    chrome.runtime.sendMessage(
      env.NEXT_PUBLIC_EXTENSION_ID,
      { action: "signin", accessToken: props.accessToken },
      (res) => {
        setIsLoading(false);
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        if (res.success) {
          setIsSuccess(true);
          setTimeout(() => {
            close();
          }, 2000);
        } else {
          setIsError(true);
        }
      },
    );
  }, [props.accessToken]);

  return (
    <div className="flex h-screen items-center justify-center">
      <div>
        {isLoading ? (
          <div>Loading...</div>
        ) : isSuccess ? (
          <div>SignIn success, you can open the extension</div>
        ) : isError ? (
          <div>Something went wrong</div>
        ) : (
          <div>What are you doing here?</div>
        )}
      </div>
    </div>
  );
}
