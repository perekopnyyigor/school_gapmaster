import {useEffect, useState} from "react";
import {data, useLocation} from "react-router-dom";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import CardRedactor from "./CardRedactor";
function Cours({ id })
{
    const location = useLocation();
    const { courseId} = location.state || {};
    const navigate = useNavigate();
    const [data, setData] = useState({ chapters: [{topics:[]}] });
    const post_data = { cours_id: courseId };

    const [cardId, setCardId]=useState("");
    const [errId, setErrId]=useState("");
    const [content, setContent]=useState(<div></div>);
    useEffect(() => {
        axios.post('https://studycard.ru/index_redactor.php?action=open_cours',post_data,{ headers: { 'Content-Type': 'application/json' }} )
            .then(response => setData(response.data))
            .catch(error => console.error(error));
    }, [post_data, courseId]);


    useEffect(() => {
        if (cardId) {
            setContent(<div><CardRedactor cardId={cardId} /> <SetStatus err_id={errId} /></div>);

                    }
        else
        {
            setContent(<ErrorsList id={courseId} setCardId={setCardId} setErrId={setErrId}></ErrorsList>)
        }
    }, [cardId]);



    function toTopics(topic)
    {

        navigate('/topic', {
            state: {
                topic: {
                    id: topic.id,
                    count_cards: topic.count_cards
                }
            }
        });

    }


    return (<div className="row ">
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
            </div>
            <div className="list-group col-10 ">{content}</div>
        </div>
    );
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

function SetStatus({err_id})
{
    const [data, setData] = useState([]);
    const post_data = { err_id: err_id };
    useEffect(() => {
        axios.post('https://studycard.ru/index_redactor.php?action=set_status',post_data,{ headers: { 'Content-Type': 'application/json' }} )
            .then(response => setData(response.data))
            .catch(error => console.error(error));
    }, [err_id]);

    return("");
}

function ErrorsList({id,setCardId,setErrId})
{
    const [data, setData] = useState([]);
    const post_data = { cours_id: id };
    useEffect(() => {
        axios.post('https://studycard.ru/index_redactor.php?action=get_errors',post_data,{ headers: { 'Content-Type': 'application/json' }} )
            .then(response => setData(response.data))
            .catch(error => console.error(error));
    }, [id]);
    let checkData =[];
    for (let i=0;i<data.length;i++)
    {
        if (data[i].status==0)
            checkData.push(data[i]);
    }

    function click(id, err_id)
    {
        setCardId(id);
        setErrId(err_id);


    }
    return(
        <div className="list-group">
            <button type="button" className="list-group-item list-group-item-action active" aria-current="true">
                Список ошибок
            </button>

            {checkData.map(item => (
                <button onClick={()=>click(item.card_id,item.id)}  type="button" className="list-group-item list-group-item-action">{item.text}</button>
            ))}

        </div>);

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
            .post("https://studycard.ru/index_redactor.php?action=add_topic", post_data, {
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