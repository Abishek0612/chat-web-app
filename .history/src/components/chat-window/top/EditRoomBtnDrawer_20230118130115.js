import { Button, Drawer } from "rsuite"
import { useMOdalState } from "../../../misc/custom-hooks"



const EditRoomBtnDrawer = () => {

    const { isOpen, open, close } = useMOdalState()

    return (
        <div>
            <Button className="br-circle" size="sm" color="red" onClick={open}>
                Admin
            </Button>

            <Drawer>
                <Drawer.Header>

                </Drawer.Header>
                <Drawer.Body>

                </Drawer.Body>
                <Drawer.Footer>

                </Drawer.Footer>
            </Drawer>
        </div>
    )
}

export default EditRoomBtnDrawer