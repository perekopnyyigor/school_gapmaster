function TextArea({content, setContent, height, id })
{
    return (
        <textarea
        id={id}
        onChange={(e) => setContent(e.target.value)}
        style={{height: `${height}vh`}}
        value={content} // Привязываем значение из состояния content
        className="form-control border-success"
    />)
}
export default TextArea;