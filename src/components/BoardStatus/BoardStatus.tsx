import { FC, ReactNode } from 'react';
import "./boardStatus.scss";

interface Props {
  children: ReactNode;
}

const BoardStatus: FC<Props> = ({ children }) => {
  return (
    <div className="board-status-container">
      {children}
    </div>
  )
}

export default BoardStatus;