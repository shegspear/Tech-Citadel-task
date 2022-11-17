import React from 'react';
import { Link } from 'react-router-dom';
import { FakeDB } from '../FakeDB/FakeDB';

function AuxPage({match}) {
    const pin = match.params.id || 0;
  return (
    <div style={styles.cont}>

    <div className='container'>

        <Link to={'/'}><h5>Back</h5></Link>


      <div className="container-fluid border border-1 pt-3">
        <h4>Please select a subject</h4>

          <h4>{FakeDB[pin || 0].title}</h4>

          <h5>{FakeDB[pin || 0].data}</h5>
      
      </div>

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
        paddingTop: '10%'
    }
  }

export default AuxPage;