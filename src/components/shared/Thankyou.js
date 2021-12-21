import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Thankyou.css";
function Thankyou() {
  return (
    <div className="thankyou-area">
      <FontAwesomeIcon icon={["fas", "check"]} />
      <h3>Thanks for completing this form!</h3>
      <p>Create forms for all purposes in seconds.</p>
      <p>Without knowing how to code, and for free!</p>
      <a
        href="https://github.com/engrajibulhasan"
        rel="noreferrer"
        target="_blank"
        className="btn btn-secondary"
      >
        Try Automo
      </a>
    </div>
  );
}

export default Thankyou;
