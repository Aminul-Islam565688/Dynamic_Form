import React from "react";
import { Button, Container } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./ImagePreview.css";
function ImagePreview({ prevModal, cover, logo, handleUploadOpen, setPreviewModal }) {
  return (
    <>
      {cover && (
        <div className="cover-area">
          <img src={cover} alt="cover" />}
          <div className="action-button">
            {prevModal ? (
              <Button onClick={() => setPreviewModal(false)}>
                <FontAwesomeIcon icon={["fas", "edit"]} /> Back to Edit
              </Button>
            ) : (
              <Button
                variant="light"
                onClick={() => handleUploadOpen("cover photo")}
              >
                <FontAwesomeIcon icon={["fas", "cloud-upload-alt"]} /> Change
                Cover
              </Button>
            )}
          </div>
        </div>
      )}
      <Container className="logo-container">
        <div className="col-lg-8 mx-auto">
          <div
            className="logo-area"
            onClick={() => handleUploadOpen("logo")}
            title="change logo"
          >
            {logo && <img src={logo} alt="logo" />}
          </div>
        </div>
      </Container>
    </>
  );
}

export default ImagePreview;
