import { storage } from "./utils/storage";

const NEXTJS_URL = "http://localhost:3000";

type MessageRequest = {
  action: "signin" | "signout";
  accessToken: string;
};

chrome.runtime.onMessageExternal.addListener(
  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  async (request: MessageRequest, sender, sendResponse) => {
    console.log("[Plasmo Background Script]: Incoming request: ", {
      sender,
      request,
    });

    // Only allow the Next.js app to send requests
    if (sender.url?.includes(NEXTJS_URL) === false) return;

    switch (request.action) {
      case "signin": {
        const token = request.accessToken;
        // get out storage value, and see if it's the same as incoming
        const storageValue = await storage.get<unknown>("accessToken");
        if (typeof storageValue === "string" && storageValue === token) {
          sendResponse({ success: true });
          return;
        }

        // update storage w/ token and check if it worked
        await storage.set("accessToken", request.accessToken);
        const updatedAccessToken = await storage.get<unknown>("accessToken");
        sendResponse({ success: updatedAccessToken === token });
        break;
      }
      case "signout": {
        // reset chrome storage and check if it worked
        await storage.set("accessToken", null);
        const updated = await storage.get("accessToken");
        sendResponse({ success: updated === null });
        break;
      }
      default:
        console.error("[Plasmo Background Script]: Unknown action received");
    }
  },
);
