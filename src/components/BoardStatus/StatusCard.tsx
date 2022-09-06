import { FC } from 'react';
import "./boardStatus.scss";

interface Props {
  label: string;
  status: string;
}

const StatusCard: FC<Props> = ({ label, status }) => {
  return (
    <div className="status-card">
      <h2 className="status-label">{label}</h2>
      <h1 className="status-content">{status}</h1>
    </div>
  )
}

export default StatusCard;