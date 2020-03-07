import firebase from 'firebase'
import React, { useEffect, useState } from 'react'
import { Line } from 'react-chartjs-2'
import Chart from './Chart'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

const Data = props => {
  const [id, setId] = useState('id')
  const [data, setData] = useState([])

  useEffect(() => {
    if (props.path[0]) {
      setId(props.path[0].id)
      const unsubscribe = firebase
        .firestore()
        .collection('sessions')
        .onSnapshot(snapshot => {
          const data = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
          }))
          setData(data)
        })
      return () => unsubscribe()
    }
  }, [props, id])

  const renderSessions = () => {
    const sortedSessions = data.sort((a, b) => a.time.seconds - b.time.seconds)

    return sortedSessions.map((session, i) => {
      let selectedSessionsExtracted = session.selectedSessions
      let date = new Date(session.time.seconds * 1000)
      return (
        <div>
          <p>
            {date.toLocaleTimeString([], {
              day: '2-digit',
              month: 'long',
              hour: '2-digit',
              minute: '2-digit',
              year: '2-digit',
            })}
          </p>
          <ul>{mapper(selectedSessionsExtracted)}</ul>
        </div>
      )
    })
  }

  function mapper(arr) {
    return arr.map(el => (
      <p>
        {el.title}, {el.amountDone}
      </p>
    ))
  }

  const getAmountsDone = () => {
    const selectedSessions = data.map(session => session.selectedSessions)

    return selectedSessions.flat().reduce(
      (result, item) => ({
        ...result,
        [item['title']]: [...(result[item['title']] || []), item['amountDone']],
      }),
      {}
    )
  }

  const getGoals = () => {
    const selectedSessions = data.map(session => session.selectedSessions)

    return selectedSessions.flat().reduce(
      (result, item) => ({
        ...result,
        [item['title']]: [...(result[item['title']] || []), item['amount']],
      }),
      {}
    )
  }

  const renderCharts = () => {
    const test = getAmountsDone()
    const goals = getGoals()
    return Object.keys(test).map((el, i) => {
      let exerciseName = el
      return (
        <Chart
          goals={goals[el]}
          dataArr={test[el]}
          data={data}
          exercise={exerciseName}
        />
      )
    })
  }

  return (
    <div>
      {data.length > 0 ? (
        <div style={{ position: 'relative', width: 300, height: 400 }}>
          {data && renderSessions()}
          {/* renderSessions sortiert, benötige ich */}
          {data && renderCharts()}
        </div>
      ) : (
        <>
          <p>No training data to display</p>
          <StyledLinkText to="/sessions">Log your session</StyledLinkText>
        </>
      )}
    </div>
  )
}

const StyledLinkText = styled(Link)`
  margin: 0 auto;
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

export default Data

// return data.map((el, i) => {
//   let exerciseName = el.selectedSessions.map(el => el.title)
//   let exerciseObject = el[i]
//   return (
//     <Chart
//       dataArr={getAmountsDone()[i]}
//       data={data}
//       exercise={exerciseName}
//       exerciseObject={exerciseObject}
//     />
//   )
// })
// }

// const getAmountsDone = () => {
//   let newarr = []
//   let l = data[0].selectedSessions.length
//   console.log('getamountsdone called')
//   for (let i = 0; i <= l - 1; i++) {
//     for (let j = 0; j <= data.length - 1; j++) {
//       newarr.push(data[j].selectedSessions[i].amountDone)
//       // console.log('data.length:', data.length)
//       // console.log('selectedSessions.length:', data[0].selectedSessions.length)
//       // console.log('[j]', j)
//       // console.log('[i]', i)
//       // console.log(data[j].selectedSessions[i])
//       // console.log(data[j].selectedSessions[i].amountDone)
//     }
//   }

//   let chunkedArr = []
//   for (let i = 0; i < newarr.length; i += data.length) {
//     chunkedArr.push(
//       newarr
//         .toString()
//         .split(',')
//         .map(el => Number(el))
//         .slice(i, i + data.length)
//     )
//   }
//   console.log('chnky', chunkedArr)
//   return chunkedArr
// }

// const renderCharts = () => {
//   // let l = data[0].selectedSessions.length
//   let selectSessions = data[0].selectedSessions
//   // let exerciseNamesArray
//   // selectedSessions.map(el => el.title)
//   return data.map((el, i) => {
//     let exerciseName = el.selectedSessions.map(el => el.title)
//     let exerciseObject = el[i]
//     return (
//       <Chart
//         dataArr={getAmountsDone()[i]}
//         data={data}
//         exercise={exerciseName}
//         exerciseObject={exerciseObject}
//       />
//     )
//   })
// }
