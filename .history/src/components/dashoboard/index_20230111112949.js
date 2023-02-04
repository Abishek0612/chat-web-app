import { Alert, Button, Divider, Drawer } from "rsuite";
import {  useProfile } from "../../context/profile.context";
import { database } from "../../misc/firebase";
import EditableInput from "../EditableInput";
import AvatarUploadBtn from "./AvatarUploadBtn";
import ProviderBlock from "./ProviderBlock";


const Dashboard = ({ onSignOut }) => {
  const { profile } = useProfile()

  const onSave = async (newData) => {
  const userNicknameRef =  database.ref(`/profiles/${profile.uid}`).child('name');

      try{
        await userNicknameRef.set(newData);
        Alert.success('Nickname has been updated', 4000)

      } catch (err){
        Alert.error(err.message, 4000);
      }
  }


  return (
    <>
      <Drawer.Header>
        <Drawer.Title>
          Dashboard
        </Drawer.Title>

      </Drawer.Header>
      <Drawer.Body>
        <h3>Hey, {profile.name} </h3>
        <ProviderBlock />
        <Divider />
        <EditableInput initialValue={profile.name} name='nickname'
          onSave={onSave} label={<h4 className="mb-2">Nickname</h4>} />
          <AvatarUploadBtn />
      </Drawer.Body>

      <Drawer.Footer>
        <Button block color="red" onClick={onSignOut}  >Sign out</Button>
      </Drawer.Footer>
    </>
  )
}

export default Dashboard;