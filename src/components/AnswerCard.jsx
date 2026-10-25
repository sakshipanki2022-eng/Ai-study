// function AnswerCard({ question, answer}) {
//     const handleCardClick=() =>{
//         console.log("Answer Card clicked");
//     };

//     const handleCopy=(event)=> {
//         event.stopPropagation();
//         navigator.clipboard.writeText(answer);
//         alert("answer copied")
//     };

//     return(
//         <div className="answer-card" onClick={handleCardClick}>
//             <h3>Your Question</h3>
//             <p>{question}</p>
//             <h3>Answering...</h3>
//             <p className="answer">{answer}</p>
//             <button onClick={handleCopy}>Copy Answer</button>
//         </div>
//     )
// }

// export default AnswerCard;

function AnswerCard({ question, answer }) {
  const handleCardClick = () => {
    console.log("Answer Card clicked");
  };

  const handleCopy = async (event) => {
    event.stopPropagation();

    if (!answer) {
      alert("No answer to copy yet");
      return;
    }

    try {
      await navigator.clipboard.writeText(answer);
      alert("Answer copied");
    } catch (error) {
      console.error("Copy failed:", error);
      alert("Copy failed. Please try again.");
    }
  };

  return (
    <div className="answer-card" onClick={handleCardClick}>
      <p className="eyebrow">QUESTION / CONTEXT</p>
      <h3>{question}</h3>

      <p className="eyebrow answer-label">AI RESPONSE</p>
      <p className="answer">{answer}</p>

      <button type="button" onClick={handleCopy}>
        Copy Answer
      </button>
    </div>
  );
}

export default AnswerCard;