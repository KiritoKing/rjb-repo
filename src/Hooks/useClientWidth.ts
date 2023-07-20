import { XS_BREAKPOINT } from "@/Constants/responsive";
import _ from "lodash";
import { useEffect, useMemo, useState } from "react";

function useClientWidth(breakPoint = XS_BREAKPOINT) {
  const [clientWidth, setClientWidth] = useState(window.innerWidth);
  const isCollapsed = useMemo(
    () => clientWidth < breakPoint,
    [breakPoint, clientWidth]
  );

  useEffect(() => {
    const fn = _.debounce((width: number) => {
      // console.log(width);
      setClientWidth(width);
    }, 100);
    window.addEventListener("resize", () => fn(window.innerWidth));
  }, []);

  return [clientWidth, isCollapsed] as const;
}

export default useClientWidth;
