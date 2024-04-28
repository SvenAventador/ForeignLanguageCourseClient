import React from 'react';
import {
    useNavigate,
    useParams
} from "react-router-dom";
import {getOne} from "../../http/chapter";
import ChapterVideo from "../../components/carousel/ChapterVideo";
import {TEST_PATH} from "../../utils/consts";

const Chapter = () => {
    const {id} = useParams()
    const [oneChapter, setOneChapter] = React.useState([])
    const navigate = useNavigate()

    React.useEffect(() => {
        getOne(id).then(({chapter}) => {
            setOneChapter(chapter)
        })
    }, [id])

    return (
        <section className="chapter">
            <div className="chapter__container">
                <div className="chapter__image">
                    <img src={`${process.env.REACT_APP_API_PATH}${oneChapter.chapterImage}`}
                         alt="chapter logotype"/>
                </div>
                <div className="chapter__title">
                    {oneChapter.chapterName}
                </div>

                {
                    oneChapter.chapter_contents && oneChapter.chapter_contents.map((item, index) => (
                        <div className="chapter__list" key={index}>
                            <p>{item.chapterContent}</p>
                        </div>
                    ))
                }

                {
                    oneChapter &&
                    oneChapter.chapter_galleries &&
                    <ChapterVideo chapter_video={oneChapter.chapter_galleries}/>
                }

                <button className="btn-reset chapter__btn"
                        onClick={() => navigate(`${TEST_PATH}/${id}`)}>
                    Перейти к тесту!
                </button>

            </div>
        </section>
    );
};

export default Chapter;
