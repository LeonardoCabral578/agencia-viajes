import Image from "next/image";
import React from "react";
import Skeleton from "react-loading-skeleton";

export interface IHero {
  img?: any;
  title?: string;
  sub_title?: string;
}

export const Hero = ({ img, title, sub_title }: IHero) => {
  return (
    <>
      {img ? (
        <div className="hero relative">
          <Image
            src={img}
            alt="Banner"
            className="hero__img"
            width={1920}
            height={1080}
          />
          <div className="hero__texts absolute flex flex-col items-center justify-center">
            <h1 className="title text-5xl mb-3 text-center text-white">
              {title}
            </h1>
            <h6 className="title text-base text-center text-white">
              {sub_title}
            </h6>
          </div>
        </div>
      ) : (
        <>
          <div className="hero">
            <Image
              src="https://i.imgur.com/v32KScw.png"
              alt="Banner"
              className="hero__img"
              width={1000}
              height={500}
            />
            <div className="hero__texts is-absolute is-flex is-flex-direction-column is-align-items-center is-justify-content-center">
              {/* <h1 className="title is-1 has-text-centered has-text-white">
                {title}
              </h1> */}
              <Skeleton height={"40px"} width={"800px"} count={2} />
              {/* <h6 className="title is-6 has-text-centered has-text-white">
                {sub_title}
              </h6> */}
              <Skeleton width={"300px"} count={2} />
            </div>
          </div>
        </>
      )}
    </>
  );
};
