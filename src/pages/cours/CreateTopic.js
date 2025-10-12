import axios from "axios";

function CreateTopic({chapterId})
{

    function create()
    {
        let topicName = window.prompt("Введите название");


        const post_data = {
            topic_name:topicName,
            chapter_id:chapterId

        };

        axios
            .post("https://studycard.ru/index_redactor.php?action=add_topic", post_data, {
                headers: { "Content-Type": "application/json" },
            })
            .then((response) => {

            })
            .catch((error) => console.error(error));
    }

    return (<div>

            <button onClick={()=>create()} type="button" className="btn btn-primary p-2 m-2">Добавить тему</button>
        </div>

    );
}
export default CreateTopic;