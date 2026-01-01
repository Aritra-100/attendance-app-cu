import { useContext } from "react";
import AlertContext from "../../context/alert/AlertContext";
import "./Alert.css";

export default function Alert() {
  const { alert } = useContext(AlertContext);

  if (!alert) return null;

  return (
    <div className={`toast-alert toast-${alert.type}`}>
      <strong>{alert.use} </strong> {alert.msg}
    </div>
  );
}
