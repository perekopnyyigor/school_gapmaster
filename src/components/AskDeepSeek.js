import {useState} from "react";

function createPrompts() {
    const promts = [];

    promts[0]="Отформатируй статью. Если статья не на русском переведи \n" +
        "Статья должна быть разбита на небольшие абзацы около 50 слов в каждом, каждый обзац должен быть озаглавлен. \n" +
        "Все формулы должны быть в формате katex, выделены знаками $$ . \n" +
        "Оставь на месте номера рисунков . \n" +
        "В конце названия должен стоять маркер {name}, в конце абзаца маркер {card}";

    promts[1]="Сделай из данного текста задания, то есть выдели маркером {m} \n" +
        "те слова которые пользователь должен будет вставить \n" +
        "внутри маркеров не более одного слова например\n" +
        " \n" +
        "Если точка $$M$$ числовой окружности со­ ответствует числу $$t$$, \n" +
        "то абсциссу точки $$M$$ называют {m}косинусом{m} числа $$t$$ \n" +
        "а ординату точки $$M$$ называют {m}синусом{m} числа $$t$$";
    return promts;
}

function solvePrompts() {
    const promts = [];

    promts[0]="Реши задачи и оформи как показано в шаблоне ,  \n" +
        "Разбей решение по пунктам, в каждом пункте сначала формула, потом в следующей строчке подставь данные \n " +
        "Пронумеруй пункты \n " +
        "Вот примере оформления задач, \n" +
        "**Дано**  \n" +
        "- $$ S = 200\\ \\text{см}^2 = 200 \\cdot 10^{-4}\\ \\text{м}^2 $$  \n" +
        "- $$ d = 1\\ \\text{см} = 0{,}01\\ \\text{м} $$  \n" +
        "- $$ E = 500\\ \\text{кВ/м} = 5 \\cdot 10^5\\ \\text{В/м} $$  \n" +
        "- $$ \\varepsilon_0 = 8{,}85 \\cdot 10^{-12}\\ \\text{Ф/м} $$  \n" +
        "- $$ \\varepsilon = 1 $$  \n" +
        "- Найти: $$ W $$  \n" +
        "\n" +
        "**Решение**  \n" +
        "\n" +
        "1. **Емкость конденсатора**  \n" +
        "   $$ C = \\cfrac{\\varepsilon_0 \\varepsilon S}{d} $$  \n" +
        "   $$ C = \\cfrac{8{,}85 \\cdot 10^{-12} \\cdot 1 \\cdot 200 \\cdot 10^{-4}}{0{,}01} = 1{,}77 \\cdot 10^{-11}\\ \\text{Ф} $$  \n" +
        "\n" +
        "2. **Напряжение между пластинами**  \n" +
        "   $$ U = E d $$  \n" +
        "   $$ U = 5 \\cdot 10^5 \\cdot 0{,}01 = 5000\\ \\text{В} $$  \n" +
        "\n" +
        "3. **Энергия конденсатора**  \n" +
        "   $$ W = \\cfrac{C U^2}{2} $$  \n" +
        "   $$ W = \\cfrac{1{,}77 \\cdot 10^{-11} \\cdot (5000)^2}{2} = 220 \\cdot 10^{-6}\\ \\text{Дж} $$  \n" +
        "\n" +
        "**Ответ**  \n" +
        "$$ W = 220\\ \\text{мкДж} $$\n";

    promts[1]= "Перед каждым пунктом решения сделай краткое пояснение 3-4 слова, все формулы katex выдели знаками $$  ";

    promts[2]="Сделай из данного текста задания, то есть выдели маркером {m} и {f}{m} \n" +
        "те элементы формул которые пользователь должен будет вставить \n" +
        "выделяй по 1 элементу в каждой формуле  $$ a=\\cfrac{v-{m}v_0{f}{m}}{t}$$\n " +
        "выделяй по 1 элементу в каждой подстановке данных  $$ a=\\cfrac{8000-{m}300{f}{m}}{420}=18,33 м / с^2$$\n " +
        "внутри маркеров не более одного элемента например\n" +
        "Вот пример \n" +
        "**Дано**\n" +
        "\n" +
        "* $$ t=7 мин=  420 с $$\n" +
        "\n" +
        "* $$ v=8 км /с= 8000 м / с $$\n" +
        "\n" +
        "* $$ v_0=300 м/ с$$\n" +
        "\n" +
        "**Решение**\n" +
        "\n" +
        "* **Выведем формулу**\n" +
        "\n" +
        "   $$ a=\\cfrac{v-{m}v_0{f}{m}}{t }$$\n" +
        "\n" +
        "* **Подставим данные**\n" +
        "\n" +
        "  $$ a=\\cfrac{8000-{m}300{f}{m}}{420}=18,33 м / с^2$$"



    return promts;
}

