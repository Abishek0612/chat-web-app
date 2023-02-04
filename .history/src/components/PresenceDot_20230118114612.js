import { Whisper } from "rsuite";
import { usePresence } from "../misc/custom-hooks"



const PresenceDot = ({uid}) => {
    const presence = usePresence(uid);


  return (
    <Whisper placement="top" controlId="control-id-click" trigger="click" speaker={tooltip}>
  </Whisper>
  )
}

export default PresenceDot