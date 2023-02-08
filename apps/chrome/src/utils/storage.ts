import { Storage } from "@plasmohq/storage";

export const storage = new Storage();

export const getStorageToken = async () => {
  const token = await storage.get("accessToken");
  if (typeof token === "string") {
    return { token, status: "success" } as const;
  }
  return { token: null, status: "error" } as const;
};
