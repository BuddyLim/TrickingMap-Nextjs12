/** @jsxImportSource @emotion/react */
import { Card } from "react-bootstrap";
import { TrickCardStyle, TrickVideoStyle } from "styles/tricking-map.emotion";
import { TrickingCardPropsType } from "types/tricking-obj.types";

export default function TrickingCard({ setShowOffCanvas, selectedTrick, progressionTrick, setSelectedTrick, trick, isProgressionVisible }: TrickingCardPropsType ) {
  const { id, name, uri } = trick

  const isProgressionTrick = progressionTrick?.progressesTo?.includes(id) || progressionTrick?.prerequisites?.includes(id) || progressionTrick?.id === id

  return (
    <div 
      id={`${id}`} 
      key={id} 
      style={{
        marginTop:"2%",
        opacity: isProgressionVisible ? isProgressionTrick ? 1 : 0.2 : 1,
        zIndex: isProgressionTrick ? 10 : "initial",
        position: isProgressionTrick ? "relative" : "initial"
      }} 
      onClick={() =>{ setSelectedTrick(trick); setShowOffCanvas(true)}}
    >
      <Card css={TrickCardStyle}>
        <video
          css={TrickVideoStyle}
          src={`http://www.club540.com/assets/video/tricktionary/${uri}.mp4#t=3`}
        />
        <Card.Body>
          <Card.Title>{name}</Card.Title>
        </Card.Body>
      </Card>
    </div>
  );
}
