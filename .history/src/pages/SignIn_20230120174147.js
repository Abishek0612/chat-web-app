import { Container, Grid, Row, Panel, Col, Button, Icon, Alert } from 'rsuite'
import { auth, database } from '../misc/firebase'
import firebase from 'firebase/app'
import { animations } from 'react-animation'
import '../styles/utility.scss'
import anime from 'animejs/lib/anime.es.js';


const SignIn = () => {
  const signInWithProvider = async (provider) => {
    try {
      const { additionalUserInfo, user } = await auth.signInWithPopup(provider);
      if (additionalUserInfo.isNewUser) {
        await database.ref(`/profiles/${user.uid}`).set({
          name: user.displayName,
          createdAt: firebase.database.ServerValue.TIMESTAMP
        })
      }
      Alert.success('Signed in', 4000);
    }
    catch (err) {
      Alert.error(err.message, 4000);
    }
  }

  const onFacebookSignIn = () => {
    signInWithProvider( new firebase.auth.FacebookAuthProvider() )
  }

  const onGoogleSignIn = () => {
    signInWithProvider(new firebase.auth.GoogleAuthProvider())
  };

  
const style = {
  animation: animations.bounceIn
}

anime({
  targets: 'h3',
  translateX: 0,
  duration: 9000
});

  return (
    <Container  style={{backgroundColor:'lightGrey', color:'blue'}}>
      <Grid className='mt-page'>
        <Row>
          <Col xs={24} md={12} mdOffset={6}>
            <Panel style={{backgroundColor:'white',  boxShadow: '10px 10px 5px 0px rgba(0,0,0,0.30)'}}>
              <div className='text-center '>
                <img style={{height:'10px'}} src='https://th.bing.com/th/id/OIP.agY3KhWM2VnRfj50eiosLwHaEg?w=257&h=180&c=7&r=0&o=5&pid=1.7' alt='' />
                <h3 style={style}>Developed by Abishek</h3>
                <br />
                <h2>Welcome to  Chat Application</h2>
                <p>Progressive chat platform for neophytes</p>
              </div>
              <div className='mt-3'>
                <Button block color='blue'  onClick={onFacebookSignIn}>
                  <Icon icon='facebook' /> Continue with Facebook
                </Button>


                <Button block color="green" onClick={onGoogleSignIn}>
                  <Icon icon="google" /> Continue with Google
                </Button>
              </div>
            </Panel>
          </Col>
        </Row>
      </Grid>
    </Container>
  )
}


export default SignIn;
