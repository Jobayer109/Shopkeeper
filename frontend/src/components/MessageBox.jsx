import React from "react";
import Alert from "react-bootstrap/Alert";
const MessageBox = (props) => {
  return (
    <div>
      {" "}
      <Alert style={{ textAlign: "center" }} variant={props.variant || "info"}>
        {props.children}
      </Alert>
      <div style={{ textAlign: "center", marginTop: "50px" }}></div>
    </div>
  );
};

export default MessageBox;
