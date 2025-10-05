import {useEffect, useState} from "react";
import {data, useLocation} from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";
import CardRedactor from "./CardRedactor";
import TopicRedactor from "./TopicRedactor";
import {c} from "react/compiler-runtime";
import TaskTable from "./TaskTable";

function Topic()
{

    const [cardId, selectCardId] = useState(null)

    const location = useLocation();
    const {topic} = location.state || {};

    function create(topicId)
    {

        createCard(topicId);

    }
    return (<div>

        <div className="row ">

            <div className="col-2">
                <CardList topicId={topic.id}  selectCardId={selectCardId}></CardList>
                <button onClick={()=>create(topic.id)} type="button" className="btn btn-primary p-2 m-2">Добавить</button>
            </div>
            <div className="col-10">
                <Select cardId={cardId} topicId={topic.id} ></Select>
            </div>
            </div>
        </div>
    );
}
function createCard(topic_id)
{

    const post_data = {
        topic_id:topic_id,
        card_name:"new card",
        card_mark:"content",
        type:1,
        visible:2,
        task:""
    };

    axios
        .post("https://studycard.ru/index_redactor.php?action=add_card", post_data, {
            headers: { "Content-Type": "application/json" },
        })
        .then((response) => {

        })
        .catch((error) => console.error(error));

}
function Select({cardId,topic_id})
{

    const [content, setContent]=useState(null);

    useEffect(() => {
        if (cardId) {
            setContent(<CardRedactor cardId={cardId} />);
        }
    }, [cardId]);

    function selectContent(form)
    {
        if (form=='redactor')
            setContent(<CardRedactor card={cardId} />);
        if (form=='addCard')
            setContent(<TopicRedactor topicId={topic_id}/>);
        if (form=='taskTable')
            setContent(<TaskTable topicId={topic_id}/>);
    }


    return (
        <div>

            <ul className="nav nav-tabs">

                <li className="nav-item">

                    <button onClick={() => selectContent('redactor')} className="nav-link active" aria-current="page"
                       >Редактор</button>
                </li>
                <li className="nav-item">
                    <button onClick={() => selectContent('addCard')} className="nav-link">Список</button>
                </li>
                <li className="nav-item">
                    <button onClick={() => selectContent('taskTable')} className="nav-link" >Задания</button>
                </li>
                <li className="nav-item">
                    <button className="nav-link disabled" aria-disabled="true">Disabled</button>
                </li>
            </ul>

            <p>{content}</p>
        </div>
    )
}
function CardList({selectCardId,topicId,cardListTrig}) {



    const [data, setData] = useState({cards: []});
    const post_data = {topic_id: topicId};


    useEffect(() => {
        axios.post('https://studycard.ru/index_redactor.php?action=get_topic', post_data, {headers: {'Content-Type': 'application/json'}})
            .then(response => setData(response.data))
            .catch(error => console.error(error));
    }, [post_data]);



    return(
        <div style={{height: "90vh"}}
             className="overflow-auto shadow list-group ">
            <button  type="button" id={data.id}  className="list-group-item list-group-item-action active" aria-current="true">
                {data.name}
            </button>
            {data.cards.map(item => (
                <div key={item.id}>
                    <button  onClick={()=>selectCardId(item.id)} type="button"  className="list-group-item list-group-item-action">{item.name}</button>
                </div>
            ))}


        </div>);
}


export default Topic;