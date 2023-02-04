import { memo } from "react"
import { Button, Drawer } from "rsuite"
import { useCurrentRoom } from "../../../context/current-room-context"
import { useMOdalState } from "../../../misc/custom-hooks"
import EditableInput from "../../EditableInput"



const EditRoomBtnDrawer = () => {

    const { isOpen, open, close } = useMOdalState()

    const name = useCurrentRoom(v => v.name);
    const description = useCurrentRoom(v => v.description);

    return (
        <div>
            <Button className="br-circle" size="sm" color="red" onClick={open}>
                Admin
            </Button>

            <Drawer show={isOpen} onHide={close} placement='right' >
                <Drawer.Header>
                    <Drawer.Title>Edit Room</Drawer.Title>
                </Drawer.Header>
                <Drawer.Body>
                    <EditableInput initialValue={name} onSave={onNameSave}
                        label={<h6 className="mb-2">Name</h6>} emptyMsg='Name can not be empty' />
                    <EditableInput componentClass='textarea' rows={5} initialValue={description} 
                    onSave={onDescriptionSave} emptyMsg="Description can not be empty" /> 

                </Drawer.Body>
                <Drawer.Footer>
                    <Button block onClick={close}>
                        Close
                    </Button>
                </Drawer.Footer>
            </Drawer>
        </div>
    )
}

export default memo(EditRoomBtnDrawer);