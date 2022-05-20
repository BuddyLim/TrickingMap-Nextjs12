/** @jsxImportSource @emotion/react */
import { Card, OverlayTrigger, Popover } from "react-bootstrap";
import { TrickCardStyle, TrickVideoStyle } from "styles/tricking-map.emotion";
import { TrickingCardPropsType } from "types/tricking-obj.types";

export default function TrickingCard({ setShowOffCanvas, setSelectedTrick, trick }: TrickingCardPropsType ) {
  const { id, name, aliases, classId, description, uri } = trick

  return (
    <div id={`${id}`} key={id} style={{marginTop:"2%"}} onClick={() =>{ setSelectedTrick(trick); setShowOffCanvas(true)}}>
      <Card css={TrickCardStyle}>
        <Card.Body>
          <Card.Title>{name}</Card.Title>
          {/* <Button variant="primary">Go somewhere</Button> */}
        </Card.Body>
      </Card>
    </div>
  );
}
