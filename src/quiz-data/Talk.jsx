import { useEffect, useState } from "react";
import { useLocation, useNavigate, } from "react-router";
import "./quiz.css";
import BigButton from "../buttons/BigButton.jsx";
import infoButton from "../buttons/InfoButton.jsx";
import InfoButton from "../buttons/InfoButton.jsx";

export default function Talk() {
    const location = useLocation();
    const navigate = useNavigate();
    const [data, setData] = useState({ counts: { Moeder: 0, Vader: 0, Zoon: 0, Dochter: 0 }, answers: [] });
    const [notes, setNotes] = useState('');
    const [saved, setSaved] = useState(false);

    useEffect(() => {
        const fromState = location.state;
        console.log(fromState)
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
        <>
            <div className="quiz-talk-container">
                <h2>Gespreksmoment</h2>

                <div className="talk-content">
                    <img src="/discussion.png" alt="Discussion" className="discussion-image"/>
                    <div className="talk-left">
                        <p>Nu je de test hebt gemaakt.... zullen we even praten?</p>
                        <p>misschien kun je de volgende keer beter scoren!</p>

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
                                            <div>
                                                <strong>Gekozen:</strong> {a.selected}
                                                {a.correct ? (
                                                    <span> — Correct: {a.correct}</span>
                                                ) : null}
                                            </div>
                                        </li>
                                    ))
                                ) : (
                                    <li>Geen antwoorden om te tonen.</li>
                                )}
                            </ol>
                        </div>
                        <BigButton label="Terug naar start" onClick={() => navigate("/Home")}/>
                    </div>

                </div>
                <div className="talk-notes">
                    <input type="checkbox" id="info"/>
                    <InfoButton alt="InfoButton" label="InfoButton" onClick={() => (window.location.href = "https://huggingface.co/terms-of-service")}/>
                    <label htmlFor="hugginface">Sla quiz resultaten niet op.</label>
                </div>
            </div>

                {/*<h3>Notities/Actiepunten</h3>*/}
                {/*<textarea*/}
                {/*    value={notes}*/}
                {/*    onChange={(e) => setNotes(e.target.value)}*/}
                {/*    placeholder="Schrijf hier jullie notities of actiepunten..."*/}
                {/*/>*/}
                {/*<div className="talk-note-actions">*/}
                {/*    <BigButton label="Opslaan" onClick={saveNotes} />*/}
                {/*    <BigButton label="Leegmaken" onClick={() => { setNotes(''); try { sessionStorage.removeItem('quizTalkNotes'); } catch (e) {} }} />*/}
                {/*</div>*/}
                {/*{saved && <div className="talk-saved">Opgeslagen</div>}*/}
        </>
    );
}
