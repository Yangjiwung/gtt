

const ChatCell = ({message})=>{
    return (
        <div className="mb-1 mx-1">
            <p className="bg-gray-200 text-gray-700 rounded-lg py-2 px-4 inline-block">{message}</p>
        </div>
    )
}

export default ChatCell
