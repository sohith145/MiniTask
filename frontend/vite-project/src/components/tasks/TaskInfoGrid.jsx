export default function TaskInfoGrid({ task }) {
  return (
    <div className="task-details-info">
      <div className="task-details-info__item">
        <span>Priority</span>
        <strong>{task.priority}</strong>
      </div>

      <div className="task-details-info__item">
        <span>Due Date</span>
        <strong>
          {task?.dueDate
            ? new Date(task.dueDate).toLocaleDateString()
            : "No due date"}
        </strong>
      </div>

      <div className="task-details-info__item">
        <span>Estimated Time</span>
        <strong>
          {task?.dueDate
            ? new Date(task.dueDate).toLocaleDateString()
            : "No due date"}
        </strong>
      </div>

      <div className="task-details-info__item">
        <span>Created</span>
        <strong>
          {task?.createdAt
            ? new Date(task.createdAt).toLocaleDateString()
            : "Unknown"}
        </strong>
      </div>

      <div className="task-details-info__item">
        <span>Last Updated</span>
        <strong>
          {task?.updatedAt
            ? new Date(task.updatedAt).toLocaleDateString()
            : "Unknown"}
        </strong>
      </div>

      <div className="task-details-info__item">
        <span>Status</span>
        <strong>
          {task?.updatedAt
            ? new Date(task.updatedAt).toLocaleDateString()
            : "Unknown"}
        </strong>
      </div>
    </div>
  );
}
