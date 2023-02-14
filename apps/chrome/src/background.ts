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

// eslint-disable-next-line @typescript-eslint/no-misused-promises
chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
  if (tab.active && !("audible" in changeInfo) && changeInfo.title) {
    console.log("[Plasmo Background Script]: Tab updated: ", {
      tabId,
      changeInfo,
      tab,
    });

    // Get access token
    const storageValue = await storage.get<unknown>("accessToken");

    // Check what site they're on

    // Youtube
    if (tab.url.includes("https://www.youtube.com/watch?v=")) {
      // TODO: Swap this out with env variable for ML API
      const response = await fetch(`http://localhost:8000/resource`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          url: tab.url || "",
          access_token: storageValue,
        }),
      });

      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const data = await response.json();
      console.log({ data });

      // chrome.scripting.executeScript(
      //   {
      //     target: {
      //       tabId, // the tab you want to inject into
      //     },
      //     world: "MAIN", // MAIN to access the window object
      //     func: () => {
      //       console.log("Background script injected into YT");

      //       const titleElem = document.querySelector(
      //         "h1.style-scope.ytd-watch-metadata",
      //       );
      //       console.log(titleElem?.textContent.trim());
      //     }, // function to inject
      //   },
      //   () => {
      //     console.log("Background script got callback after injection");
      //   },
      // );
    }
  }
});

// chrome.history.search({ text: "", maxResults: 10 }, function (data) {
//   data.forEach(function (page) {
//     console.log({ page });
//   });
// });
