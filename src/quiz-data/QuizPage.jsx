import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router";
import "./quiz.css";

const BACKEND_BASE = "http://145.24.237.168:8000";

export default function QuizPage() {

    const navigate = useNavigate();
    const location = useLocation();

    const quizId =
        location?.state?.category ||
        (location?.state?.quiz && (location.state.quiz.id || location.state.quiz.name)) ||
        null;

    const [questions, setQuestions] = useState([]);
    const [status, setStatus] = useState("loading");

    const [currentIndex, setCurrentIndex] = useState(0);
    const [selectedChoice, setSelectedChoice] = useState(null);

    const [answersList, setAnswersList] = useState([]);

    const q = questions[currentIndex];

    /* ---------------- LOAD QUESTIONS ---------------- */

    useEffect(() => {
        loadQuestions();
    }, []);

    async function loadQuestions() {
        try {

            const res = await fetch(`${BACKEND_BASE}/questions?quiz_id=${quizId}`, {
                headers: {
                    "Accept": "application/json"
                }
            });
            const json = await res.json();

            console.log("QUESTIONS RESPONSE:", json);

            let raw = Array.isArray(json)
                ? json
                : json.questions || json.data || [];

            const normalized = raw.map(q => ({
                id: q.id || q.question_id,
                prompt: q.question_text || q.question || q.prompt || q.text || "",
                source: q.source || null,
                sourceUrl: q.source_url || null
            }));

            console.log("Normalized:", normalized);

            const questionsWithAnswers = await Promise.all(
                normalized.map(async (q) => {

                    const res = await fetch(`${BACKEND_BASE}/answers?question_id=${q.id}`, {
                        headers: {
                            "Accept": "application/json"
                        }
                    });
                    const json = await res.json();

                    const answers = Array.isArray(json)
                        ? json
                        : json.answers || json.data || [];

                    const cleaned = answers
                        .map(a => ({
                            text: a.answer_text || a.text || "",
                            correct:
                                a.is_correct === true ||
                                a.is_correct === 1 ||
                                a.is_correct === "1" ||
                                a.is_correct === "true"
                        }))
                        .filter(a => a.text);

                    const correctIndex = cleaned.findIndex(a => a.correct);

                    return {
                        ...q,
                        choices: cleaned.map(a => a.text),
                        answer: correctIndex
                    };
                })
            );

            setQuestions(questionsWithAnswers);
            setStatus(questionsWithAnswers.length ? "ready" : "empty");

        } catch (err) {
            console.error("Quiz load error:", err);
            setStatus("error");
        }
    }

    /* ---------------- ANSWER SELECT ---------------- */

    function handleSelect(index) {
        if (selectedChoice !== null) return;
        setSelectedChoice(index);
    }

    /* ---------------- NEXT QUESTION ---------------- */

    function handleNext() {

        const selectedLabel = q.choices[selectedChoice];
        const correctLabel =
            typeof q.answer === "number"
                ? q.choices[q.answer]
                : null;

        const newAnswers = [
            ...answersList,
            {
                questionId: q.id,
                prompt: q.prompt,
                selected: selectedLabel,
                correct: correctLabel,
                source: q.source,
                sourceUrl: q.sourceUrl,
                quizId
            }
        ];

        setAnswersList(newAnswers);

        const next = currentIndex + 1;

        if (next < questions.length) {
            setCurrentIndex(next);
            setSelectedChoice(null);
            return;
        }

        /* SAVE RESULTS */

        try {
            const payload = {
                answers: newAnswers,
                quizId
            };

            sessionStorage.setItem(
                `quizResults:${quizId || "default"}`,
                JSON.stringify(payload)
            );

        } catch (e) {
            console.warn("Could not store results");
        }

        navigate("/quiz/results", {
            state: {
                answers: newAnswers,
                quizId
            }
        });
    }

    /* ---------------- UI STATES ---------------- */

    if (status === "loading")
        return <div className="quiz-page"><h2>Loading questions…</h2></div>;

    if (status === "error")
        return <div className="quiz-page"><h2>Fout bij laden van vragen.</h2></div>;

    if (status === "empty")
        return <div className="quiz-page"><h2>Geen vragen beschikbaar.</h2></div>;

    if (!q)
        return <div className="quiz-page"><h2>Geen vraag gevonden.</h2></div>;

    const isCorrect = selectedChoice === q.answer;

    /* ---------------- RENDER ---------------- */

    return (
        <div className="quiz-page">

            <h2>{q.prompt}</h2>

            <div className="choices">

                {q.choices.map((c, i) => {

                    let choiceClass = "choice-btn";

                    if (selectedChoice !== null) {

                        if (i === q.answer)
                            choiceClass += " selected-correct";

                        else if (i === selectedChoice)
                            choiceClass += " selected-wrong";
                    }

                    return (
                        <button
                            key={i}
                            className={choiceClass}
                            onClick={() => handleSelect(i)}
                            disabled={selectedChoice !== null}
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

                    {typeof q.answer === "number" && (
                        isCorrect
                            ? (
                                <p className="feedback correct">
                                    Correct! Het juiste antwoord is: <strong>{q.choices[q.answer]}</strong>
                                </p>
                            )
                            : (
                                <p className="feedback incorrect">
                                    Helaas fout. Het juiste antwoord is: <strong>{q.choices[q.answer]}</strong>
                                </p>
                            )
                    )}

                    {q.source && (
                        <p>
                            Bron: {q.source} {q.sourceUrl && (
                            <a href={q.sourceUrl} target="_blank" rel="noreferrer">(view)</a>
                        )}
                        </p>
                    )}

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