import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { Button, Container, Form, InputGroup, Modal } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import Thankyou from "../../shared/Thankyou";



const SharedLink = () => {

    const [formName, setFormName] = useState("ajk tor ekdin k amer ekdin");


    const { fields } = useSelector(state => state.formFields);

    console.log(fields)

    const [previewData, setPreviewData] = useState([]);
    const [previewFieldData, setPreviewFieldData] = useState();


    const preview = () => {
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
            console.log("Button", previewData);
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
        console.log("##### Form Final Value :: ", oldData);
    };



    return (
        <>
            <Modal
                show={true}
                // onHide={() => setPreviewModal(false)}
                dialogClassName="modal-100w"
                aria-labelledby="example-custom-modal-styling-title"
            >
                {/* {!cover && (
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
                /> */}
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
        </>
    );
};

export default SharedLink;