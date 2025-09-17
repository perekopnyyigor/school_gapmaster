import {useEffect, useState} from "react";
import {data, useLocation} from "react-router-dom";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import "katex/dist/katex.min.css";
import rehypeHighlight from 'rehype-highlight';
import 'highlight.js/styles/github.css'; // Импорт стиля
function Redactor({cardId})
{
    console.log(cardId);
    const [content, setContent] = useState("");
    const [cardData, setCardData] = useState({});
    useEffect(() => {
        const post_data = { card_id: cardId };

        axios
            .post("/index_redactor.php?action=get_card", post_data, {
                headers: { "Content-Type": "application/json" },
            })
            .then((response) => {
                setCardData(response.data);
                setContent(response.data.content_mark); // Устанавливаем начальное значение контента

            })
            .catch((error) => console.error(error));
    }, [cardId]); // Следим за изменением cardId


    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-xxl-6">
                    <Text  setContent={setContent} content={content}></Text>

                </div>
                <div className="col-xxl-6">
                    <ShowResult content={content}></ShowResult>
                </div>
            </div>
        </div>
    );
}
function Text({content,setContent, data})
{

    return (<div><textarea
            id="text"
            onChange={(e)=>setContent(e.target.value)}
            style={{height: "90vh"}}
            value={content} // Привязываем значение из состояния content
            className="form-control border-success"
        />
            <button  type="button" className="btn btn-primary p-2 m-2">Сохранить</button>
            <input type="file" name="file_variant" /></div>

    );
}
function withoutAnswer(content)
{
    let contentArr = content.toString().split("{m}");
    let newContent ="";
    for (let i=0;i<contentArr.length;i++)
    {
        if(i%2==0)
            newContent += contentArr[i];
        else
            newContent +="...";
    }
    return newContent;

}
function getVariant(content)
{
    let contentArr = content.toString().split("{m}");
    let newContent ="";
    for (let i=0;i<contentArr.length;i++)
    {
        if(i%2==1)
        {
            if (contentArr[i].indexOf("{f}") >= 0)
                newContent += "[ $$ "+contentArr[i]+" $$ ]   ";
            else
                newContent += "["+contentArr[i]+"]   ";
        }


    }
    newContent = newContent.toString().split("{f}").join(" ");
    newContent = newContent.toString().split("{n}").join(" ");
    return newContent;

}
function ShowResult({content}) {
    let contentWithoutAnswer=withoutAnswer(content)
    let variants = getVariant(content);
    return (<div
        style={{height: "90vh"}}
        className="overflow-auto shadow p-3 mb-5 bg-body-tertiary rounded"
    >
        <ReactMarkdown
            remarkPlugins={[remarkMath]} // Поддержка математических формул
            rehypePlugins={[rehypeKatex, rehypeHighlight]} // Рендер формул с помощью KaTeX

            skipHtml={true} // Игнорировать HTML, если нужно
        >
            {contentWithoutAnswer}
        </ReactMarkdown>

        <ReactMarkdown
            remarkPlugins={[remarkMath]} // Поддержка математических формул
            rehypePlugins={[rehypeKatex, rehypeHighlight]} // Рендер формул с помощью KaTeX

            skipHtml={true} // Игнорировать HTML, если нужно
        >
            {variants}
        </ReactMarkdown>
    </div>);
}

export default Redactor