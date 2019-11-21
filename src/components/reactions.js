import React from 'react'
import styled from "@emotion/styled"

const Container = styled.div`
  display: flex;
  margin: auto auto;
  padding-bottom: 10px;
`;

const JoyButton = styled.div`
  flex-grow: 1;

  a {
    font-size: 26px;
    padding-right: 20px;
    text-decoration: none;
  }
`;

const ShareButtons = styled.div`
  margin: auto auto;
`;

const SocialButton = styled.a`
  padding: 5px;
`;

const url = window !== null && window.location.href;
const tweetUrl = `https://twitter.com/intent/tweet?text=${url}`;
const fbShareUrl = `https://www.facebook.com/sharer?u=${url}`;

const Reactions = () => (
  <Container>
    <JoyButton>
      <style></style>
      <div className="Widget__WidgetLayout-sc-1ityn2x-2 cJHITu">
        <h2 className="styles__Heading-sc-1lygi1f-1 Widget__Question-sc-1ityn2x-3 haLIoK">
          Did this chapter spark joy?
        </h2>
        <div className="styles__Flex-sc-1lygi1f-2 biiuQx">
          <a href={`https://spark-joy.netlify.com/c02dba9a-2eed-48d8-acd8-5b1797b5b14a/thumbsdown?instanceOfJoy=${url}`} className="Widget__RoundButton-sc-1ityn2x-1 caphDb">
            👎
          </a>
          <a href={`https://spark-joy.netlify.com/c02dba9a-2eed-48d8-acd8-5b1797b5b14a/thumbsdown?instanceOfJoy=${url}`} className="Widget__RoundButton-sc-1ityn2x-1 caphDb">
            👍
          </a>
        </div>
      </div>
    </JoyButton>
    <ShareButtons>
      <SocialButton href={tweetUrl} title="Share on facebook">
        <svg width="29" height="29" ><path d="M22.05 7.54a4.47 4.47 0 0 0-3.3-1.46 4.53 4.53 0 0 0-4.53 4.53c0 .35.04.7.08 1.05A12.9 12.9 0 0 1 5 6.89a5.1 5.1 0 0 0-.65 2.26c.03 1.6.83 2.99 2.02 3.79a4.3 4.3 0 0 1-2.02-.57v.08a4.55 4.55 0 0 0 3.63 4.44c-.4.08-.8.13-1.21.16l-.81-.08a4.54 4.54 0 0 0 4.2 3.15 9.56 9.56 0 0 1-5.66 1.94l-1.05-.08c2 1.27 4.38 2.02 6.94 2.02 8.3 0 12.86-6.9 12.84-12.85.02-.24 0-.43 0-.65a8.68 8.68 0 0 0 2.26-2.34c-.82.38-1.7.62-2.6.72a4.37 4.37 0 0 0 1.95-2.51c-.84.53-1.81.9-2.83 1.13z"></path></svg>
      </SocialButton>
      <SocialButton href={fbShareUrl} title="Share on twitter">
      <svg width="29" height="29" ><path d="M23.2 5H5.8a.8.8 0 0 0-.8.8V23.2c0 .44.35.8.8.8h9.3v-7.13h-2.38V13.9h2.38v-2.38c0-2.45 1.55-3.66 3.74-3.66 1.05 0 1.95.08 2.2.11v2.57h-1.5c-1.2 0-1.48.57-1.48 1.4v1.96h2.97l-.6 2.97h-2.37l.05 7.12h5.1a.8.8 0 0 0 .79-.8V5.8a.8.8 0 0 0-.8-.79"></path></svg>
      </SocialButton>
    </ShareButtons>
  </Container>
)

export default Reactions;