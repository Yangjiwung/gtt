import {Quill} from "react-quill";

const FontAttributor = Quill.import('attributors/class/font');
FontAttributor.whitelist = [
    'sofia',
    'roboto',
    'ubuntu',
    'd2coding',
];
Quill.register(FontAttributor, true);
