import { useParams } from "react-router";
import { Loader } from "rsuite";
import ChatBottom from "../../components/chat-window/bottom"
import Messages from "../../components/chat-window/messages"
import ChatTop from "../../components/chat-window/top"
import { CurrentRoomProvider } from "../../context/current-room-context";
import { useRooms } from "../../context/rooms.context";
import '../../styles/main.scss';



const Chat = () => {

  const { chatId } = useParams();

  const rooms = useRooms();

  if(!rooms){
    return <Loader center vertical size='md' content="Loading" speed="slow" />
  }

  const currentRooms = rooms.find(room => room.id === chatId);

  if(!currentRooms){
    return <h6 className="text-center mt-page">Chat {chatId} not found</h6>
  }

const {  name, description} = currentRooms;

  const currentRoomData =  {
name, 
description
  }


  return (
    <CurrentRoomProvider data={currentRoomData}>
        <div  className="chat-top" >
            <ChatTop />
        </div>
        {/* <div className="chat-middle">
          <Messages />
        </div>
        <div className="chat-bottom">
          <ChatBottom />
        </div> */}
    </CurrentRoomProvider>
  )
}

export default Chat