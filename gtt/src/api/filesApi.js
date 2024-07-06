import axios from "axios";

//export const SERVER = 'http://sorune.asuscomm.com'
//export const SERVER = 'http://mbc-webcloud.iptime.org'
export const SERVER = 'http://localhost'
export const API_SERVER_HOST = `${SERVER}:8080`

export const SERVER_HOST = `${SERVER}:3000`
const prefix = `${API_SERVER_HOST}/api/files`;
export const insertFiles = async(file)=>{
    const formData = new FormData();
    formData.append('file',file);
    const res = await axios.post(`${prefix}/`,formData)
    console.log(res, res.data)
    return res.data
}
