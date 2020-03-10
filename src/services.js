import { pathsRef, sessionsRef } from './firebase'
import firebase from 'firebase'

export function getPath(setter) {
  pathsRef.onSnapshot(snapshot => {
    const path = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }))
    setter(path)
  })
}

export function saveSession(date, id, session) {
  sessionsRef.add({
    time: date,
    pathId: id,
    selectedSessions: session,
  })
}
export function getSessions(setter) {
  sessionsRef.onSnapshot(snapshot => {
    const data = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }))
    setter(data)
  })
}

export function deletePath(id) {
  pathsRef
    .doc(id)
    .delete()
    .then(() => console.log('deleted'))

  sessionsRef
    .where('pathId', '==', id)
    .get()
    .then(querySnapshot => {
      var batch = firebase.firestore().batch()
      querySnapshot.forEach(doc => {
        batch.delete(doc.ref)
      })
      batch.commit()
    })
}
