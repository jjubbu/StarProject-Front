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
  contents: "캠핑/차박 커뮤니티",
  url: "https://stellakorea.co.kr/",
  frame: "%PUBLIC_URL%/Frame.png",
};

export default HelmetComp;
