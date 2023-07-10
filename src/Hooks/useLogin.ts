import { useState } from "react";

/**
 * 管理全局登录状态
 * @returns [login, setLogin]: login-是否登录，setLogin-设置登录状态
 */
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
