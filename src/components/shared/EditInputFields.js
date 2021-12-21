import React from "react";
import { Form, Row } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { update_placeholder } from "../../redux/actions/formFiledsActions";
import EditActionButtons from "./EditActionButtons";
import EditPageSubmitButton from "./EditPageSubmitButton";

function EditInputFields({
  allInfo,
  handleModal,
  addInputField,
  updatePlaceholder,
}) {
  const { type, placeholder, index } = allInfo;

  const dispatch = useDispatch();

  console.log(index)

  const filedFilter = () => {
    if (type === "textarea") {
      return (
        <Row className="single-input-area mb-3">
          <EditActionButtons
            allInfo={allInfo}
            handleModal={handleModal}
            addInputField={addInputField}
          />
          <div className="col-lg-10">
            <Form.Control
              as="textarea"
              rows={3}
              placeholder={placeholder}
              onChange={(e) => dispatch(update_placeholder({ placeholder: e.target.value, index: index }))}
            />
          </div>
        </Row>
      );
    } else if (type === "button") {
      return (
        <>
          <Row className="single-input-area mb-3">
            <EditActionButtons
              allInfo={allInfo}
              handleModal={handleModal}
              addInputField={addInputField}
              isButton
            />
          </Row>
          <EditPageSubmitButton
            btnInfo={allInfo}
          />
        </>
      );
    } else {
      let newType = "text";
      return (
        <Row className="single-input-area mb-3">
          <EditActionButtons
            allInfo={allInfo}
            handleModal={handleModal}
            addInputField={addInputField}
          />
          <div className="col-lg-10">
            <Form.Control
              type={newType}
              placeholder={placeholder}
              onChange={(e) => dispatch(update_placeholder({ placeholder: e.target.value, index: index }))}
            />
          </div>
        </Row>
      );
    }
  };
  return <>{filedFilter()}</>;
}

export default EditInputFields;
