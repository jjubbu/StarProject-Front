import React from "react";
import styled from "styled-components";

const Footer = () => {
  return (
    <React.Fragment>
      <StyledFooter>
        <div className="footer">
          <div></div>
          <p>Ⓒ2021 hanghae99team14. All rights reserved.</p>
        </div>
      </StyledFooter>
    </React.Fragment>
  );
};

const StyledFooter = styled.footer`
  width: 100%;
  background: #111111;
  .footer {
    width: 1200px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0 auto;
    padding: 31px 0;
    div {
      display: flex;
      gap: 63px;
      align-items: center;
    }
  }
`;

export default Footer;
