import {useEffect, useState} from "react";
import {data} from "react-router-dom";
import axios from "axios";
import {useNavigate} from "react-router-dom";
function Courses()
{

    const [data, setData] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        axios.get('/index_redactor.php?action=all_chapters')
            .then(response => setData(response.data))
            .catch(error => console.error(error));
    }, []);

    function toCours(id)
    {

        navigate('/topics', {
            state: {
                courseId: id
            }
        });

    }



    return(

        <div className="list-group col-2">

            <button type="button" className="list-group-item list-group-item-action active" aria-current="true">
                Список курсов
            </button>

            {data.map(item => (
                <button onClick={()=>toCours(item.id)}  type="button" className="list-group-item list-group-item-action">{item.name}</button>
            ))}

        </div>);

}

export default Courses