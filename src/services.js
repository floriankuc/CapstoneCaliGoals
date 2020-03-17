import { pathsRef, sessionsRef, exercisesRef } from './firebase'
import firebase from 'firebase'

export function getPath(setter) {
  pathsRef.onSnapshot(
    snapshot => {
      const path = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }))
      setter(path)
    },
    function(error) {
      console.error('Error getting path from firestore:', error)
    }
  )
}

export function saveSession(date, id, session) {
  sessionsRef
    .add({
      time: date,
      pathId: id,
      selectedSessions: session,
    })
    .catch(function(error) {
      console.error('Error saving session: ', error)
    })
}

export function savePath(category, goals) {
  pathsRef
    .add({
      category,
      selectedExercisesAreGoals: goals,
    })
    .catch(function(error) {
      console.error('Error saving path: ', error)
    })
}

export function getSessions(setter) {
  sessionsRef.onSnapshot(
    snapshot => {
      const data = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }))
      setter(data)
    },
    function(error) {
      console.error('Error getting sessions from firestore:', error)
    }
  )
}

export function getExercises(setter) {
  exercisesRef.onSnapshot(
    snapshot => {
      const exercise = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }))
      setter(exercise)
    },
    function(error) {
      console.error('Error getting exercises from firestore:', error)
    }
  )
}

export function deletePath(id) {
  pathsRef.doc(id).delete()

  sessionsRef
    .where('pathId', '==', id)
    .get()
    .then(
      querySnapshot => {
        var batch = firebase.firestore().batch()
        querySnapshot.forEach(doc => {
          batch.delete(doc.ref)
        })
        batch.commit()
      },
      function(error) {
        console.error(
          'Error deleting sessions assiociated to path from firestore:',
          error
        )
      }
    )
}
