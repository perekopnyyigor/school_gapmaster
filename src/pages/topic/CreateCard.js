import axios from "axios";

function CreateCard({topic_id})
{

    function create(topic_id)
    {
        const post_data = {
            topic_id:topic_id,
            card_name:"new card",
            card_mark:"content",
            type:1,
            visible:2,
            task:""
        };

        axios
            .post("https://studycard.ru/index_redactor.php?action=add_card", post_data, {
                headers: { "Content-Type": "application/json" },
            })
            .then((response) => {

            })
            .catch((error) => console.error(error));
    }
    return (
        <button onClick={() => create(topic_id)} type="button" className="btn btn-primary p-2 m-2">Добавить</button>)

}
export default CreateCard;