import axios from "axios";
class Card
{
     getCard(cardId) {
        const post_data = { card_id: cardId };
        axios
            .post("/index_redactor.php?action=get_card", post_data, {
                headers: { "Content-Type": "application/json" },
            })
            .then((response) => {
                return response;
            })
            .catch((error) => console.error(error));
    }
}
export default Card;