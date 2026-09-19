export default function TaskEditForm({
  formData,
  onChange,
  onCancel,
  onSubmit,
}) {
  return (
    <form className="task-edit-form" onSubmit={onSubmit}>
      {" "}
      <div className="task-edit-form__field">
        <label htmlFor="task-title">Title</label>

        <input
          id="task-title"
          name="title"
          type="text"
          value={formData.title}
          onChange={onChange}
        />
      </div>
      <div className="task-edit-form__field">
        <label htmlFor="task-description">Description</label>

        <textarea
          id="task-description"
          name="description"
          value={formData.description}
          onChange={onChange}
          rows="5"
        />
      </div>
      <div className="task-edit-form__field">
        <label htmlFor="task-priority">Priority</label>

        <select
          id="task-priority"
          name="priority"
          value={formData.priority}
          onChange={onChange}
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </div>
      <div className="task-edit-form__field">
        <label htmlFor="task-due-date">Due Date</label>

        <input
          id="task-due-date"
          name="dueDate"
          type="date"
          value={formData.dueDate}
          onChange={onChange}
        />
      </div>
      <div className="task-edit-form__field">
        <label htmlFor="task-estimated-hours">Estimated Hours</label>

        <input
          id="task-estimated-hours"
          name="estimatedHours"
          type="number"
          min="0"
          value={formData.estimatedHours}
          onChange={onChange}
        />
      </div>
      <div className="task-edit-form__field">
        <label htmlFor="task-completed">Status</label>

        <select
          id="task-completed"
          name="completed"
          value={String(formData.completed)}
          onChange={onChange}
        >
          <option value="false">In Progress</option>
          <option value="true">Completed</option>
        </select>
      </div>
      <div className="task-edit-form__actions">
        <button
          type="button"
          className="task-edit-form__cancel"
          onClick={onCancel}
        >
          Cancel
        </button>

        <button type="submit" className="task-edit-form__save">
          Save Changes
        </button>
      </div>
    </form>
  );
}
