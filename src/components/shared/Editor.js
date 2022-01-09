import BalloonEditor from '@ckeditor/ckeditor5-build-balloon-block';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import React from 'react';

const Editor = () => {
    return (
        <div>
            <CKEditor
                style={{ overflowX: 'unset' }}
                editor={BalloonEditor}
                data="<h1>Hello from CKEditor 5!
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptas eos ad ullam neque suscipit officia, quas, eius facere laborum, saepe ipsam fugit corporis hic. Quas voluptatum dicta quasi officia itaque voluptatem ex unde odio? Eum, optio. Deleniti commodi beatae vel!
            </h1>"
                onReady={editor => {
                    // You can store the "editor" and use when it is needed.
                    console.log('Editor is ready to use!', editor);
                }}
                onChange={(event, editor) => {
                    const data = editor.getData();
                    console.log({ event, editor, data });
                }}
                onBlur={(event, editor) => {
                    console.log('Blur.', editor);
                }}
                onFocus={(event, editor) => {
                    console.log('Focus.', editor);
                }}
            />
        </div>
    );
};

export default Editor;

