import { Icon, InputGroup } from "rsuite"



const AudioMsgBtn = ({ afterUpload }) => {
    return (

        <InputGroup.Button color="blue" appearance="primary" onClick={onClick} >
            <Icon icon='microphone' />
            
        </InputGroup.Button>
            )
}

            export default AudioMsgBtn