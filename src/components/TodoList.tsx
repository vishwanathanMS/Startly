import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import './TodoList.css';

interface Todo {
    id: string;
    text: string;
    description?: string;
    completed: boolean;
    timeline?: string;
    notified?: boolean;
}

export default function TodoList() {
    const [todos, setTodos] = useState<Todo[]>([]);
    const [newTodo, setNewTodo] = useState('');
    const [description, setDescription] = useState('');
    const [timeline, setTimeline] = useState('');
    const [isExpanded, setIsExpanded] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        const savedTodos = localStorage.getItem('startly-todos');
        if (savedTodos) {
            setTodos(JSON.parse(savedTodos));
        }
        
        if ('Notification' in window && Notification.permission !== 'granted' && Notification.permission !== 'denied') {
            Notification.requestPermission();
        }
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            const now = new Date();
            let updated = false;
            
            const newTodos = todos.map(todo => {
                if (!todo.completed && todo.timeline && !todo.notified) {
                    const taskTime = new Date(todo.timeline);
                    const diffMs = taskTime.getTime() - now.getTime();
                    const diffMins = Math.floor(diffMs / 60000);
                    
                    if (diffMins <= 5 && diffMins >= 0) {
                        if ('Notification' in window && Notification.permission === 'granted') {
                            new Notification('Task Reminder', {
                                body: `Your task "${todo.text}" is due in ${diffMins} minutes.`,
                                icon: '/favicon.ico'
                            });
                        }
                        updated = true;
                        return { ...todo, notified: true };
                    }
                }
                return todo;
            });
            
            if (updated) {
                setTodos(newTodos);
                localStorage.setItem('startly-todos', JSON.stringify(newTodos));
            }
        }, 30000); // Check every 30 seconds
        
        return () => clearInterval(interval);
    }, [todos]);

    const saveTodos = (newTodos: Todo[]) => {
        setTodos(newTodos);
        localStorage.setItem('startly-todos', JSON.stringify(newTodos));
    };

    const addTodo = (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (!newTodo.trim()) {
            setError('Task header is required.');
            return;
        }

        if (!description.trim()) {
            setError('Task description is required.');
            return;
        }

        if (timeline) {
            const taskTime = new Date(timeline).getTime();
            const now = new Date().getTime();
            if (taskTime < now) {
                setError('Timeline cannot be in the past.');
                return;
            }
        }

        const todo: Todo = {
            id: Date.now().toString(),
            text: newTodo.trim(),
            description: description.trim(),
            completed: false,
            timeline: timeline || undefined,
        };
        saveTodos([...todos, todo]);
        setNewTodo('');
        setDescription('');
        setTimeline('');
        setIsModalOpen(false);
    };

    const openModal = () => {
        setIsModalOpen(true);
        setError('');
        setNewTodo('');
        setDescription('');
        setTimeline('');
    };

    const toggleTodo = (id: string) => {
        saveTodos(todos.map(todo =>
            todo.id === id ? { ...todo, completed: !todo.completed } : todo
        ));
    };

    const deleteTodo = (id: string) => {
        saveTodos(todos.filter(todo => todo.id !== id));
    };

    const activeTodos = todos.filter(t => !t.completed);
    const completedTodos = todos.filter(t => t.completed);

    return (
        <div className={`todo-widget glass ${isExpanded ? 'expanded' : ''}`}>
            <div className="todo-header" onClick={() => setIsExpanded(!isExpanded)}>
                <h3>
                    ✓ Quick Tasks
                    <span className="todo-count">{activeTodos.length}</span>
                </h3>
                <button className="expand-btn" aria-label={isExpanded ? 'Collapse' : 'Expand'}>
                    <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        style={{ transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.3s' }}
                    >
                        <polyline points="6 9 12 15 18 9" />
                    </svg>
                </button>
            </div>

            {isExpanded && (
                <div className="todo-content">
                    <div className="todo-actions">
                        <button onClick={openModal} className="open-modal-btn">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <line x1="12" y1="5" x2="12" y2="19" />
                                <line x1="5" y1="12" x2="19" y2="12" />
                            </svg>
                            Add New Task
                        </button>
                    </div>

                    <div className="todo-list">
                        {activeTodos.map((todo) => (
                            <div key={todo.id} className="todo-item">
                                <label className="todo-checkbox">
                                    <input
                                        type="checkbox"
                                        checked={todo.completed}
                                        onChange={() => toggleTodo(todo.id)}
                                    />
                                    <span className="checkmark"></span>
                                </label>
                                <div className="todo-text-container">
                                    <span className="todo-text">{todo.text}</span>
                                    {todo.description && (
                                        <span className="todo-description">{todo.description}</span>
                                    )}
                                    {todo.timeline && (
                                        <span className="todo-timeline-display">
                                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                <circle cx="12" cy="12" r="10" />
                                                <polyline points="12 6 12 12 16 14" />
                                            </svg>
                                            {new Date(todo.timeline).toLocaleString([], { dateStyle: 'short', timeStyle: 'short' })}
                                        </span>
                                    )}
                                </div>
                                <button
                                    className="delete-todo-btn"
                                    onClick={() => deleteTodo(todo.id)}
                                    aria-label="Delete task"
                                >
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <line x1="18" y1="6" x2="6" y2="18" />
                                        <line x1="6" y1="6" x2="18" y2="18" />
                                    </svg>
                                </button>
                            </div>
                        ))}

                        {completedTodos.length > 0 && (
                            <>
                                <div className="completed-divider">Completed</div>
                                {completedTodos.map((todo) => (
                                    <div key={todo.id} className="todo-item completed">
                                        <label className="todo-checkbox">
                                            <input
                                                type="checkbox"
                                                checked={todo.completed}
                                                onChange={() => toggleTodo(todo.id)}
                                            />
                                            <span className="checkmark"></span>
                                        </label>
                                        <div className="todo-text-container">
                                            <span className="todo-text">{todo.text}</span>
                                            {todo.description && (
                                                <span className="todo-description">{todo.description}</span>
                                            )}
                                            {todo.timeline && (
                                                <span className="todo-timeline-display">
                                                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                        <circle cx="12" cy="12" r="10" />
                                                        <polyline points="12 6 12 12 16 14" />
                                                    </svg>
                                                    {new Date(todo.timeline).toLocaleString([], { dateStyle: 'short', timeStyle: 'short' })}
                                                </span>
                                            )}
                                        </div>
                                        <button
                                            className="delete-todo-btn"
                                            onClick={() => deleteTodo(todo.id)}
                                            aria-label="Delete task"
                                        >
                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                <line x1="18" y1="6" x2="6" y2="18" />
                                                <line x1="6" y1="6" x2="18" y2="18" />
                                            </svg>
                                        </button>
                                    </div>
                                ))}
                            </>
                        )}

                        {todos.length === 0 && (
                            <div className="empty-state">
                                <span className="empty-icon">📝</span>
                                <p>No tasks yet. Add one to get started!</p>
                            </div>
                        )}
                    </div>
                </div>
            )}
            {isModalOpen && createPortal(
                <div className="todo-modal-overlay" onClick={(e) => e.target === e.currentTarget && setIsModalOpen(false)}>
                    <div className="todo-modal glass">
                        <div className="todo-modal-header">
                            <h4>Add New Task</h4>
                            <button onClick={() => setIsModalOpen(false)} className="close-modal-btn">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <line x1="18" y1="6" x2="6" y2="18" />
                                    <line x1="6" y1="6" x2="18" y2="18" />
                                </svg>
                            </button>
                        </div>
                        <form onSubmit={addTodo} className="todo-modal-form">
                            {error && <div className="todo-error">{error}</div>}
                            <div className="form-group">
                                <label>Task Header *</label>
                                <input
                                    type="text"
                                    value={newTodo}
                                    onChange={(e) => setNewTodo(e.target.value)}
                                    placeholder="Enter task header"
                                    className="todo-input"
                                />
                            </div>
                            <div className="form-group">
                                <label>Task Description *</label>
                                <textarea
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    placeholder="Enter task description"
                                    className="todo-input"
                                    rows={3}
                                />
                            </div>
                            <div className="form-group">
                                <label>Timeline</label>
                                <input
                                    type="datetime-local"
                                    value={timeline}
                                    onChange={(e) => setTimeline(e.target.value)}
                                    className="todo-input todo-timeline-input-modal"
                                />
                            </div>
                            <button type="submit" className="submit-task-btn">
                                Add Task
                            </button>
                        </form>
                    </div>
                </div>,
                document.body
            )}
        </div>
    );
}
