import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import "./quiz.css";

const BACKEND_BASE = 'http://145.24.237.168:8000';

async function safeJson(res) {
    try { return await res.json(); }
    catch (e) {
        try { return { text: await res.text() }; } catch (e2) { return null; }
    }
}

export default function Categories() {
    const [status, setStatus] = useState('loading');
    const [categories, setCategories] = useState([]);
    const [error, setError] = useState(null);
    const [attemptLogs, setAttemptLogs] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        let mounted = true;

        const load = async () => {
            let lastError = null;

            const tryFetch = async (url, headers) => {
                const opts = { headers: { Accept: headers }, mode: 'cors' };
                try {
                    const res = await fetch(url, opts);
                    setAttemptLogs((s) => [...s, { url, status: res.status, statusText: res.statusText, accept: headers }]);
                    return res;
                } catch (e) {
                    setAttemptLogs((s) => [...s, { url, error: e.message || String(e), accept: headers }]);
                    throw e;
                }
            };

            // Direct backend only: try direct backend host with application/json
            try {
                let res = await tryFetch(`${BACKEND_BASE}/quizzes`, 'application/json');
                if (res && res.status === 406) {
                    // retry with wildcard Accept
                    res = await tryFetch(`${BACKEND_BASE}/quizzes`, '*/*');
                }

                if (res && res.ok) {
                    const json = await safeJson(res);
                    const data = Array.isArray(json) ? json : (json && (json.categories || json.data || json.list || json.result)) || [];
                    if (mounted) { setCategories(data); setStatus(data.length ? 'ready' : 'empty'); }
                    return;
                }

                lastError = `Direct fetch failed: ${res ? `${res.status} ${res.statusText}` : 'no response'}`;
            } catch (directErr) {
                lastError = directErr.message || String(directErr);
            }

            if (mounted) { setStatus('error'); setError(lastError); }
        };

        load();
        return () => { mounted = false };
    }, []);

    const startQuiz = (category, quizObj) => {
        navigate('/quiz/start', { state: { category, quiz: quizObj } });
    };

    if (status === 'loading') return <div className="quiz-page"><h2>Loading quizzes…</h2></div>;
    if (status === 'error') return (
        <div className="quiz-page">
            <h2>Kan quizzes niet ophalen</h2>
            <p>{error}</p>
            {attemptLogs && attemptLogs.length ? (
                <div style={{ marginTop: 12 }}>
                    <h4>Debug fetch attempts</h4>
                    <ul style={{ fontSize: 12, color: '#ddd' }}>
                        {attemptLogs.map((l, idx) => (
                            <li key={idx}>
                                <div><strong>URL:</strong> {l.url}</div>
                                {l.status ? <div><strong>HTTP:</strong> {l.status} {l.statusText}</div> : null}
                                {l.error ? <div><strong>Error:</strong> {l.error}</div> : null}
                                {l.result ? <div><strong>Result:</strong> <pre style={{ whiteSpace: 'pre-wrap' }}>{JSON.stringify(l.result)}</pre></div> : null}
                            </li>
                        ))}
                    </ul>
                </div>
            ) : null}
            <div className="quiz-footer">
                <button className="btn" onClick={() => window.location.reload()}>Probeer opnieuw</button>
            </div>
        </div>
    );
    if (status === 'empty') return (
        <div className="quiz-page">
            <h2>Geen quizzes gevonden</h2>
            <div className="quiz-footer">
                <button className="btn" onClick={() => navigate('/quiz/start', { state: { category: null } })}>Start quiz anyway</button>
            </div>
        </div>
    );

    return (
        <div className="quiz-page">
            <h2>kies welke quiz je wilt maken!</h2>
            <div style={{ width: '100%', marginTop: 12 }}>
                {categories.map((c) => (
                    <button key={c.id || c.name} className="choice-btn" onClick={() => startQuiz(c.id || c.name, c)}>
                        <div style={{ fontWeight: 700 }}>{c.name || c.title}</div>
                        {c.description ? <div style={{ fontSize: 12, marginTop: 6 }}>{c.description}</div> : null}
                    </button>
                ))}
            </div>
        </div>
    );
}
