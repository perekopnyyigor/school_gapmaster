import {useState} from "react";
import ReactMarkdown from "react-markdown";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import rehypeHighlight from "rehype-highlight";
import cards from "./Cards";

function CardsRedactor()
{
    const [content, setContent] = useState("");
    return (
        <div className="container-fluid">

            <div className="row">
                <div className="col-xxl-6">
                    <Text content={content} setContent={setContent}  ></Text>
                </div>
                <div className="col-xxl-6">
                    <ShowResult content={content}></ShowResult>
                </div>
            </div>
        </div>
    );
}
function Text({content,setContent})
{
    function save()
    {


    }

    return (<div>

            <textarea
                id="text"
                onChange={(e) => setContent(e.target.value)}
                style={{height: "80vh"}}
                value={content} // Привязываем значение из состояния content
                className="form-control border-success"
            />
            <button onClick={() => save()} type="button" className="btn btn-primary p-2 m-2">Сохранить</button>

        </div>

    );
}

function ShowResult({content}) {

    let cards=separateCard(content)
    return (<div>

        <div
            style={{height: "80vh"}}
            className="overflow-auto shadow p-3 mb-5 bg-body-tertiary rounded"
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

export default  CardsRedactor;