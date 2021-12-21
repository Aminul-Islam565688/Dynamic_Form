import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Button, Form } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { add_input_fields } from "../../redux/actions/formFiledsActions";
import "./LogicalDemoContent.css";

function LogicalDemoContent({ newFieldData }) {
  let { newFieldType } = newFieldData;

  const dispatch = useDispatch();

  let headline, detail, bottomDetail;

  if (newFieldType === "text") {
    headline = "Short Answer";
    detail =
      "Use this for short text answers. Add an answer label or placeholder text for guidance.";
    bottomDetail = "";
  } else if (newFieldType === "textarea") {
    headline = "Long Answer";
    detail = "Use this for long form answers without character limits.";
    bottomDetail = "Tell us bit more";
  } else if (newFieldType === "number") {
    headline = "Long Answer";
    detail =
      "Use this is if you want a number as a response. Add a minimum and/or maximum number limit.";
    bottomDetail = "Number of Employees";
  } else if (newFieldType === "email") {
    headline = "Email";
    detail =
      "Use this to collect correctly formatted email addresses as answers. If someone tries to add text in the wrong format, they will have to try again.";
    bottomDetail = "info@abc.com";
  }

  return (
    <div className="logical-content ">
      <div className="top-content">
        <div className="block-left">
          <h5>{headline}</h5>
          <p>{detail}</p>
        </div>
        <div className="block-right">
          <Button variant="primary" onClick={() => dispatch(add_input_fields(newFieldData))}>
            Insert <FontAwesomeIcon icon={["fas", "arrow-right"]} />
          </Button>
        </div>
      </div>

      <div className="bottom-content">
        <h6 className="text-capitalize">{newFieldType} Field Example</h6>

        {newFieldType === "textarea" ? (
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Control
              as="textarea"
              rows={3}
              disabled
              placeholder="Placeholder goes here"
            />
            <Form.Text className="text-muted">{bottomDetail}</Form.Text>
          </Form.Group>
        ) : (
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Control
              type={newFieldType}
              placeholder="Placeholder goes here"
              disabled
            />
            <Form.Text className="text-muted">{bottomDetail}</Form.Text>
          </Form.Group>
        )}
      </div>
    </div>
  );
}

export default LogicalDemoContent;
