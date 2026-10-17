import { useState } from "react";
import { trpc } from "./trpc";

export default function App() {
  const [status, setStatus] = useState("Нажми кнопку, чтобы отправить запрос на сервер.");
  const [busy, setBusy] = useState(false);
  const [clickCount, setClickCount] = useState(0);

  async function handleClick() {
    setBusy(true);
    setStatus("Отправляем запрос на сервер…");

    try {
      const result = await trpc.logButton.mutate({
        message: `Пользователь нажал кнопку (нажатие №${clickCount + 1})`,
      });
      setClickCount((count) => count + 1);
      setStatus(`Успех! ${result.message}.`);
    } catch (error) {
      console.error("Не удалось связаться с сервером:", error);
      setStatus("Ошибка соединения. Проверь, запущен ли сервер в терминале.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <main className="page">
      <section className="panel">
        <div className="eyebrow"><span className="status-dot" /> REACT + TYPESCRIPT + TRPC</div>
        <h1>Связь клиента<br />с сервером</h1>
        <p className="description">
          Нажми кнопку. Браузер отправит запрос на backend, а сервер выведет сообщение в терминал.
        </p>
        <button className="action-button" onClick={handleClick} disabled={busy}>
          {busy ? "Отправка…" : "Нажми меня"}
        </button>
        <div className="result" role="status" aria-live="polite">
          <span className="result-label">ОТВЕТ КЛИЕНТА</span>
          <p>{status}</p>
        </div>
        <div className="counter">Успешных нажатий в этой сессии: <strong>{clickCount}</strong></div>
      </section>
      <p className="footnote">Сервер: 127.0.0.1:3000 · Клиент: 127.0.0.1:5173</p>
    </main>
  );
}
