import styled from "styled-components";
import React from "react";
const ExperienceCommerceStyle = styled.div`
  display: grid;
  grid-template-columns: 4.5fr 5.5fr;
  gap: 2rem;
  font-family: "Open Sans", sans-serif;
  color: #181818;
  margin-bottom: 5rem;
  & > .experience-commerce-content {
    display: flex;
    justify-content: center;
    flex-direction: column;
    margin-left: 5rem;
    & > h3 {
      margin: 0;
      font-size: 3rem;
    }
  }
  & > .experience-commerce-video {
    overflow: hidden;
    position: relative;
    & > .experience-commerce-container {
      width: 100%;
      height: 400px;
      & > iframe {
        position: absolute;
        width: 100%;
        height: 100%;
        right: 0;
        top: 0;
        border: none;
      }
    }
  }
`;
const CustomizeStyle = styled.div`
  display: flex;
  & > .content {
    width: calc(100% / 2);
    background-color: #f9f9f9;
    border-radius: 2rem 0 0 2rem;
    display: flex;
    align-items: flex-start;
    justify-content: center;
    flex-direction: column;
    font-family: "Open Sans", sans-serif;
    color: #181818;
    & > div {
      margin-left: 4rem;
      & > h3 {
        margin: 0;
        font-size: 3rem;
      }
      & > button {
        padding: 10px 1.25rem;
        border: none;
        cursor: pointer;
        background-color: #181818;
        color: #ffffff;
        border-radius: 2rem;
        font-weight: bold;
        font-size: 1.1rem;
        transform: scale(1);
        transition: all 0.2s ease-in-out;
      }
      & > button:hover {
        opacity: 0.8;
        transform: scale(1.05);
      }
    }
  }
  & > .image {
    width: calc(100% / 2);
    height: 350px;
    background-image: url("https://www.popsockets.com/dw/image/v2/BFSM_PRD/on/demandware.static/-/Library-Sites-AutobahnSharedLibrary/default/dw138ef670/images/pdp/DesignedByYou-Module.png");
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
    border-radius: 0 2rem 2rem 0;
  }
  @media screen and (max-width: 768px) {
    flex-direction: column;
    & > .image,
    & > .content {
      width: 100%;
      border-radius: 0;
    }
    & > .content {
      order: 2;
      & > div {
        margin: 2rem 0 0 10px;
        padding: 10px;
      }
    }
  }
`;
const ResExperience = styled.div`
  margin-top: 8rem;
  @media screen and (max-width: 768px) {
    & > .experience-commerce {
      display: flex;
      flex-direction: column;
      & > .experience-commerce-content {
        margin: 0;
      }
    }
    & > .experience-commerce:nth-child(2) {
      & > .experience-commerce-video {
        order: 2;
      }
    }
  }
`;
const ExperienceCommerce = () => {
  return (
    <ResExperience>
      <ExperienceCommerceStyle className="experience-commerce">
        <div className="experience-commerce-content">
          <h3 className="header-line">Reposition It</h3>
          <p>
            Missed the perfect spot to place your grip? No worries -- remove and
            reposition the grip until it's just right.
          </p>
        </div>
        <div className="experience-commerce-video">
          <div className="experience-commerce-container">
            <iframe
              style={{ width: "100%", height: "100%" }}
              src="https://player.vimeo.com/video/616544283?h=09cacc92cd&muted=1&autoplay=1&autopause=0&controls=0&loop=1&background=1&app_id=122963"
              title="video"
            ></iframe>
          </div>
        </div>
      </ExperienceCommerceStyle>
      <ExperienceCommerceStyle className="experience-commerce">
        <div className="experience-commerce-video">
          <div className="experience-commerce-container">
            <iframe
              style={{ width: "100%", height: "100%" }}
              src="https://player.vimeo.com/video/616536070?h=9b2b78dad3&muted=1&autoplay=1&autopause=0&controls=0&loop=1&background=1&app_id=122963` ? (`https://player.vimeo.com/video/616536070?h=9b2b78dad3&muted=1&autoplay=1&autopause=0&controls=0&loop=1&background=1&app_id=122963"
              title="video"
            ></iframe>
          </div>
        </div>
        <div className="experience-commerce-content">
          <h3 className="header-line">Wireless Charging</h3>
          <p>
            No cables needed. Simply remove the grip's top and rest your phone
            on any wireless charging or PopPower device.
          </p>
        </div>
      </ExperienceCommerceStyle>
      <CustomizeStyle className="customize">
        <div className="content">
          <div>
            <h3 className="title">Designed By You</h3>
            <p className="text">
              Put your photos on a PopGrip, Wallet or Phone Case.
            </p>
            <button className="customize">Customize</button>
          </div>
        </div>
        <div className="image"></div>
      </CustomizeStyle>
    </ResExperience>
  );
};
export default ExperienceCommerce;
