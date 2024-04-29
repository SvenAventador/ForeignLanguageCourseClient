import React from 'react';
import {Carousel} from 'antd';

const ChapterVideo = ({chapter_video}) => {
    return (
        <Carousel draggable={true}
                  className="custom-carousel">
            {chapter_video && chapter_video.map((item, index) => (
                <div key={index}
                     className="carousel-item">
                    <video controls
                           preload="true"
                           width="100%"
                           src={`${process.env.REACT_APP_API_PATH}${item.chapterGalleryContent}`}
                           type="video/webm"/>
                </div>
            ))}
        </Carousel>
    );
};

export default ChapterVideo;
