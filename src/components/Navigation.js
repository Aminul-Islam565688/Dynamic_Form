import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { add_new_page } from '../redux/actions/formFiledsActions';
import "./Navigation.css";
function Navigation({ addNewPage, preview, handleUploadOpen, otherPage }) {

  const [formId, setFormId] = useState(uuidv4);
  const [shareLink, setShareLink] = useState('');

  const { fields } = useSelector(state => state.formFields);
  const dispatch = useDispatch();

  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  }

  const { id } = useParams();

  const fromPublish = () => {
    axios.post(`http://localhost:7000/form_publish/${id}`, fields, config)
      .then(res => {
        console.log(res.data.form_link);
        setShareLink(res.data.form_link);
      })
      .catch(err => console.log(err))
  }


  const ShareLink = () => {
    navigator.clipboard.writeText(shareLink);
    alert('Text copied');
  }

  let navigate = useNavigate();

  return (
    <header className="header-area container-fluid">
      <div className="header-left">Automo</div>

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

              <li onClick={ShareLink} >
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
              <li>
                <Link to={`/form/${formId}`}>
                  <FontAwesomeIcon icon={["fas", "plus"]} />
                  <span>Create Form</span>
                </Link>
              </li>

              <li>
                <Link to="/drag-and-drop">
                  <FontAwesomeIcon icon={["fas", "grip-vertical"]} />
                  <span>Drag and Drop</span>
                </Link>
              </li>

              <li>
                <Link to="/login">
                  <FontAwesomeIcon icon={["fas", "lock"]} />
                  <span>Login</span>
                </Link>
              </li>

              <li>
                <Link to="/registration">
                  <FontAwesomeIcon icon={["far", "clipboard"]} />
                  <span>Sign up</span>
                </Link>
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
  );
}

export default Navigation;
