import React from "react";
import "./card.scss";
import Image from "next/image";
import Skeleton from "react-loading-skeleton";

export interface ICard {
  // base
  info?: {
    img: string;
    title: string;
    redactor: string;
    description: string;
    date: string;
  };

  //events
  onClick?: () => void;
}

export default function Card({ info, onClick }: ICard) {
  return (
    <>
      {info ? (
        <div className="card is-clickable" onClick={() => onClick && onClick()}>
          <div className="card-image">
            <figure className="image is-4by3">
              <Image
                src={info.img}
                alt="Placeholder image"
                width={400}
                height={400}
              />
            </figure>
          </div>
          <div className="card-content">
            <div className="media">
              <div className="media-content">
                <p className="title is-4">{info.title}</p>
                <p className="subtitle is-6">@{info.redactor}</p>
              </div>
            </div>
            <div className="content">
              <p className="mb-4">{info.description}</p>
              <br />
              <time>{info.date}</time>
            </div>
          </div>
        </div>
      ) : (
        <div className="card is-clickable" onClick={() => onClick && onClick()}>
          <div className="card-image">
            <figure className="image is-4by3">
              <Image
                src="https://bulma.io/images/placeholders/1280x960.png"
                alt="Placeholder image"
                width={500}
                height={500}
              />
            </figure>
          </div>
          <div className="card-content">
            <div className="media">
              <div className="media-content">
                {/* <p className="title is-4">{info.title}</p> */}
                <Skeleton count={2} width={"100%"} />
                {/* <p className="subtitle is-6">@{info.redactor}</p> */}
                <Skeleton count={1} width={"150px"} />
              </div>
            </div>
            <div className="content">
              {/* {info.description} */}
              <Skeleton count={8} width={"100%"} />
              <br />
              {/* <time>{info.date}</time> */}
              <Skeleton count={1} width={"90px"} />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
