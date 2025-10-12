import {useState} from "react";
import ReactMarkdown from "react-markdown";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import rehypeHighlight from "rehype-highlight";
import cards from "./Topic";
import axios from "axios";
import {useLocation} from "react-router-dom";
import {c} from "react/compiler-runtime";
import Markdown from "../../components/Markdown";
import TextArea from "../../components/TextArea";
import AskDeepSeek from "../../components/AskDeepSeek";
function TopicRedactor()
{
    const location = useLocation();
    const {topic} = location.state || {};

    const [content, setContent] = useState("");
    const [prompt, setPrompt] = useState("");

    return (
        <div className="container-fluid">

            <div className="row">
                <div className="col-xxl-6">
                    <Text content={content} setContent={setContent}></Text>
                    <Prompt prompt={prompt} setPrompt={setPrompt}></Prompt>
                    <SaveCards content={content} topicId={topic.id}></SaveCards>

                    <AskDeepSeek setContent={setContent} content={content}></AskDeepSeek>

                </div>
                <div className="col-xxl-6">
                    <ShowResult content={content}></ShowResult>
                    <Replace content={content} setContent={setContent}></Replace>

                </div>
            </div>
        </div>
    );
}
function SaveCards({content,topicId})
{
    function save()
    {
        let cards=separateCard(content)
        createCard(cards,topicId)


    }
    return (<button onClick={() => save()} type="button" className="btn btn-primary p-2 m-2">Сохранить</button>)
}



function Text({content, setContent}) {


    return (<div>

            <TextArea content={content} setContent={setContent} height={75}></TextArea>

        </div>

    );
}
function Prompt({prompt, setPrompt}) {


    return (<div>

            <TextArea content={prompt} setContent={setPrompt} height={10}></TextArea>

        </div>

    );
}
function ShowResult({content}) {

    let cards=separateCard(content)
    return (<div>

        <div
            style={{height: "75vh"}}
            className="overflow-auto shadow p-1 mb-1 bg-body-tertiary rounded"
        >
               <ShowCards cards={cards}></ShowCards>
        </div>
    </div>);
}
function separateCard(content)
{

    let separ_card=[];
    let cards=[];
    separ_card = content.split("{card}");

    for (let i=0; i<separ_card.length;i++)
    {

        let temp_card={};
        let card_arr = separ_card[i].split("{name}");

        temp_card.name = card_arr[0];
        temp_card.content = card_arr[1];

        cards.push(temp_card);

    }
    return cards;

}
function Replace({content, setContent}) {

    const [find, setFind]=useState("")
    const [change, setChange]=useState("")



    function replace()
    {
        let newContent = content.toString().split(find).join(change);
        setContent(newContent);
    }


    return (
        <div>

                <div className="col-auto">
                    <label htmlFor="inputPassword2" className="visually-hidden p-2 m-2">Найти</label>
                    <input type="text" onChange={(e) => setFind(e.target.value)} className="form-control p-2 m-2" id="inputPassword2" placeholder="Найти"/>
                </div>
                <div className="col-auto">
                    <label htmlFor="inputPassword2" className="visually-hidden p-2 m-2 ">Заменить</label>
                    <input type="text" onChange={(e) => setChange(e.target.value)}  className="form-control p-2 m-2" id="inputPassword2" placeholder="Заменить"/>
                </div>
                <div className="col-auto">
                    <button type="button" onClick={replace} className="btn btn-primary p-2 m-2">Заменить</button>
                </div>

        </div>
    );
}
function ShowCards({cards})
{
    return (<div>
        {cards.map(card => (<div><h2>{card.name}</h2>
            <Markdown content={card.content}></Markdown>
            </div>))}
</div>)
}

function createCard(inputCards, topicId)
{


            let cards=[];

            for (let i=0;i<inputCards.length-1;i++)
            {
                let content = inputCards[i].content;
                content = content.split("\\").join("slash");
                content = content.split("\'").join("apostrof");

                let card = {
                    topic_id: topicId,
                    card_name: inputCards[i].name,
                    card_mark: content,
                    type: 1,
                    visible: 2,
                    task: ""
                }
                cards.push(card);
            }


            const post_data = {
                cards:cards
            };

            axios
                .post("https://studycard.ru/index_redactor.php?action=add_cards", post_data, {
                    headers: { "Content-Type": "application/json" },
                })

                .then((response) => {
                 //alert(response.data)
                })
                .catch((error) => console.error(error));

}




export default  TopicRedactor;