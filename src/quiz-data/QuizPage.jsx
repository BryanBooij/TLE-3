import { useEffect, useState} from "react";
import { questions as placeholderQuestions} from "./questions";
import { useNavigate } from "react-router";

export default function QuizPage() {
    const [status, setStatus] = useState("loading");
    const [questions, setQuestions] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [selectedChoice, setSelectedChoice] = useState(null);
    const [counts, setCounts] = useState({ Moeder: 0, Vader: 0, Zoon: 0, Dochter: 0 });
    const [answersList, setAnswersList] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const load = async () => {
            try {
                const data = placeholderQuestions;
                setQuestions(data);
                setStatus(data && data.length ? "ready" : "empty");
                // clear any prior results so each quiz run starts fresh
                try { sessionStorage.removeItem('quizResults'); } catch (e) { /* ignore */ }
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

    if (!q) {
        // Voor het geval dat er iets misgaat.
        return <div>Geen vraag gevonden.</div>;
    }

    const handleSelect = (choiceIndex) => {
        if (selectedChoice !== null) return;
        setSelectedChoice(choiceIndex);
    };

    const handleNext = () => {
        if (selectedChoice === null) return; // Voor de veiligheid.

        // Sla het antwoord op.
        const selectedLabel = q.choices[selectedChoice];
        // Gebruik het correcte antwoord als het bestaat.
        const correctLabel = (typeof q.answer === 'number' && q.choices[q.answer] !== undefined) ? q.choices[q.answer] : null;
        const incrementKey = correctLabel || selectedLabel;
        const newCounts = { ...counts, [incrementKey]: (counts[incrementKey] || 0) + 1 };
        const newAnswers = [
            ...answersList,
            {
                questionId: q.id,
                prompt: q.prompt,
                selected: selectedLabel,
                correct: typeof q.answer === 'number' ? q.choices[q.answer] : null,
                source: q.source,
                sourceUrl: q.sourceUrl || ''
            }
        ];

        setCounts(newCounts);
        setAnswersList(newAnswers);

        const nextIndex = currentIndex + 1;
        if (nextIndex < questions.length) {
            setCurrentIndex(nextIndex);
            setSelectedChoice(null);
        } else {
            // Ga naar resultaten, sla ze op.
            try {
                const payload = { counts: newCounts, answers: newAnswers };
                sessionStorage.setItem('quizResults', JSON.stringify(payload));
            } catch (e) {
                console.warn('Could not write results to sessionStorage', e);
            }
            navigate('/quiz/results', { state: { counts: newCounts, answers: newAnswers } });
        }
    };

    const isCorrect = selectedChoice !== null && typeof q.answer === 'number' && selectedChoice === q.answer;

    // HTML.
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