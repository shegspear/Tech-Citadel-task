import React, {useState, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {signin, markLog, holdData} from '../Actions/actions';

function SignIn() {
  const dispatch = useDispatch();

  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [house, setHouse] = useState('');
  const [year, setYear] = useState('');
  const [show, setShow] = useState(true); 

  const user = useSelector(state => state.user);
  const {userData} = user;

  function handleSubmit(e) {
    e.preventDefault();
    if(userName === '') {
        setShow(true);
    } else {
        dispatch(signin(userName));
        dispatch(markLog(userName));
        dispatch(holdData({email, house, year}))
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
                            Please ensure you enter your credentials
                        </h3>
                    </div>
                )
            }

            <h3 className='mb-4'>Welcome student of Hogwarts !!!</h3>

            <form>
                <div className="mb-3">
                    <label className="form-label">Enter your registered name</label>
                    <input onChange={(e) => setUserName(e.target.value)} placeholder="...Harry Porter" type="text" className="form-control" id="exampleInputname1" aria-describedby="nameHelp"/>
                    {/* <div id="emailHelp" className="form-text">Please enter your pr.</div> */}
                </div>

                <div className="mb-3">
                    <label className="form-label">Enter your registered email</label>
                    <input 
                        onChange={(e) => setEmail(e.target.value)} 
                        placeholder="...harryporter@hogwarts.com" type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp2"
                    />
                    {/* <div id="emailHelp2" className="form-text">Please enter your preferred username.</div> */}
                </div>

                <div className="mb-3">
                    <label className="form-label">Enter your house</label>
                    <input 
                        onChange={(e) => setHouse(e.target.value)} 
                        placeholder="...slederine" type="text" className="form-control" id="exampleInputtext1" aria-describedby="textHelp1"
                    />
                    {/* <div id="emailHelp2" className="form-text">Please enter your preferred username.</div> */}
                </div>

                <div className="mb-3">
                    <label className="form-label">Enter your year</label>
                    <input 
                        onChange={(e) => setYear(e.target.value)} 
                        placeholder="...one" type="text" className="form-control" id="exampleInputtext2" aria-describedby="textHelp2"
                    />
                    {/* <div id="emailHelp2" className="form-text">Please enter your preferred username.</div> */}
                </div>

                <button onClick={handleSubmit} className="btn btn-primary"> Sign In</button>
            </form>
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