import React from 'react'
import styled from 'styled-components/macro'
import firebase from 'firebase'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const OngoingPathContent = ({ path }) => {
  return (
    <div>
      <p>
        You have an ongoing path, good for you! Remember you can only pursue one
        goal at a time.
      </p>
      {/* <StyledLinkTextRed onClick={() => deletePath(path[0].id)}>
        Terminate current path
      </StyledLinkTextRed> */}
      <StyledLinkText to="/sessions">Log your session</StyledLinkText>
    </div>
  )

  // function deletePath(id) {
  //   firebase
  //     .firestore()
  //     .collection('paths')
  //     .doc(id)
  //     .delete()
  //     .then(() => console.log('deleted'))

  //   firebase
  //     .firestore()
  //     .collection('sessions')
  //     .where('pathId', '==', id)
  //     .get()
  //     .then(querySnapshot => {
  //       var batch = firebase.firestore().batch()
  //       querySnapshot.forEach(doc => {
  //         batch.delete(doc.ref)
  //       })
  //       batch.commit()
  //     })
  //     .then(() => {
  //       toast('Path deleted.', { containerId: 'pathDeletedContainer' })
  //     })
  // }
}

const StyledLinkTextRed = styled.button`
  margin: 30px auto;
  display: block;
  width: 300px;
  text-decoration: none;
  color: #fff;
  padding: 12px;
  background: red;
  text-align: center;
  position: relative;

  &:hover:after {
    top: -6px;
    left: 6px;
  }

  &:after {
    content: '';
    position: absolute;
    z-index: -1;
    background: #111;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    transition: all 0.1s;
  }
`

const StyledLinkText = styled(Link)`
  margin: 30px auto;
  display: block;
  width: 300px;
  text-decoration: none;
  color: #fff;
  padding: 12px;
  background: #111;
  text-align: center;
  position: relative;

  &:hover:after {
    top: -6px;
    left: 6px;
  }

  &:after {
    content: '';
    position: absolute;
    z-index: -1;
    background: red;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    transition: all 0.1s;
  }
`

OngoingPathContent.propTypes = {
  path: PropTypes.array.isRequired,
}

export default OngoingPathContent
