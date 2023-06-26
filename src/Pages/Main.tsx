import { useState } from "react";

const Main = () => {
  const [open, setOpen] = useState(false);

  const wait = () => new Promise((resolve) => setTimeout(resolve, 1000));

  return <div>你妈</div>;
};

export default Main;
