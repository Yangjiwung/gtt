import React, {forwardRef, useEffect, useState, useMemo, memo} from "react";
import { Card } from "@material-tailwind/react";
import ReactQuill, {Quill} from "react-quill";
import "react-quill/dist/quill.snow.css";
import ImageResize from "quill-image-resize-module-react/src/ImageResize";
import QuillImageDropAndPaste from 'quill-image-drop-and-paste'
import {insertFiles} from "../../../api/filesApi";
import {API_SERVER_HOST} from "../../../api/filesApi";

Quill.register('modules/imageResize', ImageResize);
Quill.register('modules/imageDropAndPaste',QuillImageDropAndPaste)
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

const QuilEditor = memo(forwardRef(({ value, onChange }, ref) => {
    const [localValue, setLocalValue] = useState(value || "");
    const ImageHandler = ()=>{
        const input = document.createElement('input');
        input.setAttribute('type','file');
        input.setAttribute('accept','image/*');
        input.click();

        input.addEventListener('change',()=>{
            const file = input.files[0];
            if (!file) return;
            insertFiles(file).then(files => {
                const imageUrl = API_SERVER_HOST+"/api/files/" + files.at(0)
                console.log(files.at(0),imageUrl)
                const range = ref.current.getEditorSelection();
                ref.current.getEditor().insertEmbed(range.index, 'image', imageUrl)
                ref.current.getEditor().setSelection(range.index + 1);
            })
        })
    }
    const handleChange = (content, delta, source, editor) => {
        const deltaString = JSON.stringify(delta.ops);
        console.log(deltaString); // 에디터의 변경사항 로그 출력

        if (onChange) {
            onChange(content.ops);
        }
    };

    const modules = useMemo(()=>({
        toolbar: {
            container: [
                [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
                ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'},{'align':[]}],
                ['link', 'image', 'video'],
                ['clean'],
            ],
            handlers:{
                image:ImageHandler
            }
        },
        imageResize:{
            parchment: Quill.import('parchment'),
            modules: [ 'Resize', 'DisplaySize']
        },
        imageDropAndPaste:{
            handler:ImageHandler
        }
    }),[]);

    useEffect(() => {
        if (ref && ref.current) {
            const editor = ref.current.getEditor();
            editor.setContents(localValue);
        }
    }, [localValue, ref]);

    const quill = useMemo(() => {
        return (
            <ReactQuill
                ref={ref}
                modules={modules}
                formats={formats}
                theme="snow"
                value={localValue}
                onChange={handleChange}
            />
        );
    }, [localValue]);

    return <Card>{quill}</Card>;
}));

export default QuilEditor;
