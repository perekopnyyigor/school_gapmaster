import {useNavigate} from "react-router-dom";

function TopicList({item})
{
    const navigate = useNavigate();
    function toTopics(topic)
    {

        navigate('/topic', {
            state: {
                topic: {
                    id: topic.id,
                    count_cards: topic.count_cards
                }
            }
        });

    }
    return (<div>
        <button type="button" className="list-group-item list-group-item-action list-group-item-primary">
            <Strong chapter={item}></Strong>
        </button>
        {item.topics.map(item => (
            <div>

                <button type="button" onClick={() => toTopics(item)}
                        className="list-group-item list-group-item-action">
                    <Strong chapter={item}></Strong>
                    <Progress count={item.count_cards}></Progress>
                </button>

            </div>
        ))}

    </div>)
}

function Strong({chapter}) {
    if (chapter.visible == 1)
        return <strong>{chapter.name}</strong>
    else
        return chapter.name;

}

function Progress({count}) {
    let name;
    if (count <= 10)
        name = "progress-bar bg-danger";
    else if (count > 10 && count <= 20)
        name = "progress-bar bg-warning text-dark";
    else if (count > 20 && count <= 30)
        name = "progress-bar bg-success";
    else
        name = "progress-bar";

    return (
        <div className="progress" role="progressbar" aria-label="Success example" aria-valuenow={count}
             aria-valuemin="0"
             aria-valuemax="100">
            <div className={name} style={{width: `${count * 2}%`}}>{count}</div>
        </div>
    );
}

export default TopicList;