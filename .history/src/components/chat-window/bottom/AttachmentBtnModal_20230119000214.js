import { Button, Icon, InputGroup, Modal, Uploader } from "rsuite"
import { useMOdalState } from "../../../misc/custom-hooks"



const AttachmentBtnModal = () => {

    const { isOpen, close, open } = useMOdalState()

    return (
        <>
            <InputGroup.Button onClick={open}>
                <Icon icon='attachment' />
            </InputGroup.Button>

            <Modal show={isOpen} onHide={close}>
                <Modal.Header>
                    <Modal.Title>Upload files</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <Uploader
        value={value}
        autoUpload={false}
        action="//jsonplaceholder.typicode.com/posts/"
        onChange={setValue}
        ref={uploader}
      />
                </Modal.Body>
                <Modal.Footer>
                    <Button block>Send to chat</Button>
                    <div className="text-right  mt-2">
                        <small>*only files less than 5 mb are allowed</small>
                    </div>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default AttachmentBtnModal