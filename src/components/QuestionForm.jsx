import {useState} from "react";

function QuestionForm({onAsk}) {
    const [question, setQuestion] = useState("");
    const [subject, setSubject] = useState("JavaScript");

    const handleSubmit = (event) => {
        event.preventDefault();

        if (question.trim() === "") {
            alert("Please enter a question");
            return;
        }
        onAsk(question, subject);
        setQuestion("");
    };

    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="subject">Select Subject:</label>
            <select id="subject" value={subject} onChange={(event) => setSubject(event.target.value)}>
                <option>JavaScript</option>
                <option>React</option>
                <option>HTML</option>
                <option>Python</option>
                <option>CSS</option>
            </select>

            <label htmlFor="question">Select Question:</label>
            <textarea
                id="question"
                value={question}
                onChange={(event) => setQuestion(event.target.value)}
                placeholder="Example: What is Hoisting?"
            />
            <button type="submit">Ask Ai-Assistant</button>
        </form>
    );
}

export default QuestionForm;