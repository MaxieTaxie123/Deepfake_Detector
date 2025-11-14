import { useEffect, useState } from "react";

export function useImagePreload(urls: string[]) {
  const [loaded, setLoaded] = useState<string[]>([]);
  const [failed, setFailed] = useState<string[]>([]);

  useEffect(() => {
    let isMounted = true;
    const loadImage = (url: string) => {
      const img = new Image();
      img.onload = () => {
        if (isMounted) {
          setLoaded((prev) => [...prev, url]);
          console.log(`Cached: ${url}`);
        }
      };
      img.onerror = () => {
        if (isMounted) {
          setFailed((prev) => [...prev, url]);
          console.warn(`Failed: ${url}`);
        }
      };
      img.src = url;
    };

    urls.forEach(loadImage);
    return () => {
      isMounted = false;
    };
  }, [urls]);

  return { loaded, failed };
}
