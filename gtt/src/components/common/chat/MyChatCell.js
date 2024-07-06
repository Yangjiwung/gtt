

const MyChatCell = ({message}) => {
    return (
        <div className="mb-1 text-right mx-1">
            <p className="bg-blue-500 text-white rounded-lg py-2 px-4 inline-block">{message}</p>
        </div>
    )
}

export default MyChatCell
