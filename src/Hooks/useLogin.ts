import { useState } from "react";

function useLogin(): [boolean, (value: boolean) => void] {
  const [login, setLogin] = useState(false);

  // useEffect(() => {
  //   const token = localStorage.getItem("token");

  //   if (token) {
  //     setLogin(true);
  //   }
  // }, []);

  return [login, (value: boolean) => setLogin(value)];
}

export default useLogin;
