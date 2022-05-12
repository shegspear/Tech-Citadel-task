import React, {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {Container, Button, Modal, Form, Table} from 'react-bootstrap';
import {editUserName, logout, updateSession} from '../Actions/actions';

function Dashboard() {
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [userName, setUserName] = useState('');
  const [show, setShow] = useState(false);
  const [sessions, setSessions] = useState([]);
  const [currentTime, setCurretTime] = useState(0);

  const user = useSelector(state => state.user);
  const {userData} = user;

  const userList = useSelector(state => state.userList);
  const {users} = userList;

  setInterval(() => {
    setCurretTime(new Date().getTime());
  }, 1000);
 
  useEffect(() => {
    setSessions(users)

    if(Object.keys(userData).length !== 0) {
      setName(userData.username);
    } else {
      window.location.replace('/');
    }
  }, [userData, user, users, userList]);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSubmit = () => {
    setShow(false);
    dispatch(editUserName(userName));
  };

  const handleLogout = () => {
    dispatch(logout());
    window.location.replace('/');
  };

  const handleSesion = (id, data) => {
    dispatch(updateSession(id, data));

    if(data.username === name) {
      handleLogout();
    }
  };

  return (
    <div style={styles.cont}>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Sign in with a different username</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Enter Username</Form.Label>
                <Form.Control onChange={(e) => setUserName(e.target.value)} type="text" placeholder="...Naruto" required={true} />
                <Form.Text className="text-muted">
                  Change your username.
                </Form.Text>
            </Form.Group>

            <Button variant="success" onClick={handleSubmit}>
                Save
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

      <Container>
          <div className='d-flex flex-row justify-content-between align-items-center'>
            <div className='d-flex flex-row justify-content-between align-items-center'>
              <h3>Welcome</h3>
              <h2 className='ms-3'>{name}</h2>
            </div>

            <div>
              <Button 
                variant='danger'
                onClick={handleLogout}
              >
                  Logout
              </Button>

              <Button 
                variant='primary' 
                className='ms-3' 
                onClick={handleShow}
              >
                Edit Username
              </Button>
            </div>
          </div>

          <h3 className='mt-5'>
            {sessions.length > 1 ? 'Manage Sessions' : 'Manage Session'}
          </h3>
          <Table  bordered size="sm">
            <thead>
              <tr>
                <th>Name</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {
                sessions.map((session, index) => (
                  <tr key={index} style={{backgroundColor: name === session.username ? 'lightgreen' : 'transparent'}}>
                    <td>{session.username}</td>
                    <td>
                      {  
                        session.exitTime ? 'Logged out' :
                        (Math.floor(((Number(currentTime) - Number(session.entryTime)) % (1000 * 60 * 60)) / 1000) > 60 ? 'Idle'  : 'Active')
                      }
                      
                    </td>
                    <td>
                      {
                        session.exitTime ? (
                          <Button 
                            variant='secondary' 
                          >
                            User logged out
                          </Button>
                        ) : (
                          <Button 
                            variant='danger' 
                            onClick={() => handleSesion(index, session)}
                          >
                            Logout session
                          </Button>
                        )
                      }
                    </td>
                  </tr>
                ))
              }
            </tbody>
          </Table>

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
      paddingTop: '10%'
  },
}

export default Dashboard;