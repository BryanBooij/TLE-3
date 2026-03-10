import { useEffect, useState} from "react";
import { questions as placeholderQuestions} from "./questions";
import { useNavigate, useLocation } from "react-router";
import "./quiz.css";

const API_BASE = '/api/quiz';

export default function QuizPage() {
    const [status, setStatus] = useState("loading");
    const [questions, setQuestions] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [selectedChoice, setSelectedChoice] = useState(null);
    const [counts, setCounts] = useState({ Moeder: 0, Vader: 0, Zoon: 0, Dochter: 0 });
    const [answersList, setAnswersList] = useState([]);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        let mounted = true;
        const load = async () => {
            try {
                // Determine category passed from Categories page (if any)
                const category = location?.state?.category || null;
                // Try fetching from backend
                try {
                    const url = category ? `${API_BASE}/questions?category=${encodeURIComponent(category)}` : `${API_BASE}/questions`;
                    const res = await fetch(url);
                    if (!res.ok) {
                        // don't throw here; log and fall back to placeholder below
                        console.warn(`Backend fetch returned HTTP ${res.status} ${res.statusText}`);
                    } else {
                        const json = await res.json();
                        const data = Array.isArray(json) ? json : (json.questions || json.data || []);
                        if (mounted) {
                            setQuestions(data);
                            setStatus(data && data.length ? "ready" : "empty");
                            // clear prior results to start fresh
                            try { sessionStorage.removeItem('quizResults'); } catch (e) { /* ignore */ }
                            return;
                        }
                    }
                } catch (backendError) {
                    // backend not available or returned error; fall back to placeholder
                    console.warn('Could not fetch questions from backend, falling back to placeholder:', backendError);
                }

                // fallback to local placeholder questions
                if (mounted) {
                    const data = placeholderQuestions || [];
                    setQuestions(data);
                    setStatus(data && data.length ? "ready" : "empty");
                    try { sessionStorage.removeItem('quizResults'); } catch (e) { /* ignore */ }
                }
            } catch (error) {
                console.error("Error loading questions:", error);
                if (mounted) setStatus("error");
            }
        };
        load();
        return () => { mounted = false };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (status === "loading") return <div className="quiz-page"><h2>Loading questions…</h2></div>;
    if (status === "error") return <div className="quiz-page"><h2>Er is een fout opgetreden bij het laden van de vragen. Check de console.</h2></div>;
    if (status === "empty") return <div className="quiz-page"><h2>Geen vragen beschikbaar.</h2></div>;

    const q = questions[currentIndex];

    if (!q) {
        // For safety if something odd happens.
        return <div className="quiz-page"><h2>Geen vraag gevonden.</h2></div>;
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
                {q.choices.map((c, i) => {
                    const selected = selectedChoice === i;
                    const choiceClass = selected
                        ? (typeof q.answer === 'number' && q.answer === i ? 'choice-btn selected-correct' : 'choice-btn selected-wrong')
                        : 'choice-btn';

                    return (
                        <button
                            key={i}
                            onClick={() => handleSelect(i)}
                            disabled={selectedChoice !== null}
                            aria-pressed={selected}
                            className={choiceClass}
                        >
                            {c}
                        </button>
                    );
                })}
            </div>

            {selectedChoice !== null && (
                <div className="result">
                    <p>
                        Je koos: <strong>{q.choices[selectedChoice]}</strong>
                    </p>

                    {typeof q.answer === 'number' ? (
                        isCorrect ? (
                            <p className="feedback correct">Correct!</p>
                        ) : (
                            <p className="feedback incorrect">Helaas verkeerd — het juiste antwoord is: <strong>{q.choices[q.answer]}</strong></p>
                        )
                    ) : (
                        <p>Bron: {q.source}</p>
                    )}

                    <p>
                        Bron: {q.source} {q.sourceUrl ? <a href={q.sourceUrl} target="_blank" rel="noreferrer">(view)</a> : null}
                    </p>

                    <button onClick={handleNext} className="next-btn">
                        Volgende
                    </button>
                </div>
            )}

            <div className="progress">
                <small>
                    Vraag {currentIndex + 1} van {questions.length}
                </small>
            </div>
        </div>
    );
}