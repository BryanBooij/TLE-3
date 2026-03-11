import { useEffect, useState } from "react";
import { useLocation, Link } from "react-router";
import "./quiz.css";

export default function Results() {
    const location = useLocation();
    const [data, setData] = useState({ counts: { Moeder: 0, Vader: 0, Zoon: 0, Dochter: 0 }, answers: [], quizId: null });

    useEffect(() => {
        // Haal de data op uit de location.state als die bestaat.
        const fromState = location.state || {};
        // Determine current quizId from navigation state first.
        const navQuizId = fromState.quizId || fromState.category || (fromState.quiz && (fromState.quiz.id || fromState.quiz.name)) || null;
        if (fromState && (fromState.counts || fromState.answers)) {
            const allAnswers = fromState.answers || [];
            // Determine quizId to use: prefer navQuizId, otherwise infer from answers.
            let useQuizId = navQuizId;
            if (!useQuizId) {
                const uniq = Array.from(new Set(allAnswers.map(a => a && a.quizId).filter(Boolean)));
                if (uniq.length === 1) useQuizId = uniq[0];
                else if (uniq.length > 1) useQuizId = allAnswers.length ? (allAnswers[allAnswers.length - 1].quizId || null) : null;
            }
            const filtered = useQuizId ? allAnswers.filter(a => String(a.quizId) === String(useQuizId)) : allAnswers.filter(a => a && a.quizId);
            const members = ["Moeder", "Vader", "Zoon", "Dochter"];
            const counts = members.reduce((acc, m) => ({ ...acc, [m]: filtered.reduce((s, a) => s + ((a && a.correct) === m ? 1 : 0), 0) }), {});
            setData({ counts: { Moeder: counts.Moeder || 0, Vader: counts.Vader || 0, Zoon: counts.Zoon || 0, Dochter: counts.Dochter || 0 }, answers: filtered, quizId: useQuizId });
            return;
        }

        try {
            const raw = sessionStorage.getItem('quizResults');
            if (raw) {
                const parsed = JSON.parse(raw);
                const storedQuizId = parsed.quizId || null;
                const allAnswers = parsed.answers || [];
                // If storedQuizId absent, try to infer similar to above.
                let useQuizId = storedQuizId;
                if (!useQuizId) {
                    const uniq = Array.from(new Set(allAnswers.map(a => a && a.quizId).filter(Boolean)));
                    if (uniq.length === 1) useQuizId = uniq[0];
                    else if (uniq.length > 1) useQuizId = allAnswers.length ? (allAnswers[allAnswers.length - 1].quizId || null) : null;
                }
                const filtered = useQuizId ? allAnswers.filter(a => String(a.quizId) === String(useQuizId)) : allAnswers.filter(a => a && a.quizId);
                const members = ["Moeder", "Vader", "Zoon", "Dochter"];
                const counts = members.reduce((acc, m) => ({ ...acc, [m]: filtered.reduce((s, a) => s + ((a && a.correct) === m ? 1 : 0), 0) }), {});
                setData({ counts: { Moeder: counts.Moeder || 0, Vader: counts.Vader || 0, Zoon: counts.Zoon || 0, Dochter: counts.Dochter || 0 }, answers: filtered, quizId: useQuizId });
            }
        } catch (e) {
            console.warn('Could not read quiz results from sessionStorage', e);
        }
    }, [location]);

    const counts = data.counts || { Moeder: 0, Vader: 0, Zoon: 0, Dochter: 0 };
    const total = Object.values(counts).reduce((s, v) => s + (v || 0), 0);

    const members = ["Moeder", "Vader", "Zoon", "Dochter"];

    // Voor de grafiek. Zet de kleuren en percentages.
    const values = members.map(m => counts[m] || 0);
    const maxValue = Math.max(...values, 1);
    const colors = { Moeder: '#4caf50', Vader: '#2196f3', Zoon: '#ff9800', Dochter: '#9c27b0' };

    return (
        <div className="results-container">
            <h2>Resultaten</h2>

            {total === 0 ? (
                <p>Er zijn nog geen antwoorden geregistreerd.</p>
            ) : (
                <div>
                    {/* Kolom Grafiek */}
                    <div className="results-chart">
                        {members.map((m) => {
                            const value = counts[m] || 0;
                            const heightPct = Math.round((value / maxValue) * 100);
                            const pctOfTotal = total ? Math.round((value / total) * 100) : 0;
                            return (
                                <div key={m} className="results-member">
                                    <div className="results-member-inner">
                                        <div
                                            title={`${m}: ${value} (${pctOfTotal}%)`}
                                            className="results-bar"
                                            style={{ height: `${heightPct}%`, background: colors[m] }}
                                        />
                                    </div>
                                    <div className="results-member-name">
                                        <strong>{m}</strong>
                                    </div>
                                    <div className="results-member-value">{value} ({pctOfTotal}%)</div>
                                </div>
                            );
                        })}
                    </div>

                    <h3 className="results-answers">Beantwoorde vragen (dit quiz)</h3>
                    <ol>
                        {data.answers && data.answers.length ? (
                            data.answers.map((a, i) => (
                                <li key={i} className="answer-item">
                                    <div><strong>Vraag:</strong> {a.prompt}</div>
                                    <div>
                                        <strong>Juiste antwoord:</strong> {a.correct || 'Onbekend'}
                                    </div>

                                    <div>
                                        <strong>Jouw antwoord:</strong> {a.selected || 'Geen antwoord'}
                                        {a.selected === a.correct ? (
                                            <span style={{ color: "lightgreen", marginLeft: 8 }}>✓ Correct</span>
                                        ) : (
                                            <span style={{ color: "#ff6b6b", marginLeft: 8 }}>✗ Fout</span>
                                        )}
                                    </div>
                                    {a.source ? (
                                        <div><small>Bron: {a.source} {a.sourceUrl ? <a href={a.sourceUrl} target="_blank" rel="noreferrer">(view)</a> : null}</small></div>
                                    ) : null}
                                </li>
                            ))
                        ) : (
                            <p>Geen antwoorden om te tonen voor deze quiz.</p>
                        )}
                    </ol>
                </div>
            )}

            <div className="results-buttons">
                <Link to="/quiz" className="btn">Maak de quiz opnieuw</Link>
                <Link to="/quiz/talk" className="btn" state={{ counts, answers: data.answers || [] }}>Bespreken</Link>
                <Link to="/Home" className="btn">Terug naar home</Link>
            </div>
        </div>
    );
}
