import React, {useEffect, useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

function Instrument({setContent, content})
{
    return(
        <ul className="nav nav-pills m-2">
            <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle " data-bs-toggle="dropdown" href="#" role="button"
                   aria-expanded="false">Разметка</a>
                <ul className="dropdown-menu">
                    <li><button  onClick={() => select(content, setContent, "{m}", "{m}")} className="dropdown-item"
                           >Выделить</button ></li>
                    <li><button  onClick={() => select(content, setContent, "{m}", "{f}{m}")} className="dropdown-item"
                          >Выделить формулу</button ></li>
                    <li><button  onClick={() => select(content, setContent, "{m}", "{n}{m}")} className="dropdown-item"
                           >Доп вариант</button ></li>
                    <li><button  onClick={() => select(content, setContent, "{m}", "{wr}{m}")} className="dropdown-item"
                           >Написать вариант</button ></li>
                    <li><button  onClick={() => delMarket(content, setContent)} className="dropdown-item"
                          >Удалить метки</button ></li>



                </ul>
            </li>

            <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle " data-bs-toggle="dropdown" href="#" role="button"
                   aria-expanded="false">Markdown</a>
                <ul className="dropdown-menu">
                    <li><button onClick={() => select(content, setContent, "# ", "")} className="dropdown-item"
                          >h1</button></li>
                    <li><button onClick={() => select(content, setContent, "## ", "")} className="dropdown-item"
                         >h2</button></li>
                    <li><button onClick={() => select(content, setContent, "### ", "")} className="dropdown-item"
                           >h3</button></li>

                </ul>
            </li>
            <li className="nav-item">
                <button className="nav-link active" onClick={() => select(content, setContent, "{m}", "{f}{m}")} aria-current="page" >Выделить</button>
            </li>
        </ul>
    );
}
function delMarket(content,setContent)
{
    let arr=[];
    arr[0]={sp:"{m}",jn:" "};
    changeArr(content, setContent, arr);
}




function select(content, setContent, sign1, sign2) {
    let select = window.getSelection();

    let redact = document.getElementById("text")

    let startPos = redact.selectionStart;
    let endPos = redact.selectionEnd;
    //let content=redact.value;
    let result = '';
    let str1 = content.substring(0, startPos);
    let str2 = content.substring(endPos, content.length);

    setContent(str1 + sign1 + select + sign2 + str2);
}

function changeArr(content, setContent, arr) {
    let select = window.getSelection();

    let redact = document.getElementById("text")
    for (let i=0;i<arr.length;i++)
        select = select.toString().split(arr[i].sp).join(arr[i].jn);
    let startPos = redact.selectionStart;
    let endPos = redact.selectionEnd;
    //let content=redact.value;
    let result = '';
    let str1 = content.substring(0, startPos);
    let str2 = content.substring(endPos, content.length);

    setContent(str1 +  select +  str2);
}


export default Instrument;