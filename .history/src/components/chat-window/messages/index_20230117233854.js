import { useState } from "react"
import { useParams } from "react-router"

const Messages = () => {

  const {chatId } = useParams()

  const [messages, setMessages] = useState(null)

  return (
    <div>
        Messages
    </div>
  )
}

export default Messages