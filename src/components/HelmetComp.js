import React from "react";
import { Helmet } from "react-helmet";

const HelmetComp = (props) => {
  const { title, contents, url, frame } = props;
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="title" content={title} data-react-helmet="true" />
      <meta name="description" content={contents} data-react-helmet="true" />

      <meta property="og:type" content="website" data-react-helmet="true" />
      <meta property="og:url" content={url} data-react-helmet="true" />
      <meta property="og:title" content={title} data-react-helmet="true" />
      <meta
        property="og:description"
        content={contents}
        data-react-helmet="true"
      />
      <meta property="og:image" content={frame} />

      <meta
        property="twitter:card"
        content="summary_large_image"
        data-react-helmet="true"
      />
      <meta property="twitter:url" content={url} data-react-helmet="true" />
      <meta property="twitter:title" content={title} data-react-helmet="true" />
      <meta
        property="twitter:description"
        content={contents}
        data-react-helmet="true"
      />
      <meta property="twitter:image" content={frame} data-react-helmet="true" />
    </Helmet>
  );
};

HelmetComp.defaultProps = {
  title: "별보러가지않을래?",
  contents:
    "캠핑 차박하실때 불멍만 즐기셨나요? 이제는 별도 구경해보세요! 별이 잘보이는 장소,날씨 정보보시고 나만의 캠핑,차박 장소도 공유 해보세요!",
  url: "https://stellakorea.co.kr/",
  frame:
    "https://stella-image-storage.s3.ap-northeast-2.amazonaws.com/Frame.png",
};

export default HelmetComp;
