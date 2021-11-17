import React from "react";
import styled from "styled-components";

const Footer = () => {
  return (
    <React.Fragment>
      <StyledFooter>
        <div className="footer">
          <div>
            <p>이용약관</p>
            <p>개인정보처리방침</p>
          </div>
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
    max-width: 1200px;
    width: 100%;
    height: 80px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0 auto;

    div {
      display: flex;
      gap: 63px;
      align-items: center;
    }
  }
`;

export default Footer;
