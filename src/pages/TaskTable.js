import React, {useEffect, useState} from "react";
import axios from "axios";
import rehypeHighlight from "rehype-highlight";

import ReactMarkdown from "react-markdown";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import {useLocation} from "react-router-dom";

function TaskTable({topicId})
{
    const location = useLocation();
    const {topic} = location.state || {};

    const [data, setData] = useState({cards: []});

    console.log(topic.id)

    useEffect(() => {
        const post_data = {topic_id: topic.id};
        axios.post('/index_redactor.php?action=get_topic', post_data, {headers: {'Content-Type': 'application/json'}})
            .then(response => setData(response.data))
            .catch(error => console.error(error));
    }, [topic.id]);

    return (
        <div>
            <Buttons cards={data.cards}></Buttons>
            <table class="table table-striped">
                <thead>
                <tr>
                    <th scope="col">Название/Период1</th>
                    <th scope="col">Содержание</th>
                    <th scope="col">0</th>
                    <th scope="col">1</th>
                    <th scope="col">2</th>
                    <th scope="col">3</th>
                    <th scope="col">4</th>
                    <th scope="col">5</th>
                    <th scope="col">6</th>
                    <th scope="col">7</th>
                    <th scope="col">All</th>
                </tr>
                </thead>
                <tbody>
                {data.cards.map(item => (<Row item={item}></Row> ))}
                </tbody>
            </table>
        </div>
    );
}


function itemToAr(item) {
    let checked = []; // Инициализируем пустой массив
    for (let i = 0; i < 8; i++) {
        checked[i] = { key: i }; // Создаём новый объект для каждого элемента
        if (item["period" + i] === "1") {
            checked[i].value = true;
        } else if (item["period" + i] === "0") {
            checked[i].value = false;
        }
    }
    return checked;
}
function ArrToItem(checked)
{
    let arr = []; // Инициализируем пустой массив
    for (let i = 0; i < 8; i++) {
        if(checked[i].value)
            arr[i]="1";
        if(!checked[i].value)
            arr[i]="0";
    }
    return arr;
}

function Row({item})
{
    let checked=itemToAr(item);

    function setChecked(e)
    {
        checked[e.id].value=e.checked;
        Send(item.id, ArrToItem(checked));
    }
    function allChecked(e)
    {
        for (let i=0; i<8;i++)
        {
            checked[i].value=e.checked
        }
    }
    let content;
    if (item.visible==0)
        content="--";
    else
        content=item.markdown_mark;
    return (
        <tr>
            <th>{item.name}</th>
            <td><Content content={content}/></td>
            {checked.map((itemCell) => (<Cell setChecked={setChecked} id={itemCell.key} checked={itemCell.value}/>))}

            <td>
                <div className="form-check">
                    <input className="form-check-input"  type="checkbox"
                           onChange={(e) => allChecked(e.target)}/>
                </div>
            </td>

        </tr>
    );
}
function Buttons({cards})
{
    function checkAll(peridNumber)
    {
        let period = []; // Иници



        for (let i=0; i<cards.length;i++)
        {

            for (let j=0; j<8;j++)
            {
                if ((j+i)%peridNumber==0)
                    period[j]=1;
                else
                    period[j]=0;
            }

            Send(cards[i].id,period);
        }
    }
    return (
        <form className="row g-3">
            <div className="col-auto">
                <button onClick={()=>checkAll(1)} type="button" className="btn btn-primary p-2 m-2">
                    Выделить все
                </button>
            </div>

            <div className="col-auto">
                <button onClick={()=>checkAll(2)} type="button"  className="btn btn-primary p-2 m-2">Выделить 1/2</button>
            </div>

            <div className="col-auto">
                <button onClick={()=>checkAll(3)} type="button"  className="btn btn-primary p-2 m-2">Выделить 1/3</button>
            </div>

            <div className="col-auto">
                <button onClick={()=>checkAll(4)} type="button"  className="btn btn-primary p-2 m-2">Выделить 1/4</button>
            </div>
        </form>
    );
}

function Content({content}) {
    content = content.toString().split("{m}").join("");
    content = content.toString().split("{f}").join("");
    content = content.toString().split("{wr}").join("");
    content = content.split("slash").join("\\");
    content = content.split("apostrof").join("\'");
    content = content.split("studycard.ru").join("0");

    return (
        <ReactMarkdown
            remarkPlugins={[remarkMath]} // Поддержка математических формул
            rehypePlugins={[rehypeKatex, rehypeHighlight]} // Рендер формул с помощью KaTeX

            skipHtml={true} // Игнорировать HTML, если нужно
        >

            {content}

        </ReactMarkdown>
    );
}

function Cell({checked, id, setChecked}) {
    return (
        <td>
            <div className="form-check">
                <input className="form-check-input" defaultChecked={checked} type="checkbox" id={id}
                       onChange={(e) => setChecked(e.target)}/>
            </div>
        </td>
    );
}

function Send(id, period) {


    const post_data = {
        id: id,
        period0:period[0],
        period1:period[1],
        period2:period[2],
        period3:period[3],
        period4:period[4],
        period5:period[5],
        period6:period[6],
        period7:period[7]
    };

    axios
        .post("/index_redactor.php?action=redact_period", post_data, {
            headers: { "Content-Type": "application/json" },
        })
        .then((response) => {

        })
        .catch((error) => console.error(error));




}



export default TaskTable;