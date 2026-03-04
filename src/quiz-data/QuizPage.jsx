import { useEffect, useState} from "react";
import { questions as placeholderQuestions} from "./questions";

export default function QuizPage() {
    const [status, setStatus] = useState("loading");
    const [questions, setQuestions] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [selectedChoice, setSelectedChoice] = useState(null);

    useEffect(() => {
        const load = async () => {
            try {
                const data = placeholderQuestions;
                setQuestions(data);
                setStatus(data && data.length ? "ready" : "empty");
            } catch (error) {
                console.error("Error loading questions:", error);
                setStatus("error");
            }
        };
        load();
    }, []);
    if (status === "loading") return <div>Loading questions…</div>;
    if (status === "error") return <div>Er is een fout opgetreden bij het laden van de vragen. Check de console.</div>;
    if (status === "empty") return <div>Geen vragen beschikbaar.</div>;

    const q = questions[currentIndex];

    const handleSelect = (choiceIndex) => {
        if (selectedChoice !== null) return;
        setSelectedChoice(choiceIndex);
    };

    const handleNext = () => {
        const nextIndex = currentIndex + 1;
        if (nextIndex < questions.length) {
            setCurrentIndex(nextIndex);
            setSelectedChoice(null);
        } else {
            setStatus("finished");
        }
    };

    const isCorrect = selectedChoice !== null && typeof q.answer === 'number' && selectedChoice === q.answer;

    return (
        <div className="quiz-page">
            <h2>{q.prompt}</h2>

            <div className="choices" role="list">
                {q.choices.map((c, i) => (
                    <button
                        key={i}
                        onClick={() => handleSelect(i)}
                        disabled={selectedChoice !== null}
                        aria-pressed={selectedChoice === i}
                        style={{
                            margin: "8px 0",
                            display: "block",
                            width: "100%",
                            textAlign: "left",
                            backgroundColor: selectedChoice === i ? (isCorrect ? '#008000' : '#f8d7da') : undefined
                        }}
                    >
                        {c}
                    </button>
                ))}
            </div>

            {selectedChoice !== null && (
                <div className="result" style={{ marginTop: 16 }}>
                    <p>
                        Je koos: <strong>{q.choices[selectedChoice]}</strong>
                    </p>

                    {typeof q.answer === 'number' ? (
                        isCorrect ? (
                            <p style={{ color: 'green' }}>Correct!</p>
                        ) : (
                            <p style={{ color: 'red' }}>Helaas verkeerd — het juiste antwoord is: <strong>{q.choices[q.answer]}</strong></p>
                        )
                    ) : (
                        <p>Bron: {q.source}</p>
                    )}

                    <p>
                        Bron: {q.source} {q.sourceUrl ? <a href={q.sourceUrl} target="_blank" rel="noreferrer">(view)</a> : null}
                    </p>

                    <button onClick={handleNext} style={{ marginTop: 8 }}>
                        Volgende
                    </button>
                </div>
            )}

            <div style={{ marginTop: 12 }}>
                <small>
                    Vraag {currentIndex + 1} van {questions.length}
                </small>
            </div>
        </div>
    );
}