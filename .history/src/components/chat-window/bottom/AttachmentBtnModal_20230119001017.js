import { useState } from "react";
import { Button, Icon, InputGroup, Modal, Uploader } from "rsuite"
import { useMOdalState } from "../../../misc/custom-hooks"


const MAX_FILE_SIZE = 1000 * 1024 * 5;

const AttachmentBtnModal = () => {

    const { isOpen, close, open } = useMOdalState()

    const [fileList, setFileList] = useState([]);

    const onChange = (fileArr) => {
        const filtered = fileArr.filter(el => el.blobFile.size <= MAX_FILE_SIZE).slice(0,5);

        setFileList(filtered);
    }

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
        autoUpload={false}
        action=""
        fileList={fileList}
        onChange={onChange}
        multiple
        listType="picture-text"
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