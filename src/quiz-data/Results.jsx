import { useEffect, useState } from "react";
import { useLocation, Link } from "react-router";
import "./quiz.css";

export default function Results() {
    const location = useLocation();
    const [data, setData] = useState({ counts: {}, answers: [], quizId: null });

    useEffect(() => {
        const fromState = location.state || {};
        const navQuizId =
            fromState.quizId ||
            fromState.category ||
            (fromState.quiz && (fromState.quiz.id || fromState.quiz.name)) ||
            null;

        const allAnswers = fromState.answers || [];

        let useQuizId = navQuizId;
        if (!useQuizId) {
            const uniq = Array.from(new Set(allAnswers.map(a => a && a.quizId).filter(Boolean)));
            if (uniq.length === 1) useQuizId = uniq[0];
            else if (uniq.length > 1)
                useQuizId = allAnswers.length ? allAnswers[allAnswers.length - 1].quizId || null : null;
        }

        const filtered = useQuizId
            ? allAnswers.filter(a => String(a.quizId) === String(useQuizId))
            : allAnswers.filter(a => a && a.quizId);

        // Dynamische keuzes ophalen uit filtered antwoorden
        const members = Array.from(
            new Set(filtered.flatMap(a => [a.selected, a.correct]).filter(Boolean))
        );

        // Counts per keuze berekenen
        const counts = members.reduce((acc, m) => {
            return {
                ...acc,
                [m]: filtered.reduce((s, a) => s + (a.selected === m ? 1 : 0), 0)
            };
        }, {});

        setData({ counts, answers: filtered, quizId: useQuizId });

        // fallback naar sessionStorage als location.state leeg is
        if (!filtered.length) {
            try {
                const raw = sessionStorage.getItem("quizResults");
                if (raw) {
                    const parsed = JSON.parse(raw);
                    const storedAnswers = parsed.answers || [];
                    const storedQuizId = parsed.quizId || useQuizId;

                    const filteredStored = storedQuizId
                        ? storedAnswers.filter(a => String(a.quizId) === String(storedQuizId))
                        : storedAnswers.filter(a => a && a.quizId);

                    const membersStored = Array.from(
                        new Set(filteredStored.flatMap(a => [a.selected, a.correct]).filter(Boolean))
                    );

                    const countsStored = membersStored.reduce((acc, m) => {
                        return {
                            ...acc,
                            [m]: filteredStored.reduce((s, a) => s + (a.selected === m ? 1 : 0), 0)
                        };
                    }, {});

                    setData({ counts: countsStored, answers: filteredStored, quizId: storedQuizId });
                }
            } catch (e) {
                console.warn("Could not read quiz results from sessionStorage", e);
            }
        }
    }, [location]);

    // Render logica
    const counts = data.counts || {};
    const total = Object.values(counts).reduce((s, v) => s + v, 0);
    const members = Object.keys(counts);
    const values = members.map(m => counts[m] || 0);
    const maxValue = Math.max(...values, 1);

    // dynamische kleuren (optioneel: fallback)
    const defaultColors = ["#4caf50", "#2196f3", "#ff9800", "#9c27b0"];

    // Koppel elke member dynamisch aan een kleur
    const colors = members.reduce((acc, member, i) => {
        acc[member] = defaultColors[i] || "#ccc"; // fallback kleur als er meer members zijn
        return acc;
    }, {});

    return (
        <div className="results-container">
            <h2>Resultaten</h2>

            {total === 0 ? (
                <p>Er zijn nog geen antwoorden geregistreerd.</p>
            ) : (
                <div>
                    {/* Kolom Grafiek */}
                    <div className="results-chart">
                        {members.map(m => {
                            const value = counts[m] || 0;
                            const heightPct = Math.round((value / maxValue) * 100);
                            const pctOfTotal = total ? Math.round((value / total) * 100) : 0;
                            return (
                                <div key={m} className="results-member">
                                    <div className="results-member-inner">
                                        <div
                                            title={`${m}: ${value} (${pctOfTotal}%)`}
                                            className="results-bar"
                                            style={{ height: `${heightPct}%`, background: colors[m] || "#ccc" }}
                                        />
                                    </div>
                                    <div className="results-member-name">
                                        <strong>{m}</strong>
                                    </div>
                                    <div className="results-member-value">
                                        {value} ({pctOfTotal}%)
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    <h3 className="results-answers">Beantwoorde vragen (dit quiz)</h3>
                    <ol>
                        {data.answers.map((a, i) => (
                            <li key={i} className="answer-item">
                                <div>
                                    <strong>Vraag:</strong> {a.prompt}
                                </div>
                                <div>
                                    <strong>Juiste antwoord:</strong> {a.correct || "Onbekend"}
                                </div>
                                <div>
                                    <strong>Jouw antwoord:</strong> {a.selected || "Geen antwoord"}
                                    {a.selected === a.correct ? (
                                        <span style={{ color: "lightgreen", marginLeft: 8 }}>✓ Correct</span>
                                    ) : (
                                        <span style={{ color: "#ff6b6b", marginLeft: 8 }}>✗ Fout</span>
                                    )}
                                </div>
                                {a.source && (
                                    <div>
                                        <small>
                                            Bron: {a.source} {a.sourceUrl && <a href={a.sourceUrl} target="_blank" rel="noreferrer">(view)</a>}
                                        </small>
                                    </div>
                                )}
                            </li>
                        ))}
                    </ol>
                </div>
            )}

            <div className="results-buttons">
                <Link to="/quiz" className="btn">
                    Maak de quiz opnieuw
                </Link>
                <Link to="/quiz/talk" className="btn" state={{ counts, answers: data.answers || [] }}>
                    Bespreken
                </Link>
                <Link to="/quiz" className="btn">
                    Terug naar Quizzes
                </Link>
            </div>
        </div>
    );
}