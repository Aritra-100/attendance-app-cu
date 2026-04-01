import { useState, useEffect } from "react";
import "./LectureModal.css";

const LectureTopicsModal = ({ data, setData, onCancel, onSave }) => {
  const [localData, setLocalData] = useState([]);

  // Copy data into local state when modal opens
  useEffect(() => {
    setLocalData(JSON.parse(JSON.stringify(data)));
  }, [data]);

  const addUnit = () => {
    setLocalData([
      ...localData,
      {
        id: Date.now(),
        name: "New Unit",
        topics: [{ id: Date.now(), name: "New Topic" }],
      },
    ]);
  };

  const updateUnitName = (unitIndex, value) => {
    const updated = [...localData];
    updated[unitIndex].name = value;
    setLocalData(updated);
  };

  const removeUnit = (unitIndex) => {
    const updated = [...localData];
    updated.splice(unitIndex, 1);
    setLocalData(updated);
  };

  const addTopic = (unitIndex) => {
    const updated = [...localData];
    updated[unitIndex].topics.push({
      id: Date.now(),
      name: "New Topic",
    });
    setLocalData(updated);
  };

  const updateTopic = (unitIndex, topicIndex, value) => {
    const updated = [...localData];
    updated[unitIndex].topics[topicIndex].name = value;
    setLocalData(updated);
  };

  const removeTopic = (unitIndex, topicIndex) => {
    const updated = [...localData];
    updated[unitIndex].topics.splice(topicIndex, 1);
    setLocalData(updated);
  };

  const handleSave = () => {
    setData(localData); // keep parent UI in sync
    onSave(localData); // save the latest edited data to backend
  };

  return (
    <div className="ltm-backdrop" onClick={onCancel}>
      <div className="ltm-modal" onClick={(e) => e.stopPropagation()}>
        <h3>Edit Lecture Topics & Units</h3>

        {localData.length === 0 && (
          <div className="text-muted mb-3">
            No units yet. Click <b>Add Unit</b> to create curriculum structure.
          </div>
        )}

        {localData.map((unit, uIndex) => (
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
              <div key={topic.id} className="ltm-topic">
                <input
                  value={topic.name}
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
            <button className="secondary" onClick={onCancel}>
              Cancel
            </button>
            <button className="primary" onClick={handleSave}>
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LectureTopicsModal;
