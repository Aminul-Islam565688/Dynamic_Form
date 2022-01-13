import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { v4 as uuidv4 } from "uuid";
import { add_new_page } from '../redux/actions/formFiledsActions';
import "./Navigation.css";
function Navigation({ addNewPage, preview, handleUploadOpen, otherPage }) {

  const [formId, setFormId] = useState(uuidv4);
  const [shareLink, setShareLink] = useState('');

  const formFields = useSelector(state => state.formFields);
  const dispatch = useDispatch();

  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  }

  const { id } = useParams();

  let navigate = useNavigate();

  const toastifyDesign = {
    position: "bottom-right",
    autoClose: 5000,
    hideProgressBar: true,
    newestOnTop: false,
    closeOnClick: true,
    rtl: false,
    pauseOnFocusLoss: true,
    draggable: true,
    theme: 'colored',
    pauseOnHover: true
  }


  const fromPublish = () => {
    const id = toast.loading("Please wait...", toastifyDesign)
    axios.post(`${process.env.REACT_APP_SERVER_LINK}/form_publish/${id}`, formFields, config)
      .then(res => {
        console.log(res.data.form_link);
        setShareLink(res.data.form_link);
        toast.update(id, {
          render: "Success! Now you can share link", type: "success", isLoading: false, toastifyDesign
        });
      })
      .catch(err => {
        console.log(err)
        toast.update(id, {
          render: "Try Again", type: "error", isLoading: false, toastifyDesign
        });
      })
  }


  const ShareLink = () => {
    navigator.clipboard.writeText(shareLink);
  }

  const notify = () => toast.success('Shared Link Copied to Clipboard!', toastifyDesign);

  // now it's in x-aminulislam-x repository

  return (
    <>
      <header className="header-area container-fluid">
        <div className="header-left" onClick={() => navigate('/')}>Automo</div>


        <div className="header-middle">
          <ul>
            {!otherPage ? (
              <>
                <li>
                  <FontAwesomeIcon icon={["fas", "plus"]} />
                  <span>Insert</span>
                </li>

                <li onClick={() => dispatch(add_new_page())}>
                  <FontAwesomeIcon icon={["far", "file-alt"]} />
                  <span>New Page</span>
                </li>

                <li onClick={() => handleUploadOpen("logo")}>
                  <FontAwesomeIcon icon={["fab", "pied-piper"]} />
                  <span>Logo</span>
                </li>

                <li onClick={() => handleUploadOpen("cover photo")}>
                  <FontAwesomeIcon icon={["far", "image"]} />
                  <span>Cover</span>
                </li>

                <li onClick={preview}>
                  <FontAwesomeIcon icon={["far", "eye"]} />
                  <span>Preview</span>
                </li>

                <li onClick={fromPublish}>
                  <FontAwesomeIcon icon={["far", "paper-plane"]} />
                  <span>Publish</span>
                </li>

                <li onClick={() => { ShareLink(); notify() }} >
                  <FontAwesomeIcon icon={["fas", "share-alt"]} />
                  <span>Share</span>
                </li>

                <li>
                  <FontAwesomeIcon icon={["fas", "cog"]} />
                  <span>Settings</span>
                </li>
              </>
            ) : (
              <>
                <li onClick={() => navigate(`/form/${formId}`)}>
                  <FontAwesomeIcon icon={["fas", "plus"]} />
                  <span>Create Form</span>
                </li>

                <li onClick={() => navigate(`/drag-and-drop`)}>
                  <FontAwesomeIcon icon={["fas", "grip-vertical"]} />
                  <span>Drag and Drop</span>
                </li>

                <li onClick={() => navigate(`/login`)}>
                  <FontAwesomeIcon icon={["fas", "lock"]} />
                  <span>Login</span>
                </li>

                <li onClick={() => navigate(`/registration`)}>
                  <FontAwesomeIcon icon={["far", "clipboard"]} />
                  <span>Sign up</span>
                </li>
              </>
            )}
          </ul>
        </div>

        <div className="header-right">
          <span>
            <Link to="/"> <FontAwesomeIcon icon={["fas", "th-large"]} /> Event Manage</Link>
          </span>
          <FontAwesomeIcon icon={["fas", "user-circle"]} />
        </div>
      </header >
      <ToastContainer />
    </>
  );
}

export default Navigation;
