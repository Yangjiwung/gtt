

const useUtils = ()=>{

    const parseDeltaOrString = (data) => {
        if (typeof data === 'string' && data.includes('"ops"')) {
            return JSON.parse(data);
        } else {
            return data; // 그냥 문자열로 반환
        }
    }

    return {parseDeltaOrString};
}

export default useUtils;
