import {useEffect, useState} from "react";
import axios from "axios";

function ErrorsList({id,setCardId,setErrId})
{
    const [data, setData] = useState([]);
    const post_data = { cours_id: id };
    useEffect(() => {
        axios.post('https://studycard.ru/index_redactor.php?action=get_errors',post_data,{ headers: { 'Content-Type': 'application/json' }} )
            .then(response => setData(response.data))
            .catch(error => console.error(error));
    }, [id]);
    let checkData =[];
    for (let i=0;i<data.length;i++)
    {
        if (data[i].status==0)
            checkData.push(data[i]);
    }

    function click(id, err_id)
    {
        setCardId(id);
        setErrId(err_id);


    }
    return(
        <div className="list-group">
            <button type="button" className="list-group-item list-group-item-action active" aria-current="true">
                Список ошибок
            </button>

            {checkData.map(item => (
                <button onClick={()=>click(item.card_id,item.id)}  type="button" className="list-group-item list-group-item-action">{item.text}</button>
            ))}

        </div>);

}
export default ErrorsList;