import { useEffect, useState } from "react";
import { useLocation, Link } from "react-router";
import "./quiz.css";

export default function Results() {
    const location = useLocation();
    const [data, setData] = useState({ counts: { Moeder: 0, Vader: 0, Zoon: 0, Dochter: 0 }, answers: [] });

    useEffect(() => {
        // Haal de data op uit de location.state als die bestaat.
        const fromState = location.state;
        if (fromState && (fromState.counts || fromState.answers)) {
            setData({ counts: fromState.counts || data.counts, answers: fromState.answers || [] });
            return;
        }

        try {
            const raw = sessionStorage.getItem('quizResults');
            if (raw) {
                const parsed = JSON.parse(raw);
                setData({ counts: parsed.counts || data.counts, answers: parsed.answers || [] });
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
    const maxValue = Math.max(...values, 1); // avoid division by zero
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

                    <h3 className="results-answers">Beantwoorde vragen</h3>
                    <ol>
                        {data.answers && data.answers.length ? (
                            data.answers.map((a, i) => (
                                <li key={i} className="answer-item">
                                    <div><strong>Vraag:</strong> {a.prompt}</div>
                                    <div><strong>Gekozen:</strong> {a.selected} {a.correct ? (<span> — Correct: {a.correct}</span>) : null}</div>
                                    {a.source ? (
                                        <div><small>Bron: {a.source} {a.sourceUrl ? <a href={a.sourceUrl} target="_blank" rel="noreferrer">(view)</a> : null}</small></div>
                                    ) : null}
                                </li>
                            ))
                        ) : (
                            <p>Geen antwoorden om te tonen.</p>
                        )}
                    </ol>
                </div>
            )}

            <div className="results-buttons">
                <Link to="/quiz" className="btn">Maak de quiz opnieuw</Link>
                <Link to="/" className="btn">Terug naar home</Link>
            </div>
        </div>
    );
}
