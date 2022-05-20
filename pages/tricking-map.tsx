/** @jsxImportSource @emotion/react */
import { useEffect, useRef, useState } from "react";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import Xarrow from 'react-xarrows';

import { TrickType, TrickingObjType } from "types/tricking-obj.types"
import { getAllTricks } from "api/tricking-map.api";
import { TrickRowLayoutStyle, TrickVideoStyle } from "styles/tricking-map.emotion"
import TrickingCard from "components/tricking-map/Tricking-Card";
import { Offcanvas } from "react-bootstrap";
import { Global, css } from '@emotion/react'


export default function TrickingMap(props: TrickingObjType) {
  const { classes, origins, tricks } = props
  const [selectedTrick, setSelectedTrick] = useState<TrickType>()
  const [showOffCanvas, setShowOffCanvas] = useState(false)
  const [isControlVisible, setControlVisible] = useState({})
  const [, setRerender] = useState({});

  const forceRerender = () => setRerender({});

  const transformWrapperRef = useRef(null);
  
  const constructTricksList = (tricks, classes) =>{
  
    const listOfNoviceTricks = []
    const listOfBeginnerTricks = []
    const listOfIntermediateTricks = []
    const listOfAdvancedTricks = []

    for (let index = 0; index < tricks.length; index++) {
      const trick = tricks[index] as TrickType;
      const { classId, id } = trick
      if(classId === 1){
        listOfNoviceTricks.push(
          <TrickingCard 
            key={id}
            isControlVisible={isControlVisible}
            setControlVisible={setControlVisible} 
            setSelectedTrick={setSelectedTrick}
            setShowOffCanvas={setShowOffCanvas}
            trick={trick}
          />
        )
      }
      else if(classId === 2){
        listOfBeginnerTricks.push(
          <TrickingCard 
            key={id}
            isControlVisible={isControlVisible}
            setControlVisible={setControlVisible} 
            setSelectedTrick={setSelectedTrick}
            setShowOffCanvas={setShowOffCanvas}
            trick={trick}
          />
        )
      }
      else if(classId === 3){
        listOfIntermediateTricks.push(
          <TrickingCard 
            key={id}
            isControlVisible={isControlVisible}
            setControlVisible={setControlVisible} 
            setSelectedTrick={setSelectedTrick}
            setShowOffCanvas={setShowOffCanvas}
            trick={trick}
          />
        )
      }
    }

    return(
      <div>
        <div>
          Absolute Novice Tricks
        </div>
        <div css={TrickRowLayoutStyle}>
          {listOfNoviceTricks}
        </div>
        <div>
          Beginner Tricks
        </div>
        <div css={TrickRowLayoutStyle}>
          {listOfBeginnerTricks}
        </div>
        <div>
          Intermediate Tricks
        </div>
        <div css={TrickRowLayoutStyle}>
          {listOfIntermediateTricks}
        </div>
      </div>
    )
  }

  useEffect(() =>{
    forceRerender()
  }, [])

  return (
    <div style={{height:"100vh"}}>
      <Global
        styles={css`
          html {
            overflow-y: hidden;
          }
        `}
      />
      <TransformWrapper 
        ref={transformWrapperRef}
        limitToBounds={false}
        minScale={0.5}
        onPanning={forceRerender}
        onWheel={forceRerender}
      >
        <TransformComponent contentStyle={{ height:"100vh" }}>
            {constructTricksList(tricks, classes)}
        </TransformComponent>
      </TransformWrapper>
      <Offcanvas placement="end" show={showOffCanvas} scroll backdrop={false}>
        <video
          css={TrickVideoStyle}
          autoPlay
          controls
          // onMouseEnter={() => setControlVisible({ [id]: true })}
          // onMouseLeave={() => setControlVisible({})}
          src={`http://www.club540.com/assets/video/tricktionary/${selectedTrick?.uri}.mp4`}
        />
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>{selectedTrick?.name}</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          {selectedTrick?.description}
        </Offcanvas.Body>
      </Offcanvas>
      { selectedTrick?.prerequisites?.length > 0 && 
        selectedTrick.prerequisites.map((preReqId) =>{
          return(
            <Xarrow
              key={`guide-preq-${preReqId}`}
              start={`${preReqId}`}
              end={`${selectedTrick.id}`}
              strokeWidth={3 * transformWrapperRef?.current?.state?.scale ?? 1}
            />
          )
        })
      }
      { selectedTrick?.progressesTo?.length > 0 && 
        selectedTrick.progressesTo.map((preReqId) =>{
          return(
            <Xarrow
              key={`guide-prog-${preReqId}`}
              start={`${selectedTrick.id}`}
              end={`${preReqId}`}
              dashness
              strokeWidth={3 * transformWrapperRef?.current?.state?.scale ?? 1}
              divContainerStyle={{zIndex:"2"}}
            />
          )
        })
      }
    </div>
  )
}

export async function getStaticProps() {
  const trickingObjRes  = await getAllTricks() 
  const { tricks } = trickingObjRes as TrickingObjType

  for (let index = 0; index < tricks.length; index++) {
    const trick = tricks[index] as TrickType
    const { prerequisites, id } = trick 

    if(prerequisites.length > 0){
      for (let index = 0; index < prerequisites.length; index++) {
        const trickId = prerequisites[index];
        
        const indexOfTrick = tricks.findIndex(trick => trick.id === trickId )
        if(Array.isArray(tricks[indexOfTrick]?.progressesTo)){
          tricks[indexOfTrick].progressesTo.push(id)
          continue
        }
        
        tricks[indexOfTrick] = {
          ...tricks[indexOfTrick],
          progressesTo: [id]
        }
      }
    }
  }

  return{
    props:{ ...trickingObjRes }
  }
}