import * as Linking from "expo-linking";
import { useEffect, useState } from "react";

const handleDeepLink = ({ url }) => {
  const data = Linking.parse(url);
  const appUrlScheme = "picpurge";

  // Only try opening app when not already on app url
  if (data.scheme !== appUrlScheme) {
    const urlSearchParams = new URLSearchParams();
    for (const [key, val] of Object.entries(data.queryParams)) {
      if (typeof val === "string") urlSearchParams.append(key, val);
    }
    const appUrl = `${appUrlScheme}://${urlSearchParams.size ? `?${urlSearchParams.toString()}` : ""}`;
    Linking.openURL(appUrl);
  }
};

const useDeeplink = () => {
  const [hadDeepLinkPrompt, setHadDeeplinkPrompt] = useState(false);
  useEffect(() => {
    if (!hadDeepLinkPrompt) {
      setHadDeeplinkPrompt(true);
      // If url opened directly
      Linking.getInitialURL().then((url) => {
        if (url) {
          handleDeepLink({ url });
        }
      });

      // When url changes
      const deepLinkingEvent = Linking.addEventListener("url", handleDeepLink);
      return () => {
        deepLinkingEvent.remove();
      };
    }
  }, [hadDeepLinkPrompt]);
};

export default useDeeplink;
