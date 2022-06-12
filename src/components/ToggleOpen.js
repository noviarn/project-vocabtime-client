import React from "react";
import { BsList } from "react-icons/bs";

function ToggleOpen({ openSidebar }) {
  return (
    <div>
      <BsList className="stripMenu" onClick={openSidebar}></BsList>
    </div>
  );
}

export default ToggleOpen;
