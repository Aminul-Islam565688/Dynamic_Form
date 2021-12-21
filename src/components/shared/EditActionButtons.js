import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Button } from "react-bootstrap";
import { useDispatch } from 'react-redux';
import { delete_field_item } from '../../redux/actions/formFiledsActions';

function EditActionButtons({
  allInfo,
  addInputField,
  handleModal,
  isButton,
  removeFieldItem,
}) {

  const dispatch = useDispatch()

  return (
    <div className="col-lg-2 action-buttons">
      {!isButton && (
        <Button variant="light" onClick={() => dispatch(delete_field_item(allInfo.index))}>
          <FontAwesomeIcon icon={["far", "trash-alt"]} />
        </Button>
      )}

      <Button variant="light" onClick={() => handleModal(allInfo)}>
        <FontAwesomeIcon icon={["fas", "plus"]} />
      </Button>
      <Button variant="light">
        <FontAwesomeIcon icon={["fas", "grip-vertical"]} />
      </Button>
    </div>
  );
}

export default EditActionButtons;
