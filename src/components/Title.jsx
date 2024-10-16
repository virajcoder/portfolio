import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";


const TitleDiv = styled.div`
  display: inline-block;
  max-width: 90vw;
  word-wrap: break-word;
  margin: 2.5rem 0;

  .underline {
    height: 0.25rem;
    width: 75%;
    min-width: 3rem;
    border-radius: 0.25rem;
    margin: 0 auto 0 auto;
    background: ${({ theme }) =>
      theme.name === "light"
        ? "linear-gradient(to right, var(--bs-primary), #D3D3D3)"
        : "linear-gradient(to left, var(--bs-primary), var(--bs-light))"};
  }
`;


const propTypes = {
  size: PropTypes.oneOf(["h1", "h2"]),
  text: PropTypes.string.isRequired,
};

const Title = ({ size = "h1", text }) => {
  return (
    <TitleDiv>
      {size === "h1" ? (
        <h1 className="title">{text}</h1>
      ) : (
        <h2 className="title">{text}</h2>
      )}
      <div className="underline" />
    </TitleDiv>
  );
};

Title.propTypes = propTypes;


export default Title;
