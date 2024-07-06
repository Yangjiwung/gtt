import React from "react";
import DaumPostcodeEmbed from "react-daum-postcode";

const AddrWithDaum = (props) => {
    // 우편번호 검색 후 주소 클릭 시 실행될 함수, data callback 용
    const handlePostCode = (data) => {
        let fullAddress = data.address;
        let extraAddress = '';
    
        if (data.addressType === 'R') {
            if (data.bname !== '') {
                extraAddress += data.bname;
            }
            if (data.buildingName !== '') {
                extraAddress += (extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName);
            }
            fullAddress += (extraAddress !== '' ? ` (${extraAddress})` : '');
        }
    
        console.log("Full Address:", fullAddress); // Check the full address
        console.log("Zone Code:", data.zonecode); // Check the postal code
    
        // Call onUpdateAddress with the new address data
        props.onUpdateAddress(fullAddress, data.zonecode);
        props.onClose();
    }
    const postCodeStyle = {
        display: "block",
        width: "100%",
        height: "500px",
        padding: "7px",
    };

    return(
        <DaumPostcodeEmbed style={postCodeStyle} onComplete={handlePostCode}/>
    );
}

export default AddrWithDaum;