import React from "react";
import { useSelector } from "react-redux";
import { selectMode } from "../app/appSlice";
import { Element } from "react-scroll";
import { Button, Col, Container, Row } from "react-bootstrap";
import Title from "./Title";
import { skillData, resume } from "../config";
import styled from "styled-components";

// Styled component for customizing skill icons and shadow
const StyledFigure = styled.figure`
  text-align: center;
  font-size: 7rem; /* Adjust this to increase icon size */
  color: inherit;

  /* Add shadow behind icons */
  .skill-icon {
    filter: drop-shadow(0 0 10px rgba(0, 0, 0, 0.25)); /* Custom shadow */
  }

  figcaption {
    margin-top: 1rem;
    font-size: 1.5rem; /* Adjust font size for skill names */
  }
`;

const Skills = () => {
  const theme = useSelector(selectMode);

  return (
    <Element name={"Skills"} id="skills">
      <section className="section">
        <Container className="text-center">
          <Container className="d-flex justify-content-center">
            <Title size={"h2"} text={"Skills"} />
          </Container>
          <Row className="mt-3 align-items-center">
            {skillData.map((skills) => {
              return (
                <Col xs={4} key={skills.id} className="my-md-2 ">
                  <StyledFigure>
                    <div className="skill-icon">{skills.skill}</div>
                    <figcaption>{skills.name}</figcaption>
                  </StyledFigure>
                </Col>
              );
            })}
          </Row>
          {resume && (
            <a href={resume}>
              <Button
                size="lg"
                variant={theme === "light" ? "outline-dark" : "outline-light"}
                className="mt-5"
                style={{ padding: "0.5rem 4rem", fontSize: "1.8rem" }}
              >
                R&eacute;sum&eacute;
              </Button>
            </a>
          )}
        </Container>
      </section>
    </Element>
  );
};

export default Skills;
