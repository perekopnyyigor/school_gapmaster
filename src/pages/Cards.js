import {useEffect, useState} from "react";
import {data, useLocation} from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";
import Redactor from "./Redactor";
import CardsRedactor from "./CardsRedactor";
import {c} from "react/compiler-runtime";

function Cards()
{
    const [cardId, selectCardId] = useState(null)

    const location = useLocation();
    const {topicId} = location.state || {};

    function create(topicId)
    {

        createCard(topicId);

    }
    return (<div>

        <div className="row ">

            <div className="col-2">
                <CardList topicId={topicId}  selectCardId={selectCardId}></CardList>
                <button onClick={()=>create(topicId)} type="button" className="btn btn-primary p-2 m-2">Добавить</button>
            </div>
            <div className="col-10">
                <Select cardId={cardId}></Select>
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
        .post("/index_redactor.php?action=add_card", post_data, {
            headers: { "Content-Type": "application/json" },
        })
        .then((response) => {

        })
        .catch((error) => console.error(error));

}
function Select({cardId})
{
    console.log(cardId);
    const [content, setContent]=useState(null);

    useEffect(() => {
        if (cardId) {
            setContent(<Redactor cardId={cardId} />);
        }
    }, [cardId]);

    function selectContent(form)
    {
        if (form=='redactor')
            setContent(<Redactor card={cardId} />);
        if (form=='addCard')
            setContent(<CardsRedactor/>);
    }


    return (
        <div>

            <ul className="nav nav-tabs">

                <li className="nav-item">

                    <a onClick={() => selectContent('redactor')} className="nav-link active" aria-current="page"
                       href="#">Active</a>
                </li>
                <li className="nav-item">
                    <button onClick={() => selectContent('addCard')} className="nav-link">Link</button>
                </li>
                <li className="nav-item">
                    <button onClick={() => selectContent('addCardList')} className="nav-link" >Link</button>
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
        axios.post('/index_redactor.php?action=get_topic', post_data, {headers: {'Content-Type': 'application/json'}})
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


export default Cards;