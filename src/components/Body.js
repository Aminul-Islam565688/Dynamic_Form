import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { useState } from "react";
import {
  Button,
  Container,
  Form,
  InputGroup,
  Modal
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  useParams
} from "react-router-dom";
import { delete_page } from "../redux/actions/formFiledsActions";
import "./Body.css";
import Navigation from "./Navigation";
import EditInputFields from "./shared/EditInputFields";
import Editor from "./shared/Editor";
import ImagePreview from "./shared/ImagePreview";
import ModalAdd from "./shared/ModalAdd";
import Thankyou from "./shared/Thankyou";
import UploadModal from "./shared/UploadModal";



function Body() {
  //console.log(uuidv4());
  const [formName, setFormName] = useState("Add Title");
  // const [fields, setFields] = useState([
  //   {
  //     id: uuidv4(),
  //     page: 1,
  //     type: "button",
  //     placeholder: "Button Page 1",
  //     name: uuidv4(),
  //   },
  // ]);

  const { id } = useParams();

  const dispatch = useDispatch();

  const { fields, totalPage } = useSelector(state => state.formFields);



  // Modal Photo Upload states
  const [cover, setCover] = useState("");
  const [logo, setLogo] = useState("");
  const [uploadStatus, setUploadStatus] = useState(false);
  const [uploadType, setUploadType] = useState("");
  const [uploadShow, setUploadShow] = useState(false);
  const handleUploadClose = () => setUploadShow(false);
  const handleUploadOpen = (type) => {
    setUploadShow(true);
    setUploadType(type);
  };



  // Image Upload function -- imgbb api
  const uploadImage = (e, type) => {
    setUploadStatus(true);
    const dt = new FormData();
    dt.append("image", e.target.files[0], e.target.files[0].name);
    axios
      .post(
        `https://api.imgbb.com/1/upload?expiration=600&key=b6726303b7e16dab66939c35da72d0d4`,
        dt
      )
      .then((res) => {
        if (res) {
          setUploadShow(false);
          type === "logo"
            ? setLogo(res.data.data.display_url)
            : setCover(res.data.data.display_url);
          setUploadStatus(false);
        }
      });
  };



  // Modal Add Fields
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const [modalData, setModalData] = useState({
    currentPage: "",
    prevIndex: "",
    prevFieldType: "",
    newFieldType: "",
  });
  //End Modal related code

  // Preview Modal State
  const [previewModal, setPreviewModal] = useState(false);
  // Preview Modal ends

  //Set preview single steps fields
  const [previewFieldData, setPreviewFieldData] = useState();



  //preview Modal
  //Single Step Data
  const [previewData, setPreviewData] = useState([]);
  const preview = () => {
    setPreviewModal(true); //Modal
    let i = -1;
    let currentPage = 1;
    const cloneAndModifyFields = fields
      .filter((dt) => dt.type !== "button")
      .map((dt, index) => {
        if (dt.page > currentPage) {
          currentPage = dt.page;
          i = -1;
        }
        i++;
        return { id: "" + dt.page + i, placeholder: dt.placeholder, value: "" };
      });
    setPreviewFieldData(cloneAndModifyFields);
    const filteredData = fields.filter((dt) => dt.page === 1); //Filter
    setPreviewData(filteredData && filteredData); //State Update
  };



  //For Next and Prev button
  const handleNextPreviewSteps = (step) => {
    let nextPage = fields.find((dt) => dt.page > step); //Next Page
    if (nextPage) {
      let filteredData = fields.filter((dt) => dt.page === nextPage.page);
      setPreviewData(filteredData);
    } else {
      setPreviewData("");
    }
  };



  //Haandle preview fields data [[[Final Data of preview]]]
  const handlePreviewField = (e, index, page) => {
    const id = "" + page + index;
    let oldData = [...previewFieldData];
    const objIndex = oldData.findIndex((dt) => dt.id === id);
    oldData[objIndex].value = e.target.value;
    setPreviewFieldData(oldData);
  };



  // Add New Page functionality
  // const [totalPage, setTotalPage] = useState(1);
  // const addNewPage = () => {
  //   let oldFields = [...fields];
  //   //Generating New Page Number
  //   const currentPage = fields[fields.length - 1].page + 1;
  //   const newPageBtn = {
  //     id: uuidv4(),
  //     page: currentPage,
  //     type: "button",
  //     placeholder: "Next Page",
  //     name: uuidv4(),
  //   };
  //   oldFields.push(newPageBtn);
  //   setFields(oldFields);
  //   setTotalPage(currentPage);
  // };


  // Page Remove functionality
  // const removePage = (pageNumber) => {
  //   const keepFields = fields.filter((dt) => dt.page !== pageNumber);
  //   setFields(keepFields);
  //   setTotalPage(totalPage - 1);
  //   console.log("after removal", fields);
  // };



  //Single field removal functionality
  // const removeFieldItem = (index) => {
  //   console.log("remove index number", index);
  //   let oldFields = [...fields];
  //   oldFields.splice(index, 1);
  //   setFields(oldFields);
  // };



  //Open Modal and Passing Current (clicked) Field object
  const handleModal = (allInfo) => {
    setModalData(allInfo);
    setShow(true);
  };



  //Update Placeholder and Button Name
  // const updatePlaceholder = (placeholder, index) => {
  //   console.log("changing field", placeholder, index);
  //   let oldFields = [...fields];
  //   oldFields[index].placeholder = placeholder;
  //   setFields(oldFields);
  // };



  //Add New Input Field functionality
  // const addInputField = (newFieldData) => {
  //   setShow(false); //modal hiding
  //   const { page, type, index, newFieldType } = newFieldData;
  //   let oldFields = [...fields];

  //   //New Field Object
  //   let newFieldObj = {
  //     id: uuidv4(),
  //     page: page,
  //     type: newFieldType,
  //     placeholder: "Add placeholder here",
  //     name: uuidv4(),
  //   };

  //   if (type === "button") {
  //     oldFields.splice(index, 0, newFieldObj);
  //   } else {
  //     oldFields.splice(index + 1, 0, newFieldObj);
  //   }
  //   setFields(oldFields);
  //   console.log("all fields", oldFields);
  // };



  //Showing All Fields from fields Array
  const showFields = () => {
    let i = 1; //Page counter
    return fields.map((dt, index) => {
      return (
        <div key={dt.id}>
          <EditInputFields
            allInfo={{ ...dt, index: index }}
            handleModal={handleModal}
          // updatePlaceholder={updatePlaceholder}
          />
          {dt.type === "button" && totalPage > i && (
            <div className="page-devider">
              <Button
                variant="dark"
                onClick={() => dispatch(delete_page(fields[index + 1].page))}
              >
                <FontAwesomeIcon icon={["far", "trash-alt"]} />
              </Button>
              {/* Page devider */}
              <div className="horizontal-line-area">
                <div></div>
                <div>Page {++i}</div>
                <div></div>
              </div>
            </div>
          )}
        </div>
      );
    });
  };



  return (
    <>
      <Navigation
        preview={preview}
        handleUploadOpen={handleUploadOpen}
      />
      <ImagePreview
        cover={cover}
        logo={logo}
        handleUploadOpen={handleUploadOpen}
      />
      <Container>
        <div className="col-lg-8 mx-auto">
          {/* Form Title */}
          <div className="col-lg-10 offset-md-2">
            {/* <CkEditor setFormName={setFormName}></CkEditor> */}
            <Editor />
          </div>
          {showFields()}
        </div>

        {/* Modal for Field Insert */}
        <ModalAdd
          show={show}
          setShow={setShow}
          onHide={() => setShow(false)}
          handleClose={handleClose}
          modalData={modalData}
        />

        <UploadModal
          uploadShow={uploadShow}
          onHide={() => setUploadShow(false)}
          handleUploadClose={handleUploadClose}
          uploadType={uploadType}
          uploadImage={uploadImage}
          uploadStatus={uploadStatus}
        />

        {/* Preview Modal */}
        <Modal
          show={previewModal}
          onHide={() => setPreviewModal(false)}
          dialogClassName="modal-100w"
          aria-labelledby="example-custom-modal-styling-title"
        >
          {!cover && (
            <Modal.Header>
              <h2>Preview</h2>{" "}
              <Button onClick={() => setPreviewModal(false)}>
                <FontAwesomeIcon icon={["fas", "edit"]} /> Back to Edit
              </Button>
            </Modal.Header>
          )}

          <ImagePreview
            cover={cover}
            logo={logo}
            handleUploadOpen={handleUploadOpen}
            setPreviewModal={setPreviewModal}
            prevModal
          />
          <Modal.Body className="preview-body">
            <Container>
              <div className="col-lg-8 mx-auto poreview-form-holder">
                {previewData && (
                  <div
                    className="preview-form-title"
                    dangerouslySetInnerHTML={{ __html: formName }}
                  ></div>
                )}
                <form>
                  {previewData ? (
                    previewData.map((dt, index) => {
                      if (dt.type === "button") {
                        return (
                          <Button
                            variant="dark"
                            name={dt.name}
                            key={dt.id}
                            onClick={() => handleNextPreviewSteps(dt.page)}
                          >
                            {dt.placeholder}
                          </Button>
                        );
                      }
                      if (dt.type === "textarea") {
                        return (
                          <Form.Group className="mb-3" key={dt.id}>
                            <InputGroup>
                              <InputGroup.Text>
                                <FontAwesomeIcon
                                  icon={["fas", "align-justify"]}
                                />
                              </InputGroup.Text>
                              <Form.Control
                                as="textarea"
                                name={dt.name}
                                type={dt.type}
                                rows={3}
                                placeholder={dt.placeholder}
                                id={dt.id}
                                onBlur={(e) =>
                                  handlePreviewField(e, index, dt.page)
                                }
                              />
                            </InputGroup>
                          </Form.Group>
                        );
                      } else {
                        return (
                          <Form.Group className="mb-3" key={dt.id}>
                            <InputGroup>
                              <InputGroup.Text>
                                {dt.type === "text" ? (
                                  <FontAwesomeIcon
                                    icon={["fas", "align-left"]}
                                  />
                                ) : dt.type === "number" ? (
                                  <FontAwesomeIcon icon={["fas", "phone"]} />
                                ) : (
                                  <FontAwesomeIcon icon={["fas", "at"]} />
                                )}
                              </InputGroup.Text>
                              <Form.Control
                                placeholder={dt.placeholder}
                                id={dt.id}
                                name={dt.id}
                                type={dt.type}
                                onBlur={(e) =>
                                  handlePreviewField(e, index, dt.page)
                                }
                              />
                            </InputGroup>
                          </Form.Group>
                        );
                      }
                    })
                  ) : (
                    <Thankyou />
                  )}
                </form>
              </div>
            </Container>
          </Modal.Body>
        </Modal>
      </Container>
    </>
  );
}

export default Body;
