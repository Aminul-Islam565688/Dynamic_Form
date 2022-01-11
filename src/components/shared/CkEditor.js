import BlockEditor from "@ckeditor/ckeditor5-build-balloon-block";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import React, { useState } from "react";

const CkEditor = ({ setFormName }) => {

  const [formTitle, setFormTitle] = useState('Add Title')

  return (
    <div className="p-4">
      <CKEditor
        editor={BlockEditor}
        // data="<p>Hello from CKEditor 5!</p>"
        data={`<h2>${formTitle}</h2>`}
        onReady={(editor) => {
          // You can store the "editor" and use when it is needed.
          console.log("Editor is ready to use!", editor);
        }}
        onChange={(event, editor) => {
          const data = editor.getData();
          setFormName(data);
          console.log("changing", { event, editor, data });
        }}
        onBlur={(event, editor) => {
          console.log("Blur.", editor);
        }}
        onFocus={(event, editor) => {
          console.log("Focus.", editor);
        }}
      />
    </div>
  );
};


export default CkEditor;