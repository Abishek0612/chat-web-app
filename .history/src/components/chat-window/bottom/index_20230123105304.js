import { useCallback, useState } from "react"
import { Alert, Icon, Input, InputGroup } from "rsuite"
import firebase from "firebase/app"
import { useProfile } from "../../../context/profile.context"
import { useParams } from "react-router"
import { database } from "../../../misc/firebase"
import AttachmentBtnModal from "./AttachmentBtnModal"
import AudioMsgBtn from "./AudioMsgBtn"
import Dictaphone from "./Speech"


function assembleMessage(profile, chatId) {
  console.log('profile', profile)
  return {
    roomId: chatId,
    author: {
      name: profile.name,
      uid: profile.uid,
      createdAt: profile.createdAt,
      ...(profile.avatar ? { avatar: profile.avatar } : {})

    },
    createdAt: firebase.database.ServerValue.TIMESTAMP,
    likeCount: 0,
  }
}

const ChatBottom = () => {

  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const { chatId } = useParams();

  const { profile } = useProfile();

  const onInputChange = useCallback((value) => {
    setInput(value);
  }, [])

  const onSendClick = async () => {
    if (input.trim() === '') {
      return
    }

    const msgData = assembleMessage(profile, chatId);
    msgData.text = input;

    const updates = {};

    const messageId = database.ref('messages').push().key;

    updates[`/messages/${messageId}`] = msgData;
    updates[`/rooms/${chatId}/lastMessage`] = {
      ...msgData,
      msgId: messageId,
    };
    setIsLoading(true);
    try {
      await database.ref().update(updates);
      setInput('');
      setIsLoading(false)

    } catch (err) {
      setIsLoading(false)
      Alert.error(err.message);
    }
  }

  //Press enter key
  const onKeyDown = (e) => {
    if (e.keyCode === 13) {
      e.preventDefault();
      onSendClick();
    }
  }

  const afterUpload = useCallback(async (files) => {
    setIsLoading(true);

    const updates = {};

    files.forEach(file => {
      const msgData = assembleMessage(profile, chatId);
      msgData.file = file;

      const messageId = database.ref('messages').push().key;

      updates[`/messages/${messageId}`] = msgData;;
    })

    const lastMsgId = Object.keys(updates).pop();

    updates[`/rooms/${chatId}/lastMessage`] = {
      ...updates[lastMsgId],
      msgId: lastMsgId,
    };
    try {
      await database.ref().update(updates);
      setIsLoading(false)

    } catch (err) {
      setIsLoading(false)
      Alert.error(err.message);
    }

  }, [chatId, profile])

  return (
    <div>
      <InputGroup >
        <AttachmentBtnModal afterUpload={afterUpload} />
        <AudioMsgBtn afterUpload={afterUpload} />
        <Dictaphone />
        <Input placeholder='write a new message here' value={input} onChange={onInputChange}
          onKeyDown={onKeyDown} />
        <InputGroup.Button color="blue" appearance="primary" onClick={onSendClick} disabled={isLoading} >
          <Icon icon='send' />
        </InputGroup.Button>
      </InputGroup>
    </div>
  )
}

export default ChatBottom