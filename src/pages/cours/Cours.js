import {useEffect, useState} from "react";
import {data, useLocation} from "react-router-dom";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import CardRedactor from "../card/CardRedactor";
import TopicList from "./TopicList";
import ErrorsList from "./ErrorList";
import CreateTopic from "./CreateTopic";
function Cours({ id })
{
    const location = useLocation();
    const { courseId} = location.state || {};

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




    return (<div className="row ">
            <div className="list-group col-2 ">
                <button type="button" className="list-group-item list-group-item-action active" aria-current="true">
                    {data.name}
                </button>
                {data.chapters.map(item => (<div>
                    <TopicList item={item}></TopicList>
                    <CreateTopic chapterId={item.id}></CreateTopic></div>
                ))}
            </div>
            <div className="list-group col-10 ">{content}</div>
        </div>
    );
}




function SetStatus({err_id}) {
    const [data, setData] = useState([]);
    const post_data = {err_id: err_id};
    useEffect(() => {
        axios.post('https://studycard.ru/index_redactor.php?action=set_status',post_data,{ headers: { 'Content-Type': 'application/json' }} )
            .then(response => setData(response.data))
            .catch(error => console.error(error));
    }, [err_id]);

    return("");
}



export default Cours;