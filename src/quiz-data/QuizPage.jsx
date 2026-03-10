import { useEffect, useState} from "react";
import { questions as placeholderQuestions} from "./questions";
import { useNavigate, useLocation } from "react-router";
import "./quiz.css";

const BACKEND_BASE = 'http://145.24.237.168:8000';

async function safeJson(res) {
    try { return await res.json(); }
    catch (e) {
        try { return { text: await res.text() }; } catch (e2) { return null; }
    }
}

export default function QuizPage() {
    const [status, setStatus] = useState("loading");
    const [questions, setQuestions] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [selectedChoice, setSelectedChoice] = useState(null);
    const [counts, setCounts] = useState({ Moeder: 0, Vader: 0, Zoon: 0, Dochter: 0 });
    const [answersList, setAnswersList] = useState([]);
    const [attemptLogs, setAttemptLogs] = useState([]);
    const [quizTitle, setQuizTitle] = useState(null);
    const [quizDescription, setQuizDescription] = useState(null);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        let mounted = true;
        const load = async () => {
            try {
                const quizObj = location?.state?.quiz || null;
                const quizId = location?.state?.category || (quizObj && (quizObj.id || quizObj.name)) || null;
                const title = quizObj ? (quizObj.name || quizObj.title) : (quizId ? `Quiz ${quizId}` : null);
                const description = quizObj ? (quizObj.description || quizObj.theme || '') : null;
                if (mounted) {
                    setQuizTitle(title);
                    setQuizDescription(description);
                }

                const tryFetch = async (url, accept) => {
                    const opts = { headers: { Accept: accept }, mode: url.startsWith('http') ? 'cors' : undefined };
                    try {
                        const res = await fetch(url, opts);
                        setAttemptLogs(s => [...s, { url, status: res.status, statusText: res.statusText, accept }]);
                        return res;
                    } catch (e) {
                        setAttemptLogs(s => [...s, { url, error: e.message || String(e), accept }]);
                        throw e;
                    }
                };

                const endpoints = [];
                if (quizId) {
                    endpoints.push(`${BACKEND_BASE}/quizzes/${quizId}/questions`);
                    endpoints.push(`${BACKEND_BASE}/questions?quiz_id=${encodeURIComponent(quizId)}`);
                    endpoints.push(`${BACKEND_BASE}/questions?quiz=${encodeURIComponent(quizId)}`);
                } else {
                    endpoints.push(`${BACKEND_BASE}/questions`);
                }

                let found = false;
                for (const ep of endpoints) {
                    try {
                        let res = await tryFetch(ep, 'application/json');
                        if (res && res.status === 406) {
                            res = await tryFetch(ep, '*/*');
                        }
                        if (res && res.ok) {
                            const json = await safeJson(res);
                            const raw = Array.isArray(json) ? json : (json && (json.questions || json.data || json.list || json.result)) || [];

                            const normalize = (item, idx) => {
                                const prompt = item.prompt || item.text || item.description || item.question || item.question_text || '';
                                let choices = [];
                                if (Array.isArray(item.choices)) choices = item.choices.slice();
                                else if (Array.isArray(item.options)) choices = item.options.slice();
                                else if (item.options && typeof item.options === 'string') {
                                    choices = item.options.split(/\||,|;/).map(s => s.trim()).filter(Boolean);
                                } else {
                                    const keys = Object.keys(item);
                                    const optionCandidates = [];
                                    for (const k of keys) {
                                        const lk = k.toLowerCase();
                                        if (/^(option|opt|choice)[_\-]?\d+$/.test(lk) || /^(a|b|c|d|e|f)$/.test(lk)) {
                                            optionCandidates.push({ k, order: lk.match(/\d+$/) ? parseInt(lk.match(/\d+$/)[0], 10) : undefined });
                                        }
                                    }

                                    optionCandidates.sort((a, b) => (a.order || 0) - (b.order || 0));
                                    for (const oc of optionCandidates) {
                                        const val = item[oc.k];
                                        if (val !== undefined && val !== null && String(val).trim() !== '') choices.push(String(val).trim());
                                    }
                                }

                                let answer = null;
                                if (typeof item.answer === 'number') answer = item.answer;
                                else if (typeof item.answer === 'string' && choices.length) {
                                    const idx = choices.findIndex(ch => ch === item.answer || ch === item.answer.trim());
                                    if (idx >= 0) answer = idx;
                                } else if (item.correct !== undefined) {
                                    if (typeof item.correct === 'number') answer = item.correct;
                                    else if (typeof item.correct === 'string' && choices.length) {
                                        const idx = choices.findIndex(ch => ch === item.correct || ch === item.correct.trim());
                                        if (idx >= 0) answer = idx;
                                    }
                                }

                                return {
                                    id: item.id || item.question_id || idx,
                                    prompt,
                                    choices: choices.length ? choices : (item.choices || []),
                                    answer: (typeof answer === 'number') ? answer : null,
                                    source: item.source || item.source_name || null,
                                    sourceUrl: item.sourceUrl || item.source_url || null,
                                };
                            };
                            const data = raw.map((r, i) => normalize(r, i));
                             if (mounted) {
                                setQuestions(data);
                                 setStatus(data && data.length ? "ready" : "empty");
                                 try { sessionStorage.removeItem('quizResults'); } catch (e) { /* ignore */ }
                             }
                             found = true;
                             break;
                         }
                    } catch (e) {
                        console.warn('Fetch attempt failed for', ep, e);
                    }
                }

                if (!found) {
                    if (mounted) {
                        const data = placeholderQuestions || [];
                        if (!quizTitle && data && data.length && data[0].quizTitle) {
                            setQuizTitle(data[0].quizTitle);
                        }
                        setQuestions(data);
                        setStatus(data && data.length ? "ready" : "empty");
                        try { sessionStorage.removeItem('quizResults'); } catch (e) { /* ignore */ }
                    }
                }

            } catch (error) {
                console.error("Error loading questions:", error);
                if (mounted) setStatus("error");
            }
        };
        load();
        return () => { mounted = false };
    }, []);

    if (status === "loading") return <div className="quiz-page"><h2>Loading questions…</h2></div>;
    if (status === "error") return <div className="quiz-page"><h2>Er is een fout opgetreden bij het laden van de vragen. Check de console.</h2></div>;
    if (status === "empty") return <div className="quiz-page"><h2>Geen vragen beschikbaar.</h2></div>;

    const q = questions[currentIndex];

    if (!q) {
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
    const handleSkip = () => {
        const nextIndex = currentIndex + 1;
        if (nextIndex < questions.length) {
            setCurrentIndex(nextIndex);
            setSelectedChoice(null);
            return;
        }

        try {
            const payload = { counts, answers: answersList };
            sessionStorage.setItem('quizResults', JSON.stringify(payload));
        } catch (e) {
            console.warn('Could not write results to sessionStorage', e);
        }
        navigate('/quiz/results', { state: { counts, answers: answersList } });
    };

    const isCorrect = selectedChoice !== null && typeof q.answer === 'number' && selectedChoice === q.answer;

    // HTML.
    return (
        <div className="quiz-page">
            {quizTitle ? <div style={{ textAlign: 'center', marginBottom: 8 }}>
                <h2 style={{ marginBottom: 4 }}>{quizTitle}</h2>
                {quizDescription ? <div style={{ fontSize: 14, color: '#ccc' }}>{quizDescription}</div> : null}
            </div> : null}
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

            <div style={{ marginTop: 12, textAlign: 'center' }}>
                <button onClick={handleSkip} className="next-btn">Skip</button>
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