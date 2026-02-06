import "./LectureModal.css";

const LectureTopicsModal = ({ data, setData, onClose }) => {
  const addUnit = () => {
    setData([
      ...data,
      {
        id: Date.now(),
        name: "New Unit",
        topics: ["New Topic"],
      },
    ]);
  };

  const updateUnitName = (unitIndex, value) => {
    const updated = [...data];
    updated[unitIndex].name = value;
    setData(updated);
  };

  const removeUnit = (unitIndex) => {
    if (data.length === 1) return;
    setData(data.filter((_, i) => i !== unitIndex));
  };

  const addTopic = (unitIndex) => {
    const updated = [...data];
    updated[unitIndex].topics.push("New Topic");
    setData(updated);
  };

  const updateTopic = (unitIndex, topicIndex, value) => {
    const updated = [...data];
    updated[unitIndex].topics[topicIndex] = value;
    setData(updated);
  };

  const removeTopic = (unitIndex, topicIndex) => {
    const updated = [...data];
    if (updated[unitIndex].topics.length === 1) return;
    updated[unitIndex].topics.splice(topicIndex, 1);
    setData(updated);
  };

  return (
    <div className="ltm-backdrop" onClick={onClose}>
      <div className="ltm-modal" onClick={(e) => e.stopPropagation()}>
        <h3>Edit Lecture Topics & Units</h3>

        {data.map((unit, uIndex) => (
          <div key={unit.id} className="ltm-unit">
            <div className="ltm-unit-header">
              <input
                value={unit.name}
                onChange={(e) => updateUnitName(uIndex, e.target.value)}
              />
              <button className="danger" onClick={() => removeUnit(uIndex)}>
                <i className="fa-solid fa-trash"></i>
              </button>
            </div>

            {unit.topics.map((topic, tIndex) => (
              <div key={tIndex} className="ltm-topic">
                <input
                  value={topic}
                  onChange={(e) => updateTopic(uIndex, tIndex, e.target.value)}
                />
                <button
                  className="danger"
                  onClick={() => removeTopic(uIndex, tIndex)}
                >
                  <i className="fa-solid fa-trash"></i>
                </button>
              </div>
            ))}

            <button className="secondary" onClick={() => addTopic(uIndex)}>
              + Add Topic
            </button>
          </div>
        ))}

        <div className="ltm-footer">
          <button className="secondary" onClick={addUnit}>
            + Add Unit
          </button>

          <div className="ltm-actions">
            <button className="secondary" onClick={onClose}>
              Cancel
            </button>
            <button className="primary" onClick={onClose}>
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LectureTopicsModal;
