/** @jsxImportSource @emotion/react */
import { useState } from "react";
import { Button, Col, Container, Form, Row, Dropdown } from "react-bootstrap";
import { useRouter } from 'next/router'
import { ContainerStyle, HeaderDropdown, HeaderStyle } from "../styles/header.emotion";

type MenuConstants = {
  TRICKINGRECIPE: {
    name: string,
    url: string
  }
  TRICKINGMAP: {
    name: string,
    url: string
  }
}


export default function Header() {
  const router = useRouter()
  const { pathname } = router

  const menuStateConstants: MenuConstants = {
    TRICKINGMAP: {
      name: "Tricking Map",
      url: "tricking-map",
    },
    TRICKINGRECIPE: {
      name: "Tricking Builder",
      url: "tricking-builder"
    }
  }
  const handleInitialState = (pathName) =>{
    switch(pathName){
      case "/tricking-builder":
        return menuStateConstants.TRICKINGRECIPE
      case "/tricking-map":
        return menuStateConstants.TRICKINGMAP
      default:
        return menuStateConstants.TRICKINGMAP
    }
  }


  const [currentMenu, setCurrentMenu] = useState(handleInitialState(pathname))
  
  const displayDropdownMenu = (menuStateConstants) =>{
    const listOfMenuComponent = []

    for (const [_, constantsValue] of Object.entries<any>(menuStateConstants)) {
      const { name, url } = constantsValue

      if(pathname !== `/${url}`){
        listOfMenuComponent.push(
          <Dropdown.Item href={url}>{name}</Dropdown.Item>
        )
      }
    }
    
    return listOfMenuComponent
  }

  return (
    <header css={HeaderStyle}>
      <Container css={ContainerStyle}>
        <Row>
          <Col sm={{ span: 2 }}>
            <Dropdown css={HeaderDropdown}>
              <Dropdown.Toggle>
                {currentMenu.name}
              </Dropdown.Toggle>

              <Dropdown.Menu>
                {displayDropdownMenu(menuStateConstants)}
              </Dropdown.Menu>
            </Dropdown>
          </Col>
          <Col sm={{ span: 4, offset: 2}}>
            <Form>
              <Form.Group controlId="formSearch">
                <Form.Control placeholder="Tricks" />
              </Form.Group>
            </Form>
          </Col>
          <Col>
            <Button variant="secondary">Filter</Button>
          </Col>
        </Row>
      </Container>
    </header>
  );
}
