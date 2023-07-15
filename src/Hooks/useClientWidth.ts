import _ from "lodash";
import { useEffect, useState } from "react";

function useClientWidth() {
  const [clientWidth, setClientWidth] = useState(window.innerWidth);

  useEffect(() => {
    const fn = _.debounce((width: number) => {
      console.log(width);
      setClientWidth(width);
    }, 100);
    window.addEventListener("resize", () => fn(window.innerWidth));
  }, []);

  return clientWidth;
}

export default useClientWidth;
