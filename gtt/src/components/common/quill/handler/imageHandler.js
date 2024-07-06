

export function ImageHandler   (ref){

    const input = document.createElement('input');
    let URL = '';
    input.setAttribute('type','file');
    input.setAttribute('accept','image/*');
    input.click();

    input.addEventListener('change',()=>{
        const file = input.files[0];
        if (!file) return;
        // URL = insertFiles(file).toString()
        // console.log(URL)
        console.log(ref)
    })

    return URL;
}
