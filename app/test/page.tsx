/** Render multiple/visual/sequence question appropriately */
function renderQuestion(q: Question) {
  // 🔹 Multiple-choice / visual
  if ("optionsKey" in q) {
    return (
      <div style={{ display: "grid", gap: 8 }}>
        {q.optionsKey.map((optKey: string, i: number) => (
          <label
            key={i}
            className="card"
            style={{
              padding: 12,
              display: "flex",
              gap: 8,
              alignItems: "center",
            }}
          >
            <input
              type="radio"
              name={`q-${q.id}`}
              checked={answers[q.id] === optKey}
              onChange={() => setChoice(optKey)}
            />
            {renderText(dict, optKey, `Missing: ${optKey}`)}
          </label>
        ))}
      </div>
    );
  }

  // 🔹 Sequence-type (interaktiv rekkefølge)
  if ("itemsKey" in q) {
    const selected = answers[q.id] || [];
    const handleSelect = (itemKey: string) => {
      // Hvis allerede valgt → fjern den, ellers legg til
      setAnswers((prev) => {
        const current = prev[q.id] || [];
        const exists = current.includes(itemKey);
        const newOrder = exists
          ? current.filter((x: string) => x !== itemKey)
          : [...current, itemKey];
        return { ...prev, [q.id]: newOrder };
      });
    };

    const allSelected = selected.length === q.itemsKey.length;

    return (
      <div style={{ display: "grid", gap: 8 }}>
        {q.itemsKey.map((itmKey: string, i: number) => {
          const pos = selected.indexOf(itmKey);
          const selectedNum = pos >= 0 ? pos + 1 : null;
          return (
            <button
              key={i}
              onClick={() => handleSelect(itmKey)}
              className="card"
              style={{
                padding: 12,
                textAlign: "left",
                border:
                  pos >= 0 ? "2px solid var(--accent)" : "1px solid #ccc",
                background:
                  pos >= 0 ? "rgba(0,128,255,0.1)" : "transparent",
                borderRadius: 8,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              {renderText(dict, itmKey, `Missing: ${itmKey}`)}
              {selectedNum && (
                <span
                  style={{
                    background: "var(--accent)",
                    color: "white",
                    borderRadius: "50%",
                    width: 24,
                    height: 24,
                    fontSize: 12,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {selectedNum}
                </span>
              )}
            </button>
          );
        })}

        {!allSelected && (
          <p className="muted text-sm">
            Tap items in correct order ({selected.length}/{q.itemsKey.length})
          </p>
        )}

        {allSelected && (
          <p className="text-sm" style={{ color: "green" }}>
            ✅ Sequence complete
          </p>
        )}
      </div>
    );
  }

  // 🔹 fallback
  return <p>Unsupported question type</p>;
}
