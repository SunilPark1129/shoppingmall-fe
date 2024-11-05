import React, { useEffect, useState } from "react";
import { bannerImages } from "../utils/bannerImg";
import "../styles/banner.css";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";

function Banner() {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [progress, setProgress] = useState("");

  function nextSlide(val, isNext, isDot) {
    let nextIdx = val;

    if (!isDot) {
      nextIdx = isNext ? val + 1 : val - 1;
    }

    if (nextIdx === -1) nextIdx = bannerImages.length - 1;
    else if (nextIdx === bannerImages.length) nextIdx = 0;

    setCurrentIdx(nextIdx);
  }

  useEffect(() => {
    const progressTimer = setTimeout(() => {
      setProgress("progressbar--active");
    }, 50);

    const timer = setInterval(() => {
      nextSlide(currentIdx, true);
    }, 8100);

    return () => {
      clearInterval(timer);
      clearTimeout(progressTimer);
      setProgress("");
    };
  }, [currentIdx]);

  return (
    <div>
      <div className="banner">
        <div className="wrapper">
          <SlideImageComponent currentIdx={currentIdx} />
          <div className="banner__content">
            <TextComponent currentIdx={currentIdx} />
          </div>
          <div className="banner__transport">
            <DotsComponent nextSlide={nextSlide} currentIdx={currentIdx} />
            <ArrowComponent nextSlide={nextSlide} currentIdx={currentIdx} />
          </div>
        </div>
      </div>
      <Progressbar progress={progress} />
    </div>
  );
}

function SlideImageComponent({ currentIdx }) {
  return bannerImages.map(({ image }, idx) => (
    <div
      key={idx}
      className={`banner__image ${
        currentIdx === idx && "banner__image--active"
      }`}
    >
      <div className="wrapper">
        <div className="banner__image__box">
          <img
            src={image.src}
            alt={image.alt}
            srcSet={image.srcSet}
            sizes={image.sizes}
          />
          <div className="banner__image__box__bg"></div>
        </div>
      </div>
    </div>
  ));
}

function TextComponent({ currentIdx }) {
  return (
    <section className={`banner__text`}>
      <h2 className={`banner__text__color`}>
        {bannerImages[currentIdx].heading.text}
      </h2>
      <div className="banner__text__desc">
        <p className={`banner__text__color`}>
          <FontAwesomeIcon icon={faInfoCircle} />{" "}
          {bannerImages[currentIdx].paragraph.text}
        </p>
        {/* TENOIRARY NOT USING */}
        {bannerImages[currentIdx].link?.has && (
          <Link
            className={`banner__text__link`}
            to={bannerImages[currentIdx].link?.href ?? "/"}
          >
            {bannerImages[currentIdx].link?.label}
          </Link>
        )}
      </div>
    </section>
  );
}

function DotsComponent({ nextSlide, currentIdx }) {
  return (
    <div className={`banner__dots`}>
      <div className="banner__dots__num">01</div>
      {bannerImages.map(({ id }, idx) => (
        <button
          onClick={() => nextSlide(idx, false, true)}
          className={`banner__dots__item ${
            currentIdx === idx && "banner__dots__item--active"
          }`}
          key={id}
        ></button>
      ))}
      <div className="banner__dots__num">0{bannerImages.length}</div>
    </div>
  );
}

function ArrowComponent({ nextSlide, currentIdx }) {
  return (
    <div className={`banner__arrow`}>
      <button onClick={() => nextSlide(currentIdx, false)}>
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M19 1L5 11.4708L19 23" strokeLinecap="round" />
        </svg>
      </button>
      <button onClick={() => nextSlide(currentIdx, true)}>
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M19 1L5 11.4708L19 23" strokeLinecap="round" />
        </svg>
      </button>
    </div>
  );
}

function Progressbar({ progress }) {
  return (
    <div className="progressbar">
      <div className="progressbar__cover">
        <div className={`progressbar__cover__bar ${progress}`}></div>
      </div>
    </div>
  );
}
export default Banner;
