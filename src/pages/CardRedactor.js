import {useEffect, useState} from "react";

import axios from "axios";

import "katex/dist/katex.min.css";

import 'highlight.js/styles/github.css';
import Markdown from "../components/Markdown";
import TextArea from "../components/TextArea";
import Instrument from "./Instrument";
import Card from "../objects/Card"; // Импорт стиля
function CardRedactor({cardId})
{

    const [content, setContent] = useState("");
    const [name, setName] = useState("");
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
                setName(response.data.name);
            })
            .catch((error) => console.error(error));

    }, [cardId]); // Следим за изменением cardId


    return (
        <div className="container-fluid">

            <div className="row">
                <Instrument content={content} setContent={setContent}></Instrument>
                <div className="col-xxl-6">
                    <Text content={content} setContent={setContent}  name={name} setName={setName} data={cardData}></Text>
                </div>
                <div className="col-xxl-6">
                    <ShowResult content={content} name={name}></ShowResult>
                </div>
            </div>
        </div>
    );
}
function SendImg(card_id, img, setContent, content) {
    const formData = new FormData();
    formData.append("card_id", card_id);
    formData.append("file", img);

    axios
        .post(
            "https://studycard.ru/index_redactor.php?action=add_img_variant",
            formData,
            {
                headers: { "Content-Type": "multipart/form-data" },
            }
        )
        .then((response) => {
            //alert("Response: " + response.data);
            setContent(content + response.data)
        })
        .catch((error) => {
            console.error(error);
            alert("Error: " + error.response?.data || error.message);
        });
    ;
}
function Text({content,setContent, name, setName, data})
{
    const [file, setFile] = useState(null);
    function save()
    {
        Send( data, content, name);

    }
    function delCard()
    {
        deleteCard(data.id)
    }
    function uploadFile(event) {
        const selectedFile = event.target.files[0]; // Получаем выбранный файл
        if (!selectedFile) {
            alert("No file selected");
            return;
        }

        setFile(selectedFile); // Обновляем состояние для дальнейшего использования, если нужно


        SendImg(data.id, selectedFile, setContent, content); // Передаём файл напрямую
    }
    return (<div>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="form-control my-2"/>

            <TextArea content={content} setContent={setContent} height={80} id={"text"}></TextArea>

            <button onClick={() => save()} type="button" className="btn btn-primary p-2 m-2">Сохранить</button>
            <button onClick={() => delCard()} type="button" className="btn btn-danger p-2 m-2">Удалить</button>
            <input type="file" name="file_variant" onChange={uploadFile}/></div>

    );
}
function deleteCard(id)
{
    const post_data = {
        card_id:id
    };

    let del = window.confirm("Вы действительно хотите удалить карту");
    if (del) {
        axios
            .post("/index_redactor.php?action=delete_card", post_data, {
                headers: {"Content-Type": "application/json"},
            })
            .then((response) => {

            })
            .catch((error) => console.error(error));
        alert("Удалено");
    }
}

function withoutAnswer(content) {
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
function ShowResult({content, name}) {
    let contentWithoutAnswer=withoutAnswer(content)
    let variants = getVariant(content);
    return (<div>
        <h1>{name}</h1>
        <div
        style={{height: "80vh"}}
        className="overflow-auto shadow p-3 mb-5 bg-body-tertiary rounded"
    >

            <Markdown content={contentWithoutAnswer}></Markdown>

            <Markdown content={variants}></Markdown>

    </div>
        </div>);
}
function Send(card,content,name)
{
    content = content.split("\\").join("slash");
    content = content.split("\'").join("apostrof");

    const post_data = {
        id:card.id,
        card_name:name,
        markdown_mark:content,
        task:"",
        type:1,
        ord:card.ord,
        visible:2,
        practic:0 };

    axios
        .post("/index_redactor.php?action=redact_card", post_data, {
            headers: { "Content-Type": "application/json" },
        })
        .then((response) => {

        })
        .catch((error) => console.error(error));

    alert("Сохранено");


}
export default CardRedactor