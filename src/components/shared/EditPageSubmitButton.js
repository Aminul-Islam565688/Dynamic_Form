import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Tippy from "@tippyjs/react";
import React from "react";
import { Button, Form, Row } from "react-bootstrap";
import { useDispatch } from "react-redux";
import "tippy.js/animations/shift-toward.css";
import "tippy.js/dist/tippy.css"; // optional
import "tippy.js/themes/light.css";
import { update_placeholder } from "../../redux/actions/formFiledsActions";

function EditPageSubmitButton({ btnInfo }) {

  const dispatch = useDispatch()

  return (
    <Row className="single-input-area mb-3">
      <div className="col-lg-2 action-buttons">
        <Tippy
          trigger={"click"}
          hideOnClick={true}
          animation={"shift-toward"}
          theme={"light"}
          placement={"bottom"}
          content={
            <div className="button-input-field">
              <Form.Control
                type="btnInfo"
                value={btnInfo.placeholder}
                onChange={(e) =>
                  dispatch(update_placeholder({ placeholder: e.target.value, index: btnInfo.index }))
                }
              />
            </div>
          }
          interactive={true}
        >
          <Button variant="light">
            <FontAwesomeIcon icon={["fas", "cog"]} />
          </Button>
        </Tippy>
      </div>
      <div className="col-lg-10">
        <Tippy
          trigger={"click"}
          hideOnClick={true}
          animation={"shift-toward"}
          theme={"light"}
          placement={"bottom"}
          content={
            <div className="button-input-field">
              <Form.Control
                type="btnInfo"
                value={btnInfo.placeholder}
                onChange={(e) =>
                  dispatch(update_placeholder({ placeholder: e.target.value, index: btnInfo.index }))
                }
              />
            </div>
          }
          interactive={true}

        >
          <Button variant="dark">
            <span>{btnInfo.placeholder} </span>{" "}
            <FontAwesomeIcon icon={["fas", "angle-right"]} />
          </Button>
        </Tippy>
      </div>
    </Row>
  );
}

export default EditPageSubmitButton;
