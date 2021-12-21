import React from "react";
import "./UploadModal.css";
import { Modal } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function UploadModal({uploadStatus, uploadShow, handleUploadClose, uploadType,uploadImage }) {
    
  return (
    <>
      <Modal
        className="upload-modal"
        show={uploadShow}
        onHide={handleUploadClose}
        size="md"
        centered
      >
        <Modal.Header>
          <div className="d-flex justify-content-left align-items-center">
            <FontAwesomeIcon icon={["fas", "camera"]} />
            <h2>Upload {uploadType} </h2>
          </div>
          <button className="btn-close" onClick={handleUploadClose}></button>
        </Modal.Header>
        <Modal.Body className="modal-body-area">
          <div>
            
            <form
              id="frmImage"
              class="form-area"
              enctype="multipart/form-data"
              method="post"
            >
              <label class="img-label" id="img-label" for="image">
              <FontAwesomeIcon icon={["fas", "cloud-upload-alt"]} className={uploadStatus?'bouncing':''}/>
              </label>
              <input
                type="file"
                name="image"
                id="image"
                onChange={(e) => uploadImage(e,uploadType)}
              />
              
            </form>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default UploadModal;
