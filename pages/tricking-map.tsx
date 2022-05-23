/** @jsxImportSource @emotion/react */
import { useEffect, useRef, useState } from "react";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import Xarrow from 'react-xarrows';

import { TrickType, TrickingObjType } from "types/tricking-obj.types"
import { getAllTricks } from "api/tricking-map.api";
import { TrickRowLayoutStyle, TrickRowListStyle, TrickRowTitleStyle, TrickVideoStyle } from "styles/tricking-map.emotion"
import TrickingCard from "components/tricking-map/Tricking-Card";
import { Button, Offcanvas } from "react-bootstrap";
import { Global, css } from '@emotion/react'


export default function TrickingMap(props: TrickingObjType) {
  const { classes, origins, tricks } = props
  const [selectedTrick, setSelectedTrick] = useState<TrickType>()
  const [progressionTrick, setProgressionTrick] = useState<TrickType>()
  const [showOffCanvas, setShowOffCanvas] = useState(false)
  const [isControlVisible, setControlVisible] = useState({})
  const [isProgressionVisible, setProgressionVisible] = useState(false)
  const [, setRerender] = useState({});

  const forceRerender = () => setRerender({});

  const transformWrapperRef = useRef(null);
  
  const handleClose = () =>{
    setShowOffCanvas(false)
    setProgressionVisible(false)
    setProgressionTrick(null)
    setSelectedTrick(null)
  }

  const handleProgressionClick = () =>{
    setProgressionTrick(selectedTrick)
    setProgressionVisible(true)
  }

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
            progressionTrick={progressionTrick}
            selectedTrick={selectedTrick} 
            setSelectedTrick={setSelectedTrick}
            setShowOffCanvas={setShowOffCanvas}
            trick={trick}
            isProgressionVisible={isProgressionVisible}
          />
        )
      }
      else if(classId === 2){
        listOfBeginnerTricks.push(
          <TrickingCard 
            key={id}
            isControlVisible={isControlVisible}
            setControlVisible={setControlVisible}
            progressionTrick={progressionTrick}
            selectedTrick={selectedTrick}  
            setSelectedTrick={setSelectedTrick}
            setShowOffCanvas={setShowOffCanvas}
            trick={trick}
            isProgressionVisible={isProgressionVisible}
          />
        )
      }
      else if(classId === 3){
        listOfIntermediateTricks.push(
          <TrickingCard 
            key={id}
            isControlVisible={isControlVisible}
            setControlVisible={setControlVisible}
            progressionTrick={progressionTrick}
            selectedTrick={selectedTrick}  
            setSelectedTrick={setSelectedTrick}
            setShowOffCanvas={setShowOffCanvas}
            trick={trick}
            isProgressionVisible={isProgressionVisible}
          />
        )
      }
      else if(classId === 4){
        listOfAdvancedTricks.push(
          <TrickingCard 
            key={id}
            isControlVisible={isControlVisible}
            setControlVisible={setControlVisible}
            progressionTrick={progressionTrick}
            selectedTrick={selectedTrick}  
            setSelectedTrick={setSelectedTrick}
            setShowOffCanvas={setShowOffCanvas}
            trick={trick}
            isProgressionVisible={isProgressionVisible}
          />
        )
      }
    }

    return(
      <div style={{display:"flex", flexDirection:"row", gap: "3%"}}>
        <div css={TrickRowListStyle}>
          <div css={TrickRowTitleStyle}>
            Absolute Novice Tricks
          </div>
          <div css={TrickRowLayoutStyle}>
            {listOfNoviceTricks}
          </div>
        </div>
        <div css={TrickRowListStyle}>
          <div css={TrickRowTitleStyle}>
            Beginner Tricks
          </div>
          <div css={TrickRowLayoutStyle}>
            {listOfBeginnerTricks}
          </div>
        </div>
        <div css={TrickRowListStyle}>
          <div css={TrickRowTitleStyle}>
            Intermediate Tricks
          </div>
          <div css={TrickRowLayoutStyle}>
            {listOfIntermediateTricks}
          </div>
        </div>
        <div css={TrickRowListStyle}>
          <div css={TrickRowTitleStyle}>
            Advanced Tricks
          </div>
          <div css={TrickRowLayoutStyle}>
            {listOfAdvancedTricks}
          </div>
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
        minScale={0.05}
        onPanning={forceRerender}
        onWheel={forceRerender}
      >
        <TransformComponent contentStyle={{ height:"100vh" }} wrapperStyle={{ background: isProgressionVisible ? "#00000080" : "initial" }}>
          {/* <div style={{ background:"#00000080"}}> */}
            {constructTricksList(tricks, classes)}
          {/* </div> */}
        </TransformComponent>
      </TransformWrapper>
      <Offcanvas 
        placement="end" 
        show={showOffCanvas} 
        scroll 
        backdrop={false}
        onHide={handleClose}  
      >
        <video
          css={TrickVideoStyle}
          autoPlay
          controls
          src={`http://www.club540.com/assets/video/tricktionary/${selectedTrick?.uri}.mp4`}
        />
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>{selectedTrick?.name}</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body style={{ display:"flex", flexDirection:"column", gap:"5%"}}>
          {selectedTrick?.description}
          <Button onClick={() => handleProgressionClick()}>
            Show the progression tree!
          </Button>
        </Offcanvas.Body>
      </Offcanvas>
      { isProgressionVisible && progressionTrick?.prerequisites?.length > 0 && 
        progressionTrick.prerequisites.map((preReqId) =>{
          return(
            <Xarrow
              key={`guide-preq-${preReqId}`}
              start={`${preReqId}`}
              end={`${progressionTrick.id}`}
              strokeWidth={3 * transformWrapperRef?.current?.state?.scale ?? 1}
            />
          )
        })
      }
      { isProgressionVisible && progressionTrick?.progressesTo?.length > 0 && 
        progressionTrick.progressesTo.map((preReqId) =>{
          return(
            <Xarrow
              key={`guide-prog-${preReqId}`}
              start={`${progressionTrick.id}`}
              end={`${preReqId}`}
              dashness
              strokeWidth={3 * transformWrapperRef?.current?.state?.scale ?? 1}
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
    const { prerequisites, id, name } = trick 

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