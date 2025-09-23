import {useState} from "react";
import ReactMarkdown from "react-markdown";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import rehypeHighlight from "rehype-highlight";
import cards from "./Cards";
import axios from "axios";
import {useLocation} from "react-router-dom";
import {c} from "react/compiler-runtime";

function CardsRedactor()
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
                    <AskDeepSeek setContent={setContent} content={content} prompt={prompt}></AskDeepSeek>

                </div>
                <div className="col-xxl-6">
                    <ShowResult content={content}></ShowResult>
                    <Replace content={content} setContent={setContent}></Replace>
                    <AskDeepSeekChain setContent={setContent} content={content}></AskDeepSeekChain>
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


function AskDeepSeekChain({content, setContent}) {
    const [isLoading, setIsLoading] = useState(false);

    let prompt1="Отформатируй статью. \n" +
        "Статья должна быть разбита на небольшие абзацы, каждый обзац должен быть озаглавлен. \n" +
        "В конце названия должен стоять маркер {name}, в конце абзаца маркер {card}";

    let prompt2="Сделай из данного текста задания, то есть выдели маркером {m} \n" +
        "те слова которые пользователь должен будет вставить например\n" +
        " \n" +
        "Если точка $$M$$ числовой окружности со­ ответствует числу $$t$$, \n" +
        "то абсциссу точки $$M$$ называют {m}косинусом{m} числа $$t$$ \n" +
        "а ординату точки $$M$$ называют {m}синусом{m} числа $$t$$";

    async function askAI(question) {
        const apiKey = "sk-c1c6d82e3f92484497f0e79700d3db3a";

        const response = await fetch("https://api.deepseek.com/chat/completions", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${apiKey}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                model: "deepseek-chat",
                messages: [
                    {"role": "system", "content": "You are a helpful assistant"},
                    {"role": "user", "content": question}
                ],
                stream: false
            })
        });

        const data = await response.json();
        return data.choices[0].message.content;
    }

    async function runAllSteps() {
        setIsLoading(true);

        try {
            // Шаг 1: Первый вопрос
            const answer1 = await askAI(prompt1 + content);

            const answer2 = await askAI(prompt2 + answer1);

            setContent(answer2);



        } catch (error) {
            console.error("Error:", error);
        } finally {
            setIsLoading(false);
        }

    }

    return (
        <button
            onClick={runAllSteps}
            disabled={isLoading}
            className="btn btn-primary p-2 m-2"
        >
            {isLoading ? 'Выполняю последовательность...' : 'Запустить цепочку вопросов'}
        </button>
    );
}
function AskDeepSeek({content,prompt,setContent})
{

    async function sendMessage() {
        const apiKey = "sk-c1c6d82e3f92484497f0e79700d3db3a";
        const apiUrl = "https://api.deepseek.com/chat/completions";

        try {
            const response = await fetch(apiUrl, {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${apiKey}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    model: "deepseek-chat",
                    messages: [
                        {"role": "system", "content": "You are a helpful assistant"},
                        {"role": "user", "content": prompt + content}
                    ],
                    stream: false
                })
            });

            const data = await response.json();
            console.log("Response:", data.choices[0].message.content);
            setContent(data.choices[0].message.content);
        } catch (error) {
            console.error("Error:", error);
        }
    }

    return (<button onClick={() => sendMessage()} type="button" className="btn btn-primary p-2 m-2">Спросить</button>)
}
function Text({content, setContent}) {


    return (<div>

            <textarea
                id="text"
                onChange={(e) => setContent(e.target.value)}
                style={{height: "75vh"}}
                value={content} // Привязываем значение из состояния content
                className="form-control border-success"
            />


        </div>

    );
}
function Prompt({prompt, setPrompt}) {


    return (<div>

            <textarea
                id="text"
                onChange={(e) => setPrompt(e.target.value)}
                style={{height: "10vh"}}
                value={prompt} // Привязываем значение из состояния content
                className="form-control border-success"
            />


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
            <ReactMarkdown
                remarkPlugins={[remarkMath]} // Поддержка математических формул
                rehypePlugins={[rehypeKatex, rehypeHighlight]} // Рендер формул с помощью KaTeX

                skipHtml={true} // Игнорировать HTML, если нужно
            >
                {card.content}
            </ReactMarkdown></div>))}
</div>)
}

function createCard(inputCards, topicId)
{
    //content = content.split("\\").join("slash");
    //content = content.split("\'").join("apostrof");

            let cards=[];

            for (let i=0;i<inputCards.length-1;i++)
            {
                let card = {
                    topic_id: topicId,
                    card_name: inputCards[i].name,
                    card_mark: inputCards[i].content,
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
                .post("/index_redactor.php?action=add_cards", post_data, {
                    headers: { "Content-Type": "application/json" },
                })

                .then((response) => {
                 //alert(response.data)
                })
                .catch((error) => console.error(error));

}




export default  CardsRedactor;