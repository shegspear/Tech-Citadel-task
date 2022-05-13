import React, {useState, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';

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
        <div className='container' style={styles.formCont}>
            {
                show && (
                    <div className="alert alert-danger" role="alert" onClose={() => setShow(false)}>
                        <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                        <h3 className='text-dark'>
                            Please ensure you enter your prefered username
                        </h3>
                    </div>
                )
            }

            <h3 className='mb-4'>Hello !!!</h3>

            <form>
                <div className="mb-3">
                    <label className="form-label">Enter Username</label>
                    <input onChange={(e) => setUserName(e.target.value)} placeholder="...Naruto" type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
                    <div id="emailHelp" className="form-text">Please enter your preferred username.</div>
                </div>
                <button onClick={handleSubmit} className="btn btn-primary"> Sign In</button>
            </form>

            {/* <Form>
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
            </Form> */}
        </div>
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