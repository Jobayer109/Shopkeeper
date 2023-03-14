import React from "react";
import Alert from "react-bootstrap/Alert";
import { Link } from "react-router-dom";
const MessageBox = (props) => {
  return (
    <div>
      {" "}
      <Alert style={{ textAlign: "center" }} variant={props.variant || "info"}>
        {props.children}
      </Alert>
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <Link to="/">
          <button style={{ paddingLeft: "50px", paddingRight: "50px" }}>Back to Home</button>
        </Link>
      </div>
    </div>
  );
};

export default MessageBox;
