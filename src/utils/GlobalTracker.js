
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { trackVisitor } from "./trackVisitors";

export default function GlobalTracker() {
  const location = useLocation();

  useEffect(() => {
    const page =
      location.pathname + location.search + location.hash;

    trackVisitor(page);
  }, [
    location.pathname,
    location.search,
    location.hash,
  ]);

  return null;
}
