import React from "react";
import AutoPlayVideo from "./louisvuittonvideo";
import Cards from "./cards";
import Cards2 from "./cards2";
import styles from "./louisvuitonvideo.module.css";
import Reproductor from "./reproductorvideo";

const Lvcomponent = () => {
  const videoSource =
    "https://nerdy-my-ecommerce.s3.us-east-2.amazonaws.com/Fendi/Inaki/videoLV/louisvuitton_video.mp4";
  const img = [
    "https://nerdy-my-ecommerce.s3.us-east-2.amazonaws.com/LV/i%C3%B1aki/imgLV_01.avif",
    "https://nerdy-my-ecommerce.s3.us-east-2.amazonaws.com/LV/i%C3%B1aki/imgLV_02.avif",
    "https://nerdy-my-ecommerce.s3.us-east-2.amazonaws.com/LV/i%C3%B1aki/imgLV_03.avif",
    "https://nerdy-my-ecommerce.s3.us-east-2.amazonaws.com/LV/i%C3%B1aki/imgLV_04.avif",
    "https://nerdy-my-ecommerce.s3.us-east-2.amazonaws.com/LV/i%C3%B1aki/imgLV_05.avif",
    "https://nerdy-my-ecommerce.s3.us-east-2.amazonaws.com/LV/i%C3%B1aki/imgLV_06.avif",
    "https://nerdy-my-ecommerce.s3.us-east-2.amazonaws.com/LV/i%C3%B1aki/imgLV_07.avif",
    "https://nerdy-my-ecommerce.s3.us-east-2.amazonaws.com/LV/i%C3%B1aki/imgLV_08.avif",
    "https://nerdy-my-ecommerce.s3.us-east-2.amazonaws.com/LV/i%C3%B1aki/imgLV_09.avif",
    "https://nerdy-my-ecommerce.s3.us-east-2.amazonaws.com/LV/i%C3%B1aki/imgLV_010.avif",
    "https://nerdy-my-ecommerce.s3.us-east-2.amazonaws.com/LV/i%C3%B1aki/imgLV_011.avif",
    "https://nerdy-my-ecommerce.s3.us-east-2.amazonaws.com/LV/i%C3%B1aki/imgLV_012.avif",
    "https://nerdy-my-ecommerce.s3.us-east-2.amazonaws.com/LV/i%C3%B1aki/imgLV_013.avif",
    "https://nerdy-my-ecommerce.s3.us-east-2.amazonaws.com/LV/i%C3%B1aki/imgLV_014.avif",
    "https://nerdy-my-ecommerce.s3.us-east-2.amazonaws.com/LV/i%C3%B1aki/imgLV_015.avif",
    "https://nerdy-my-ecommerce.s3.us-east-2.amazonaws.com/LV/i%C3%B1aki/imgLV_016.avif",
    "https://nerdy-my-ecommerce.s3.us-east-2.amazonaws.com/LV/i%C3%B1aki/imgLV_017.avif",
    "https://nerdy-my-ecommerce.s3.us-east-2.amazonaws.com/LV/i%C3%B1aki/imgLV_018.avif",
    "https://nerdy-my-ecommerce.s3.us-east-2.amazonaws.com/LV/i%C3%B1aki/imgLV_019.avif",
    "https://nerdy-my-ecommerce.s3.us-east-2.amazonaws.com/LV/i%C3%B1aki/imgLV_020.avif",
  ];
  const img2 = [
    "https://nerdy-my-ecommerce.s3.us-east-2.amazonaws.com/LV/i%C3%B1aki/imgLV_segundafila_01.avif",
    "https://nerdy-my-ecommerce.s3.us-east-2.amazonaws.com/LV/i%C3%B1aki/imgLV_segundafila_02.avif",
    "https://nerdy-my-ecommerce.s3.us-east-2.amazonaws.com/LV/i%C3%B1aki/imgLV_segundafila_03.avif",
    "https://nerdy-my-ecommerce.s3.us-east-2.amazonaws.com/LV/i%C3%B1aki/imgLV_segundafila_04.avif",
    "https://nerdy-my-ecommerce.s3.us-east-2.amazonaws.com/LV/i%C3%B1aki/imgLV_segundafila_05.avif",
    "https://nerdy-my-ecommerce.s3.us-east-2.amazonaws.com/LV/i%C3%B1aki/imgLV_segundafila_06.avif",
    "https://nerdy-my-ecommerce.s3.us-east-2.amazonaws.com/LV/i%C3%B1aki/imgLV_segundafila_07.avif",
    "https://nerdy-my-ecommerce.s3.us-east-2.amazonaws.com/LV/i%C3%B1aki/imgLV_segundafila_08.avif",
    "https://nerdy-my-ecommerce.s3.us-east-2.amazonaws.com/LV/i%C3%B1aki/imgLV_segundafila_09.avif",
    "https://nerdy-my-ecommerce.s3.us-east-2.amazonaws.com/LV/i%C3%B1aki/imgLV_segundafila_10.avif",
    "https://nerdy-my-ecommerce.s3.us-east-2.amazonaws.com/LV/i%C3%B1aki/imgLV_segundafila_11.avif",
    "https://nerdy-my-ecommerce.s3.us-east-2.amazonaws.com/LV/i%C3%B1aki/imgLV_segundafila_12.avif",
    "https://nerdy-my-ecommerce.s3.us-east-2.amazonaws.com/LV/i%C3%B1aki/imgLV_segundafila_13.avif",
    "https://nerdy-my-ecommerce.s3.us-east-2.amazonaws.com/LV/i%C3%B1aki/imgLV_segundafila_14.avif",
  ];

  const video1 =
    "https://nerdy-my-ecommerce.s3.us-east-2.amazonaws.com/Fendi/Inaki/videoLV/SaveTube.io-Rosal%C3%ADa+Performing+%E2%80%9CCandy%E2%80%9D+Live+in+Paris+for+.mp4";

  return (
    <div className={styles.wrapperAll}>
      <AutoPlayVideo videoSource={videoSource} />
      <div className={styles.wrapper}>
        <h2>Women's Spring-Summer 2023 Fashion Show</h2>
        <span className={styles.span1}>
          Nicolas Ghesquière presented his Louis Vuitton Spring-Summer 2023
          Women's collection in Paris on Tuesday, October 4 at 4:00 p.m. (CEST).
        </span>
        <h3>Looks</h3>
        <span className={styles.span2}>
          Putting femininity in the spotlight, the Spring-Summer 2023 Collection
          changes the game of proportions, using the emphasis as a figure of
          style, where the infinitely large and the infinitely small come
          together in a single silhouette. The House's signatures that have
          become ingrained in Louis Vuitton's DNA take on a disproportionate
          quality, becoming an integral part of the collection's narrative.
          Finding this new balance on the scale, zippers and snaps become
          oversized, zippers become belt buckles, and a piece of leather becomes
          a suit.
        </span>
        <Cards img={img} />
        <h4>Details</h4>
        <span className={styles.span2}>
          When approaching the elements of women's clothing, proportions and
          scales are reinvented, creating silhouettes in which details reign. 3D
          printed belts take on a top effect, while the pleats of a kilt widen
          and become flat pleated dresses, adding a playful and unique look.
          Nicolas Ghesquière also uses an embroidery that simulates a macro
          tweed, created using a 3D scanner and enlarging each image to
          highlight each thread and its texture. Using emphasis as a figure of
          style, a selection of bags take on disproportionate details, while
          others are recreated with dramatic proportions.
        </span>
        <Cards2 img2={img2} />
        <h4>Cour Carrée du Louvre</h4>
        <span className={styles.span2}>
          In the majestic surroundings of the Louvre in Paris, the Louis Vuitton
          Spring-Summer 2023 Collection is presented in the museum's Cour
          Carrée. For the first time, Nicolas Ghesquière has invited leading
          French contemporary artist Philippe Parreno and production designer
          James Chinlund to conceptualize the event's spectacular scenography.
          With metal grilles, mirrors and a myriad of light bulbs evoking a
          fairground ride, the set centers on a bright red "monster flower" with
          golden stamens rising dramatically into the Parisian sky.
        </span>
        <Reproductor video={video1} />
      </div>
    </div>
  );
};

export default Lvcomponent;
