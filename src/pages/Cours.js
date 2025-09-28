import {useEffect, useState} from "react";
import {data, useLocation} from "react-router-dom";
import axios from "axios";
import {useNavigate} from "react-router-dom";
function Cours({ id })
{
    const location = useLocation();
    const { courseId} = location.state || {};
    const navigate = useNavigate();
    const [data, setData] = useState({ chapters: [{topics:[]}] });
    const post_data = { cours_id: courseId };

    useEffect(() => {
        axios.post('/index_redactor.php?action=open_cours',post_data,{ headers: { 'Content-Type': 'application/json' }} )
            .then(response => setData(response.data))
            .catch(error => console.error(error));
    } );


    function toTopics(topic)
    {

        navigate('/topic', {
            state: {
                topic: { // Передаем весь объект topic
                    id: topic.id,
                    count_cards: topic.count_cards
                }
            }
        });

    }


    return(
        <div className="list-group col-2 ">
            <button type="button" className="list-group-item list-group-item-action active" aria-current="true">
                {data.name}
            </button>
            {data.chapters.map(item => (
                <div>
                    <button type="button" className="list-group-item list-group-item-action list-group-item-primary">
                        <Strong chapter={item}></Strong>
                    </button>
                    {item.topics.map(item => (
                        <div>

                            <button type="button" onClick={() => toTopics(item)}
                                    className="list-group-item list-group-item-action">
                                <Strong chapter={item}></Strong>
                                <Progress count={item.count_cards}></Progress>
                            </button>

                        </div>
                    ))}
                    <CreateTopic chapterId={item.id}></CreateTopic>
                </div>

            ))}


        </div>);
}
function Strong({chapter})
{
    if (chapter.visible==1)
        return <strong>{chapter.name}</strong>
    else
        return chapter.name;

}
function Progress({count}) {
    let name;
    if(count<=10)
        name="progress-bar bg-danger";
    else if(count>10 && count<=20)
        name="progress-bar bg-warning text-dark";
    else if(count>20 && count<=30)
        name="progress-bar bg-success";
    else
        name="progress-bar";

    return (
        <div className="progress" role="progressbar" aria-label="Success example" aria-valuenow={count} aria-valuemin="0"
             aria-valuemax="100">
            <div className={name} style={{ width: `${count*2}%` }}>{count}</div>
        </div>
    );
}

function CreateTopic({chapterId})
{



    function create()
    {
        let topicName = window.prompt("Введите название");


        const post_data = {
            topic_name:topicName,
            chapter_id:chapterId

        };

        axios
            .post("/index_redactor.php?action=add_topic", post_data, {
                headers: { "Content-Type": "application/json" },
            })
            .then((response) => {

            })
            .catch((error) => console.error(error));
    }

    return (<div>



                    <button onClick={()=>create()} type="button" className="btn btn-primary p-2 m-2">Добавить тему</button>
                </div>


    );
}
export default Cours;