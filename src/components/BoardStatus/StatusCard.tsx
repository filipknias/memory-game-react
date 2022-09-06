import { FC } from 'react';
import "./boardStatus.scss";

interface Props {
  label: string;
  status: string;
  active: boolean;
}

const StatusCard: FC<Props> = ({ label, status, active }) => {
  return (
    <div className={`status-card ${active ? 'status-card-active' : ''}`}>
      <h2 className="status-label">{label}</h2>
      <h1 className="status-content">{status}</h1>
    </div>
  )
}

export default StatusCard;