import { useEffect, useState } from "react";
import { useLocation, Link } from "react-router";
import "./quiz.css";

export default function Talk() {
    const location = useLocation();
    const [data, setData] = useState({ counts: { Moeder: 0, Vader: 0, Zoon: 0, Dochter: 0 }, answers: [] });
    const [notes, setNotes] = useState('');
    const [saved, setSaved] = useState(false);

    useEffect(() => {
        // Prefer state passed in navigation, otherwise fall back to sessionStorage
        const fromState = location.state;
        if (fromState && (fromState.counts || fromState.answers)) {
            setData({ counts: fromState.counts || data.counts, answers: fromState.answers || [] });
        } else {
            try {
                const raw = sessionStorage.getItem('quizResults');
                if (raw) {
                    const parsed = JSON.parse(raw);
                    setData({ counts: parsed.counts || data.counts, answers: parsed.answers || [] });
                }
            } catch (e) { console.warn('Could not read quiz results from sessionStorage', e); }
        }

        try {
            const rawNotes = sessionStorage.getItem('quizTalkNotes');
            if (rawNotes) setNotes(rawNotes);
        } catch (e) { /* ignore */ }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [location]);

    const saveNotes = () => {
        try {
            sessionStorage.setItem('quizTalkNotes', notes);
            setSaved(true);
            setTimeout(() => setSaved(false), 1600);
        } catch (e) {
            console.warn('Could not save notes', e);
        }
    };

    const counts = data.counts || { Moeder: 0, Vader: 0, Zoon: 0, Dochter: 0 };

    return (
        <div className="quiz-talk-container">
            <h2>Gespreksmoment</h2>

            <p>Neem even de tijd om te praten over de uitkomsten van de quiz. Je kunt hier aantekeningen maken die voor later bewaard worden (in de browser).</p>

            <div className="talk-summary">
                <h3>Samenvatting resultaten</h3>
                <div className="talk-counts">
                    {Object.entries(counts).map(([k, v]) => (
                        <div key={k} className="talk-count-item">
                            <strong>{k}</strong>
                            <div className="talk-count-value">{v}</div>
                        </div>
                    ))}
                </div>

                <h4 className="talk-answers-title">Beantwoorde vragen</h4>
                <ol className="talk-answers-list">
                    {data.answers && data.answers.length ? (
                        data.answers.map((a, i) => (
                            <li key={i} className="talk-answer-item">
                                <div><strong>Vraag:</strong> {a.prompt}</div>
                                <div><strong>Gekozen:</strong> {a.selected} {a.correct ? (<span> — Correct: {a.correct}</span>) : null}</div>
                            </li>
                        ))
                    ) : (
                        <li>Geen antwoorden om te tonen.</li>
                    )}
                </ol>
            </div>

            <div className="talk-notes">
                <h3>Notities/Actiepunten</h3>
                <textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Schrijf hier jullie notities of actiepunten..."
                />
                <div className="talk-note-actions">
                    <button className="btn" onClick={saveNotes}>Opslaan</button>
                    <button className="btn" onClick={() => { setNotes(''); try { sessionStorage.removeItem('quizTalkNotes'); } catch (e) {} }}>Leegmaken</button>
                    <Link to="/quiz/results" className="btn">Terug naar resultaten</Link>
                </div>
                {saved && <div className="talk-saved">Opgeslagen</div>}
            </div>

            <div className="quiz-footer">
                <Link to="/quiz" className="btn">Maak de quiz opnieuw</Link>
                <Link to="/Home" className="btn">Terug naar home</Link>
            </div>
        </div>
    );
}
