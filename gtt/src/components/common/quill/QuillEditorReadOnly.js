import React, {forwardRef, useMemo} from "react";
import ReactQuill from "react-quill";
import {Card} from "@material-tailwind/react";


const formats = [
    'font',
    'header',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'list',
    'bullet',
    'indent',
    'link',
    'image',
    'color',
    'background',
    'align',
    'size',
    'code-block',
    'height',
    'width'
];

const QuilEditorReadOnly = forwardRef(({ value, onChange }, ref) => {
    const modules =  {
        toolbar:false,
    };

const quill = useMemo(() => {
    return (
        <ReactQuill
            className="w-full h-[100%]"
            ref={ref}
            modules={modules}
            formats={formats}
            value={value||""}
            readOnly={true}
            disable={true}
        />
    );
}, [value]);

return <Card>{quill}</Card>;
})

export default QuilEditorReadOnly;
