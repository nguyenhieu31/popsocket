import styled from "styled-components";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import React, { useState, useEffect } from "react";
const ExperienceRegionStyle = styled.div`
  font-family: 'Open Sans', sans-serif;
  color: #181818;
  z-index: 0;
  &>.title{
    text-align: center;
    &>h3{
      font-size: 3rem;
      font-weight: bold;
      margin: 4rem 0 1.5rem 0;
    }
  }
  &>.experience-slider>div{
    display: flex;
    gap: 1rem;
    flex-wrap: nowrap;
    &>.card{
      width: calc(100%/3);
      &>.card-image>img{
        width: 100%;
      border-radius: 2rem;
    }
  }
`;
const ExperienceRegion = () => {
  const ListExperience = [
    {
      image:
        "https://www.popsockets.com/dw/image/v2/BFSM_PRD/on/demandware.static/-/Library-Sites-AutobahnSharedLibrary/default/dw0e1a0be6/images/pdp/PopGrip-Secure.png",
      content:
        "Enjoy a secure grip so you can text with one hand, snap better photos, and watch cat videos hands-free. Functions as a convenient stand so you can watch videos on the fly.",
    },
    {
      image:
        "https://www.popsockets.com/dw/image/v2/BFSM_PRD/on/demandware.static/-/Library-Sites-AutobahnSharedLibrary/default/dwf3af6409/images/pdp/PopGrip-Swappable.png",
      content:
        "Easily swap your grip's top -- just close the grip flat, press down and twist 90 degrees. Then you can swap in a new top or wirelessly charge your phone.",
    },
    {
      image:
        "https://www.popsockets.com/dw/image/v2/BFSM_PRD/on/demandware.static/-/Library-Sites-AutobahnSharedLibrary/default/dw35ad8bed/images/pdp/PopGrip-Mount.png",
      content:
        "Use your phone hands-free. Use with a car, desk, wall, or flex mount. Creating video content just got way easier.",
    },
  ];
  const [activeSlider, setActiveSlider] = useState(false);
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    spaceBetween: 20,
  };
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 1024) {
        setActiveSlider(true);
      } else {
        setActiveSlider(false);
      }
    };
    window.addEventListener("resize", handleResize);
    if (window.innerWidth <= 1024) {
      setActiveSlider(true);
    } else {
      setActiveSlider(false);
    }
  }, [activeSlider]);
  return (
    <ExperienceRegionStyle className="experience-region">
      <div className="title">
        <h3>Meet PopGrip</h3>
      </div>
      <div className="experience-slider">
        {activeSlider ? (
          <Slider className="active-slider" {...settings}>
            {ListExperience.map((item, index) => {
              const { image, content } = item;
              return (
                <div className="card" key={index} data-index={index}>
                  <div className="card-image">
                    <img src={image} style={{ width: "100%" }} alt="" />
                  </div>
                  <div className="card-content">
                    <p>{content}</p>
                  </div>
                </div>
              );
            })}
          </Slider>
        ) : (
          <div className="none-slider">
            {ListExperience.map((item, index) => {
              const { image, content } = item;
              return (
                <div className="card" key={index} data-index={index}>
                  <div className="card-image">
                    <img src={image} alt="" />
                  </div>
                  <div className="card-content">
                    <p>{content}</p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </ExperienceRegionStyle>
  );
};
export default ExperienceRegion;
