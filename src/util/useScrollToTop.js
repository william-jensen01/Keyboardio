import { useEffect } from "react";
import { useLocation, useHistory } from "react-router-dom";

export function useScrollToTop() {
  const history = useHistory();
  const location = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [history, location]);
}
