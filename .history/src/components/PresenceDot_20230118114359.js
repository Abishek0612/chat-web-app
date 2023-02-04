import { usePresence } from "../misc/custom-hooks"



const PresenceDot = ({uid}) => {
    const presence = usePresence(uid);


  return (
    <div>PresenceDot</div>
  )
}

export default PresenceDot