function simplePrompts() {
    const promts = [];

    promts[0]="Реши пример, оформи в katex, формулы выдели знаками $$  \n";




    promts[1]="оформи примеры\n" +
        "1. Четко структурируй каждый шаг с нумерацией, Кратко назови каждый пункт  \n" +
        "2. Сделай оформление:  \n" +
        "   - Используй `\\large` и цвет `#063051`  \n" +

        "   - Дроби через `\\cfrac`  \n" +
        "3.Не добавляй пояснения и комментарии, \n" +

        "4. Для уравнений сначала выводи общую формулу, затем подставляй значения  \n" +
        "5. Пример который ниже в ответе не пиши, это только для примера  \n" +
        "   пример:\n" +
        "**Решение уравнения:**  \n" +
        "\n" +
        "$$\\large\\textcolor{#063051}{\\sin 2x = \\cfrac{\\sqrt{2}}{2}}$$  \n" +
        "\n" +
        "1. **Применяем общую формулу решений для синуса:**  \n" +
        "   $$\\large\\textcolor{#063051}{2x = (-1)^n \\cdot \\arcsin \\left(\\cfrac{\\sqrt{2}}{2}\\right) + \\pi n}$$  \n" +
        "\n" +
        "2. **Вычисляем значение арксинуса:**  \n" +
        "   $$\\large\\textcolor{#063051}{\\arcsin \\left(\\cfrac{\\sqrt{2}}{2}\\right) = \\cfrac{\\pi}{4}}$$  \n" +
        "\n" +
        "3. **Подставляем в формулу:**  \n" +
        "   $$\\large\\textcolor{#063051}{2x = (-1)^n \\cdot \\cfrac{\\pi}{4} + \\pi n}$$  \n" +
        "\n" +
        "4. **Делим обе части уравнения на 2:**  \n" +
        "   $$\\large\\textcolor{#063051}{x = (-1)^n \\cdot \\cfrac{\\pi}{8} + \\cfrac{\\pi n}{2}}$$"




    return promts;
}

function programPrompts() {
    const promts = [];

    promts[0]="Придумай 20 простых заданий на эту тему \n" +
        "\n" +
        "После каждого названия примера ставь маркер: {name}\n" +
        "После каждого примера ставь маркер : {card}\n" +
        "\n" +
        "Пример:\n" +
        "Преобразование строки в верхний/нижний регистр.{name}\n" +
        "\n" +
        "    ```csharp\n" +
        "    string mixedCase = \"HeLLo WoRLd\";\n" +
        "    string upper = mixedCase.ToUpper(); // \"HELLO WORLD\"\n" +
        "    string lower = mixedCase.ToLower(); // \"hello world\"\n" +
        "    ```\n" +
        "{card}" ;



    promts[1]="Сделай из данного текста задания, то есть выдели маркером {m} \n" +
        "те слова которые пользователь должен будет вставить\n" +
        "остальные маркеры оставь как есть,  например\n" +
        "\n" +
        "\n" +
        "Пример:\n" +
        "Преобразование строки в верхний/нижний регистр.{name}\n" +
        "\n" +
        "    ```csharp\n" +
        "    string text = \"Hello, World!\";\n" +
        "    int length = {m}text{m}.{m}Length{m}; // 13\n" +
        "    Console.WriteLine({m}length{m});\n" +
        "   ```\n" +
        "\n" +
        "{card}"


    return promts;
}
async function askAI(question) {
    const apiKey = "sk-c1c6d82e3f92484497f0e79700d3db3a";

    const response = await fetch("https://api.deepseek.com/chat/completions", {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${apiKey}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            model: "deepseek-chat",
            messages: [
                {"role": "system", "content": "You are a helpful assistant"},
                {"role": "user", "content": question}
            ],
            stream: false
        })
    });

    const data = await response.json();
    return data.choices[0].message.content;
}

async function runAllSteps(content,prompts,setIsLoading) {
    setIsLoading(true);
    let answer = content;
    try {
        for (let i=0; i<prompts.length; i++)
        {

            answer = await askAI(prompts[i] + answer);
        }



        return answer;

    } catch (error) {
        console.error("Error:", error);
    } finally {
        setIsLoading(false);
    }

}
async function  solveStep(prompts,content,setContent,setIsLoading)//Обрабатываем части по очереди
{
    let contents=content.split("{simple}");



    let answer ="";

    for (let i=0;i<contents.length;i++)
    {
        answer +="Решите{name}";
        answer +=contents[i];
        answer +=await   runAllSteps(contents[i],prompts,setIsLoading)
        answer +="{card}";

    }

    setContent(answer);
}
function AskDeepSeek({content, setContent}) {
    const [isLoading, setIsLoading] = useState(false);

    async function  ask()
    {
        const prompts = [];
        prompts[0] = "";
        let answer = await   runAllSteps(content,prompts,setIsLoading)
        setContent(answer);
    }


    async function  create()
    {
        let prompts = createPrompts();
        let answer = await   runAllSteps(content,prompts,setIsLoading)
        setContent(answer);
    }
    async function  solve()
    {
        let prompts = solvePrompts();
        await solveStep(prompts,content,setContent,setIsLoading)

    }
    async function  simple()
    {
        let prompts = simplePrompts();
        await solveStep(prompts,content,setContent,setIsLoading)

    }
    async function  program()
    {
        let prompts = programPrompts();
        await solveStep(prompts,content,setContent,setIsLoading)

    }
    return (
        <div>
            <button
                onClick={ask}
                disabled={isLoading}
                className="btn btn-primary p-2 m-2"
            >
                {isLoading ? 'Выполняю...' : 'Спросить'}
            </button>
            <button
                onClick={create}
                disabled={isLoading}
                className="btn btn-primary p-2 m-2"
            >
                {isLoading ? 'Выполняю...' : 'Текст'}
            </button>

            <button
                onClick={solve}
                disabled={isLoading}
                className="btn btn-primary p-2 m-2"
            >
                {isLoading ? 'Выполняю...' : 'Задачи'}
            </button>
            <button
                onClick={simple}
                disabled={isLoading}
                className="btn btn-primary p-2 m-2"
            >
                {isLoading ? 'Выполняю...' : 'Примеры'}
            </button>
            <button
                onClick={program}
                disabled={isLoading}
                className="btn btn-primary p-2 m-2"
            >
                {isLoading ? 'Выполняю...' : 'Прог'}
            </button>

        </div>
    );
}


export default AskDeepSeek;