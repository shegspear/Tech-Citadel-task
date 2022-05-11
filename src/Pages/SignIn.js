import React, {useState, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Form, Button, Alert } from 'react-bootstrap';

import {signin, markLog} from '../Actions/actions';

function SignIn() {
  const dispatch = useDispatch();

  const [userName, setUserName] = useState('');
  const [show, setShow] = useState(true); 

  const user = useSelector(state => state.user);
  const {userData} = user;

  function handleSubmit() {
    if(userName === '') {
        setShow(true);
    } else {
        dispatch(signin(userName));
        dispatch(markLog(userName));
        setUserName('');
    }
  };
   
  useEffect(() => {
    setShow(false);
    if(Object.keys(userData).length !== 0) {
        console.log('user data>> ', userData);
        window.location.assign('/dashboard')
    } 
  }, [userData]) 

  return (
    <div style={styles.cont}>
        <Container style={styles.formCont}>
            {
                show && (
                    <Alert variant="danger" onClose={() => setShow(false)} dismissible>
                        <h3 className='text-dark'>
                            Please ensure you enter your prefered username
                        </h3>
                    </Alert>
                )
            }

            <h3 className='mb-4'>Hello !!!</h3>

            <Form>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Enter Username</Form.Label>
                    <Form.Control onChange={(e) => setUserName(e.target.value)} type="text" placeholder="...Naruto" required={true} />
                    <Form.Text className="text-muted">
                    Please enter your preferred username.
                    </Form.Text>
                </Form.Group>

                <Button variant="primary" onClick={handleSubmit}>
                    Sign In
                </Button>
            </Form>
        </Container>
    </div>
  );
};

const styles = {
    cont: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },

    formCont: {
        width: '50%',
        marginTop: '10%'
    }
}

export default SignIn;