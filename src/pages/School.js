import {useEffect, useState} from "react";
import {data} from "react-router-dom";
import axios from "axios";
import {useNavigate} from "react-router-dom";
function School()
{

    const [data, setData] = useState([]);
    const navigate = useNavigate();



    useEffect(() => {
        axios.get('https://studycard.ru/index_redactor.php?action=all_chapters')
            .then(response => setData(response.data))
            .catch(error => console.error(error));
    }, []);

    function toCours(id)
    {

        navigate('/cours', {
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
                <button onClick={()=>toCours(item.id)}  type="button" className="list-group-item list-group-item-action"><StrongCours cours={item} /></button>
            ))}

        </div>);

}
function StrongCours({cours})
{
    if (cours.visible==1)
        return <strong>{cours.name}</strong>
    else
        return cours.name;

}
export default School