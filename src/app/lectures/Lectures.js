import { useContext, useState } from "react";
import BatchContext from "../../context/batch/BatchContext";
import "./Lectures.css";
import LectureTopicsModal from "../../components/lectureModal/LectureModal";

const Lectures = () => {
  const { activeBatch } = useContext(BatchContext);

  const [mode, setMode] = useState("manual"); // ai | manual
  const [hasSavedPlan, setHasSavedPlan] = useState(false);
  const [isEditing, setIsEditing] = useState(true);

  const [weeks, setWeeks] = useState([
    {
      id: Date.now(),
      topics: [
        {
          id: Date.now(),
          title: "",
          objectives: "",
          classes: 1,
        },
      ],
    },
  ]);

  const [showEditTopics, setShowEditTopics] = useState(false);

  const [lectureTopics, setLectureTopics] = useState([
    {
      id: "unit-1",
      name: "Unit 1: Introduction to Computer Science",
      topics: [
        "History of Computing",
        "What is an Algorithm?",
        "Data Structures Overview",
      ],
    },
  ]);

  const [showTopics, setShowTopics] = useState(false);

  if (!activeBatch) return null;

  /* ================= HELPERS ================= */

  const addWeek = () => {
    setWeeks((prev) => [
      ...prev,
      {
        id: Date.now(),
        topics: [
          {
            id: Date.now(),
            title: "",
            objectives: "",
            classes: 1,
          },
        ],
      },
    ]);
  };

  const removeWeek = (weekIndex) => {
    if (weeks.length === 1) return;
    setWeeks((prev) => prev.filter((_, i) => i !== weekIndex));
  };

  const addTopic = (weekIndex) => {
    const updated = [...weeks];
    updated[weekIndex].topics.push({
      id: Date.now(),
      title: "",
      objectives: "",
      classes: 1,
    });
    setWeeks(updated);
  };

  const removeTopic = (weekIndex, topicIndex) => {
    const updated = [...weeks];
    if (updated[weekIndex].topics.length === 1) return;
    updated[weekIndex].topics.splice(topicIndex, 1);
    setWeeks(updated);
  };

  const updateTopic = (weekIndex, topicIndex, field, value) => {
    const updated = [...weeks];
    updated[weekIndex].topics[topicIndex][field] = value;
    setWeeks(updated);
  };

  const savePlan = () => {
    setMode("manual");
    setHasSavedPlan(true);
    setIsEditing(false);
  };

  /* ================= UI ================= */

  return (
    <div className="container-fluid lectures-page">
      {/* HEADER */}
      <div className="mb-4">
        <h2 className="lectures-title">Lecture Topics</h2>
        <p className="lectures-subtitle">
          View the curriculum and create a teaching plan for the semester.
        </p>
      </div>

      {/* CURRICULUM CARD */}
      <div className="card lectures-card mb-4">
        <div className="card-body d-flex justify-content-between align-items-center">
          <div>
            <h5 className="card-title mb-1">
              Lecture Topics for {activeBatch.name}
            </h5>
            <p className="text-muted mb-0">
              Organize units and topics before planning the semester.
            </p>
          </div>

          <div className="d-flex gap-2">
            <button
              className="btn btn-outline-secondary"
              onClick={() => setShowTopics((prev) => !prev)}
            >
              <i className="fa-solid fa-eye"></i>{" "}
              {showTopics ? "Hide Topics" : "Show Topics"}
            </button>

            <button
              className="btn btn-outline-secondary"
              onClick={() => setShowEditTopics(true)}
            >
              <i className="fa-solid fa-pen"></i> Edit Topics
            </button>
          </div>
        </div>
      </div>

      {/* READ ONLY TOPICS */}
      {showTopics && (
        <div className="card lectures-card mb-4">
          <div className="card-body">
            <h5 className="card-title mb-3">Lecture Topics</h5>

            {lectureTopics.map((unit) => (
              <div key={unit.id} className="mb-3">
                <h6 className="fw-semibold">{unit.name}</h6>

                <ul className="ms-3">
                  {unit.topics.map((topic, index) => (
                    <li key={index} className="text-muted">
                      {topic}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TEACHING PLAN CARD */}
      <div className="card lectures-card">
        <div className="card-body">
          {/* READ ONLY VIEW */}
          {hasSavedPlan && !isEditing && (
            <>
              <div className="d-flex justify-content-between align-items-center mb-3">
                <div>
                  <h5 className="card-title mb-1">Teaching Plan</h5>
                  <p className="text-muted mb-0">
                    Your semester teaching plan has been saved.
                  </p>
                </div>

                <button
                  className="btn btn-outline-secondary"
                  onClick={() => {
                    setIsEditing(true);
                    setHasSavedPlan(false);
                    setMode("manual");
                  }}
                >
                  <i className="fa-solid fa-pen"></i> Edit Plan
                </button>
              </div>

              <div className="read-plan">
                {weeks.map((week, wIndex) => (
                  <div key={week.id} className="week-container readonly">
                    <div className="week-header">
                      <h5>Week {wIndex + 1}</h5>
                    </div>

                    {week.topics.map((topic) => (
                      <div key={topic.id} className="topic-readonly">
                        <div className="topic-read-header">
                          <h6>{topic.title || "Untitled Topic"}</h6>
                          <span className="classes-pill">
                            {topic.classes} class
                            {topic.classes > 1 ? "es" : ""}
                          </span>
                        </div>

                        {topic.objectives && (
                          <p className="topic-objectives">{topic.objectives}</p>
                        )}
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </>
          )}

          {/* EDIT MODE */}
          {!hasSavedPlan && (
            <>
              <h5 className="card-title mb-1">Create a Teaching Plan</h5>
              <p className="lectures-subtitle">
                Choose how you want to structure the semester.
              </p>

              <div className="plan-mode-toggle mt-3 mb-4">
                <button
                  className={`mode-btn ${mode === "ai" ? "active" : ""}`}
                  onClick={() => setMode("ai")}
                >
                  <i className="fa-solid fa-robot"></i> Generate with AI
                </button>

                <button
                  className={`mode-btn ${mode === "manual" ? "active" : ""}`}
                  onClick={() => setMode("manual")}
                >
                  <i className="fa-solid fa-pen-to-square"></i> Create Manually
                </button>
              </div>

              {/* AI MODE */}
              {mode === "ai" && (
                <div className="ai-plan-box text-center">
                  {/* <p className="text-muted mb-3">
                    Let AI create a balanced, week-by-week teaching plan.
                  </p>
                  <button className="btn btn-primary">
                    <i className="fa-solid fa-wand-magic-sparkles"></i> Generate
                    AI Plan
                  </button> */}
                  <p className="text-muted mb-3">AI features Coming Soon!!!</p>
                </div>
              )}

              {/* MANUAL MODE */}
              {mode === "manual" && isEditing && (
                <div className="manual-plan">
                  {weeks.map((week, wIndex) => (
                    <div key={week.id} className="week-container">
                      <div className="week-header">
                        <h5>Week {wIndex + 1}</h5>
                        <i
                          className="fa-solid fa-trash delete-week"
                          onClick={() => removeWeek(wIndex)}
                        ></i>
                      </div>

                      {week.topics.map((topic, tIndex) => (
                        <div key={topic.id} className="topic-container">
                          <div className="topic-top">
                            <div className="input-group">
                              <label>Topic Title</label>
                              <input
                                value={topic.title}
                                placeholder="Enter topic name"
                                onChange={(e) =>
                                  updateTopic(
                                    wIndex,
                                    tIndex,
                                    "title",
                                    e.target.value,
                                  )
                                }
                              />
                            </div>

                            <div className="input-group small">
                              <label>Classes</label>
                              <div className="classes-input-wrapper">
                                <input
                                  type="number"
                                  min="0"
                                  value={topic.classes}
                                  onChange={(e) =>
                                    updateTopic(
                                      wIndex,
                                      tIndex,
                                      "classes",
                                      Number(e.target.value),
                                    )
                                  }
                                />
                                <i
                                  className="fa-solid fa-trash topic-delete"
                                  onClick={() => removeTopic(wIndex, tIndex)}
                                ></i>
                              </div>
                            </div>
                          </div>

                          <div className="input-group">
                            <label>Learning Objectives</label>
                            <textarea
                              value={topic.objectives}
                              placeholder="Enter objective"
                              onChange={(e) =>
                                updateTopic(
                                  wIndex,
                                  tIndex,
                                  "objectives",
                                  e.target.value,
                                )
                              }
                            />
                          </div>
                        </div>
                      ))}

                      <button
                        className="btn btn-outline-secondary add-topic-btn"
                        onClick={() => addTopic(wIndex)}
                      >
                        <i className="fa-solid fa-plus"></i> Add Topic
                      </button>
                    </div>
                  ))}

                  <div className="manual-footer">
                    <button
                      className="btn btn-outline-secondary"
                      onClick={addWeek}
                    >
                      <i className="fa-solid fa-plus"></i> Add Week
                    </button>

                    <button className="btn btn-primary" onClick={savePlan}>
                      <i className="fa-solid fa-save"></i> Save Plan
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
      {showEditTopics && (
        <LectureTopicsModal
          data={lectureTopics}
          setData={setLectureTopics}
          onClose={() => setShowEditTopics(false)}
        />
      )}
    </div>
  );
};

export default Lectures;
