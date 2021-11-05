import styled from "styled-components";
import React from "react";

const Image = (props) => {
  const { shape, src, size } = props;

  const styles = {
    src: src,
    size: size,
  };

  if (shape === "circle") {
    return <ImageCircle {...styles}></ImageCircle>;
  }

  if (shape === "rectangle") {
    return (
      <AspectOutter>
        <AspectInner {...styles}></AspectInner>
      </AspectOutter>
    );
  }

  return <React.Fragment></React.Fragment>;
};

Image.defaultProps = {
  shape: "rectangle",
  src: "https://campimage.s3.ap-northeast-2.amazonaws.com/campimage.jpg",
  size: 36,
};

const AspectOutter = styled.div`
  width: 100%;
  min-width: 250px;
  overflow: hidden;
  border-radius: 10px 10px 0px 0px;
  z-index: 1;
`;

const AspectInner = styled.div`
  position: relative;
  padding-top: 75%;
  overflow: hidden;
  background-image: url("${(props) => props.src}");
  background-size: cover;
`;

const ImageCircle = styled.div`
  /* CSS에서도 변수 설정을 할 수 있다. --size라는 변수 설정해주기 */
  --size: ${(props) => props.size}px;
  /* 변수를 사용할 때에는 아래와 같이 var를 사용한다. */
  width: var(--size);
  height: var(--size);
  border-radius: var(--size);

  background-image: url("${(props) => props.src}");
  background-size: cover;
  margin: 4px;
`;

export default Image;
