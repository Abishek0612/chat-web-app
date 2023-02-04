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
                <img src='https://www.bing.com/images/search?view=detailV2&ccid=pCMrO1NA&id=A79CC7B001F4B294A893B0926CF20CF0A8B1D246&thid=OIP.pCMrO1NA1drAcMULpdaz7QAAAA&mediaurl=https%3a%2f%2fd2q79iu7y748jz.cloudfront.net%2fs%2f_squarelogo%2fa4232b3b5340d5dac070c50ba5d6b3ed&exph=400&expw=400&q=ABI+Logo&simid=608026885424692780&FORM=IRPRST&ck=BA53D217E2BE8F74B30DE59A3EAC4A6F&selectedIndex=8' alt='' />
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
