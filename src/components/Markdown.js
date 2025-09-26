import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import rehypeHighlight from "rehype-highlight";
import ReactMarkdown from "react-markdown";

function Markdown({content})
{
    return(<ReactMarkdown
        remarkPlugins={[remarkMath]} // Поддержка математических формул
        rehypePlugins={[rehypeKatex, rehypeHighlight]} // Рендер формул с помощью KaTeX

        skipHtml={true} // Игнорировать HTML, если нужно
    >
        {content}
    </ReactMarkdown>)
}

export default Markdown;
