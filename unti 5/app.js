/**
 * TaskFlow - Clean & Modern To-Do List Application
 * Features: Home, Daily, Weekly, Important, Live Calendar, Dashboard
 * LocalStorage persistence, Responsive UI
 */

// ==========================================
// STATE & STORAGE MANAGEMENT
// ==========================================
const STORAGE_KEY = 'taskflow_tasks_v1';

let state = {
  tasks: [],
  currentPage: 'home',
  currentWeekStart: getMonday(new Date()), // Date object representing the Monday of viewed week
  calendarViewDate: new Date(), // Date object for calendar month/year
  selectedCalendarDateStr: formatDateToISO(new Date()), // YYYY-MM-DD
  searchQuery: '',
  importantFilter: 'pending',
  taskToDeleteId: null
};

// ==========================================
// UTILITY HELPERS
// ==========================================
function formatDateToISO(date) {
  const d = new Date(date);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function getTodayISO() {
  return formatDateToISO(new Date());
}

function getMonday(d) {
  const date = new Date(d);
  const day = date.getDay();
  const diff = date.getDate() - day + (day === 0 ? -6 : 1); // adjust when day is sunday
  const monday = new Date(date.setDate(diff));
  monday.setHours(0, 0, 0, 0);
  return monday;
}

function addDays(date, days) {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

function formatDisplayDate(dateStr) {
  if (!dateStr) return '';
  const [y, m, d] = dateStr.split('-').map(Number);
  const date = new Date(y, m - 1, d);
  const todayStr = getTodayISO();
  
  if (dateStr === todayStr) return 'Today';
  
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  if (dateStr === formatDateToISO(tomorrow)) return 'Tomorrow';

  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  if (dateStr === formatDateToISO(yesterday)) return 'Yesterday';

  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

function formatFullDate(date) {
  return date.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });
}

function generateId() {
  return 'task_' + Date.now() + '_' + Math.random().toString(36).substr(2, 6);
}

// Initial Starter Sample Data
const DEFAULT_TASKS = [
  {
    id: 'sample-1',
    title: 'Morning Yoga & Meditation',
    description: '15-minute stretching routine and breathing exercise',
    dueDate: getTodayISO(),
    priority: 'normal',
    isImportant: false,
    isDaily: true,
    completed: true,
    completedAt: new Date().toISOString(),
    createdAt: new Date().toISOString()
  },
  {
    id: 'sample-2',
    title: 'Review Project Deliverables & Roadmap',
    description: 'Check team milestones and client feedback',
    dueDate: getTodayISO(),
    priority: 'high',
    isImportant: true,
    isDaily: false,
    completed: false,
    completedAt: null,
    createdAt: new Date().toISOString()
  },
  {
    id: 'sample-3',
    title: 'Design user interface wireframes',
    description: 'Finalize responsive navigation layout and components',
    dueDate: getTodayISO(),
    priority: 'normal',
    isImportant: true,
    isDaily: false,
    completed: false,
    completedAt: null,
    createdAt: new Date().toISOString()
  },
  {
    id: 'sample-4',
    title: 'Drink 2.5 Liters of Water',
    description: 'Daily health & hydration habit tracker',
    dueDate: getTodayISO(),
    priority: 'low',
    isImportant: false,
    isDaily: true,
    completed: false,
    completedAt: null,
    createdAt: new Date().toISOString()
  },
  {
    id: 'sample-5',
    title: 'Weekly Team Sync & Strategy Meeting',
    description: 'Review weekly OKRs and blockers',
    dueDate: formatDateToISO(addDays(new Date(), 2)),
    priority: 'high',
    isImportant: true,
    isDaily: false,
    completed: false,
    completedAt: null,
    createdAt: new Date().toISOString()
  },
  {
    id: 'sample-6',
    title: 'Submit Expense & Invoice Reports',
    description: 'Compile monthly SaaS subscriptions receipts',
    dueDate: formatDateToISO(addDays(new Date(), 4)),
    priority: 'normal',
    isImportant: false,
    isDaily: false,
    completed: false,
    completedAt: null,
    createdAt: new Date().toISOString()
  }
];

function loadTasks() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved) {
    try {
      state.tasks = JSON.parse(saved);
    } catch (e) {
      console.error('Error loading tasks:', e);
      state.tasks = DEFAULT_TASKS;
    }
  } else {
    state.tasks = DEFAULT_TASKS;
    saveTasks();
  }
}

function saveTasks() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state.tasks));
  renderApp();
}

// ==========================================
// TOAST NOTIFICATIONS
// ==========================================
function showToast(message, type = 'default') {
  const container = document.getElementById('toastContainer');
  const toast = document.createElement('div');
  toast.className = 'toast';
  
  let iconHtml = `
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#10b981" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
      <polyline points="20 6 9 17 4 12"></polyline>
    </svg>
  `;
  if (type === 'delete') {
    iconHtml = `
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#ef4444" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <path d="M3 6h18"></path><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
      </svg>
    `;
  } else if (type === 'star') {
    iconHtml = `
      <svg width="18" height="18" viewBox="0 0 24 24" fill="#f59e0b" stroke="#f59e0b" stroke-width="2">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
      </svg>
    `;
  }

  toast.innerHTML = `${iconHtml} <span>${escapeHtml(message)}</span>`;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 2600);
}

function escapeHtml(text) {
  if (!text) return '';
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

// ==========================================
// CORE TASK OPERATIONS (CRUD)
// ==========================================
function addTask(taskData) {
  const newTask = {
    id: generateId(),
    title: taskData.title.trim(),
    description: (taskData.description || '').trim(),
    dueDate: taskData.dueDate || getTodayISO(),
    priority: taskData.priority || 'normal',
    isImportant: !!taskData.isImportant,
    isDaily: !!taskData.isDaily,
    completed: false,
    completedAt: null,
    createdAt: new Date().toISOString()
  };

  state.tasks.unshift(newTask);
  saveTasks();
  showToast('Task added successfully!');
}

function updateTask(id, taskData) {
  const idx = state.tasks.findIndex(t => t.id === id);
  if (idx !== -1) {
    state.tasks[idx] = {
      ...state.tasks[idx],
      title: taskData.title.trim(),
      description: (taskData.description || '').trim(),
      dueDate: taskData.dueDate || getTodayISO(),
      priority: taskData.priority || 'normal',
      isImportant: !!taskData.isImportant,
      isDaily: !!taskData.isDaily
    };
    saveTasks();
    showToast('Task updated successfully!');
  }
}

function toggleTaskComplete(id) {
  const task = state.tasks.find(t => t.id === id);
  if (task) {
    task.completed = !task.completed;
    task.completedAt = task.completed ? new Date().toISOString() : null;
    saveTasks();
    showToast(task.completed ? 'Task marked as completed!' : 'Task marked as pending.');
  }
}

function toggleTaskImportant(id) {
  const task = state.tasks.find(t => t.id === id);
  if (task) {
    task.isImportant = !task.isImportant;
    saveTasks();
    showToast(task.isImportant ? 'Marked as Important!' : 'Removed from Important.', 'star');
  }
}

function promptDeleteTask(id) {
  state.taskToDeleteId = id;
  const modal = document.getElementById('deleteConfirmModal');
  modal.classList.add('active');
}

function confirmDeleteTask() {
  if (state.taskToDeleteId) {
    state.tasks = state.tasks.filter(t => t.id !== state.taskToDeleteId);
    state.taskToDeleteId = null;
    document.getElementById('deleteConfirmModal').classList.remove('active');
    saveTasks();
    showToast('Task deleted.', 'delete');
  }
}

function clearCompletedTasks() {
  const completedCount = state.tasks.filter(t => t.completed).length;
  if (completedCount === 0) {
    showToast('No completed tasks to clear.');
    return;
  }
  state.tasks = state.tasks.filter(t => !t.completed);
  saveTasks();
  showToast(`Cleared ${completedCount} completed tasks.`, 'delete');
}

// ==========================================
// MODAL CONTROLS (ADD & EDIT)
// ==========================================
function openTaskModal(editTaskId = null, defaultDate = null, defaultIsDaily = false) {
  const modal = document.getElementById('taskModal');
  const titleEl = document.getElementById('modalTitle');
  const form = document.getElementById('taskForm');
  
  form.reset();
  
  if (editTaskId) {
    const task = state.tasks.find(t => t.id === editTaskId);
    if (!task) return;
    titleEl.textContent = 'Edit Task';
    document.getElementById('formTaskId').value = task.id;
    document.getElementById('formTaskTitle').value = task.title;
    document.getElementById('formTaskDesc').value = task.description || '';
    document.getElementById('formTaskDate').value = task.dueDate || getTodayISO();
    document.getElementById('formTaskPriority').value = task.priority || 'normal';
    document.getElementById('formTaskImportant').checked = !!task.isImportant;
    document.getElementById('formTaskDaily').checked = !!task.isDaily;
  } else {
    titleEl.textContent = 'Create New Task';
    document.getElementById('formTaskId').value = '';
    document.getElementById('formTaskDate').value = defaultDate || getTodayISO();
    document.getElementById('formTaskPriority').value = 'normal';
    document.getElementById('formTaskImportant').checked = false;
    document.getElementById('formTaskDaily').checked = defaultIsDaily;
  }

  modal.classList.add('active');
  document.getElementById('formTaskTitle').focus();
}

function closeTaskModal() {
  document.getElementById('taskModal').classList.remove('active');
}

// ==========================================
// RENDER HELPERS & TEMPLATES
// ==========================================
function renderTaskItem(task) {
  const todayStr = getTodayISO();
  const isOverdue = !task.completed && task.dueDate && task.dueDate < todayStr;
  const isToday = task.dueDate === todayStr;

  let dateTagClass = 'tag-date';
  if (isOverdue) dateTagClass += ' overdue';
  else if (isToday) dateTagClass += ' today';

  let dateDisplay = formatDisplayDate(task.dueDate);
  if (task.isDaily) {
    dateDisplay = 'Daily';
  } else if (isOverdue) {
    dateDisplay += ' (Overdue)';
  }

  return `
    <div class="task-item ${task.completed ? 'is-completed' : ''} ${task.isImportant ? 'is-important' : ''}" data-id="${task.id}">
      <div class="task-check-wrapper">
        <input type="checkbox" class="custom-checkbox task-checkbox" ${task.completed ? 'checked' : ''} title="${task.completed ? 'Mark as pending' : 'Mark as completed'}" />
      </div>

      <div class="task-body">
        <div class="task-title">${escapeHtml(task.title)}</div>
        ${task.description ? `<div class="task-desc">${escapeHtml(task.description)}</div>` : ''}
        
        <div class="task-tags">
          <span class="tag ${dateTagClass}">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
            ${dateDisplay}
          </span>
          
          ${task.isDaily ? `
            <span class="tag tag-habit">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21.5 2v6h-6M2.5 22v-6h6M2 11.5a10 10 0 0 1 18.8-4.3M22 12.5a10 10 0 0 1-18.8 4.2"/></svg>
              Daily Habit
            </span>
          ` : ''}

          ${task.priority === 'high' ? `<span class="tag tag-priority-high">High Priority</span>` : ''}
          ${task.priority === 'low' ? `<span class="tag tag-priority-low">Low Priority</span>` : ''}
        </div>
      </div>

      <div class="task-actions">
        <button class="action-btn star-btn ${task.isImportant ? 'active' : ''}" data-action="star" title="${task.isImportant ? 'Remove from Important' : 'Mark as Important'}">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
        </button>
        <button class="action-btn edit-btn" data-action="edit" title="Edit Task">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
        </button>
        <button class="action-btn delete-btn" data-action="delete" title="Delete Task">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 6h18"></path><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
        </button>
      </div>
    </div>
  `;
}

function renderEmptyState(title, desc) {
  return `
    <div class="empty-state">
      <div class="empty-icon">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="8" y1="12" x2="16" y2="12"></line></svg>
      </div>
      <div class="empty-title">${title}</div>
      <div class="empty-desc">${desc}</div>
    </div>
  `;
}

// ==========================================
// PAGE RENDERERS
// ==========================================

// 1. HOME VIEW
function renderHomePage(filteredTasks) {
  const total = state.tasks.length;
  const completed = state.tasks.filter(t => t.completed).length;
  const pending = total - completed;

  document.getElementById('homeTotalTasks').textContent = total;
  document.getElementById('homeCompletedTasks').textContent = completed;
  document.getElementById('homePendingTasks').textContent = pending;

  // Upcoming Tasks (Pending tasks, sorted by date)
  const upcoming = filteredTasks
    .filter(t => !t.completed)
    .sort((a, b) => (a.dueDate || '').localeCompare(b.dueDate || ''));

  const upcomingListEl = document.getElementById('homeUpcomingList');
  document.getElementById('homeUpcomingCount').textContent = upcoming.length;
  
  if (upcoming.length === 0) {
    upcomingListEl.innerHTML = renderEmptyState('No upcoming tasks', 'All caught up! Create a new task above.');
  } else {
    upcomingListEl.innerHTML = upcoming.map(renderTaskItem).join('');
  }

  // Recently Completed (completed tasks, most recent first)
  const completedList = filteredTasks
    .filter(t => t.completed)
    .sort((a, b) => (b.completedAt || '').localeCompare(a.completedAt || ''));

  const completedListEl = document.getElementById('homeCompletedList');
  document.getElementById('homeCompletedCount').textContent = completedList.length;

  if (completedList.length === 0) {
    completedListEl.innerHTML = renderEmptyState('No completed tasks yet', 'Check off items as you finish them.');
  } else {
    completedListEl.innerHTML = completedList.map(renderTaskItem).join('');
  }
}

// 2. DAILY VIEW
function renderDailyPage(filteredTasks) {
  const todayStr = getTodayISO();

  // Habits (isDaily: true)
  const habits = filteredTasks.filter(t => t.isDaily);
  const habitsListEl = document.getElementById('dailyHabitsList');
  if (habits.length === 0) {
    habitsListEl.innerHTML = renderEmptyState('No daily habits configured', 'Add repeating habits like exercise, reading, or drinking water.');
  } else {
    habitsListEl.innerHTML = habits.map(renderTaskItem).join('');
  }

  // Today specific tasks (dueDate === today and not daily habit)
  const todayTasks = filteredTasks.filter(t => t.dueDate === todayStr && !t.isDaily);

  const pendingToday = todayTasks.filter(t => !t.completed);
  const completedToday = todayTasks.filter(t => t.completed);

  const pendingListEl = document.getElementById('dailyPendingList');
  const completedListEl = document.getElementById('dailyCompletedList');

  document.getElementById('dailyPendingCount').textContent = pendingToday.length;
  document.getElementById('dailyCompletedCount').textContent = completedToday.length;

  if (pendingToday.length === 0) {
    pendingListEl.innerHTML = renderEmptyState('No pending tasks for today', 'You have no outstanding tasks for today.');
  } else {
    pendingListEl.innerHTML = pendingToday.map(renderTaskItem).join('');
  }

  if (completedToday.length === 0) {
    completedListEl.innerHTML = renderEmptyState('No completed tasks yet', 'Complete today\'s tasks to see them listed here.');
  } else {
    completedListEl.innerHTML = completedToday.map(renderTaskItem).join('');
  }
}

// 3. WEEKLY VIEW
function renderWeeklyPage(filteredTasks) {
  const monday = new Date(state.currentWeekStart);
  const sunday = addDays(monday, 6);

  const options = { month: 'short', day: 'numeric', year: 'numeric' };
  document.getElementById('weekRangeDisplay').textContent = `${monday.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - ${sunday.toLocaleDateString('en-US', options)}`;

  const todayMonday = getMonday(new Date());
  const isCurrentWeek = monday.getTime() === todayMonday.getTime();
  const weekIndicator = document.getElementById('currentWeekIndicator');
  if (isCurrentWeek) {
    weekIndicator.style.display = 'inline-block';
    weekIndicator.textContent = 'Current Week';
  } else {
    weekIndicator.style.display = 'none';
  }

  const dayNames = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const gridEl = document.getElementById('weeklyGrid');
  gridEl.innerHTML = '';

  const todayStr = getTodayISO();

  for (let i = 0; i < 7; i++) {
    const dayDate = addDays(monday, i);
    const dayIso = formatDateToISO(dayDate);
    const isTodayCol = dayIso === todayStr;

    const dayTasks = filteredTasks.filter(t => t.dueDate === dayIso || t.isDaily);

    const colEl = document.createElement('div');
    colEl.className = `day-column ${isTodayCol ? 'is-today-col' : ''}`;

    let tasksHtml = '';
    if (dayTasks.length === 0) {
      tasksHtml = `<div style="text-align:center; padding: 24px 8px; color: var(--text-muted); font-size: 0.78rem;">No tasks</div>`;
    } else {
      tasksHtml = dayTasks.map(t => `
        <div class="micro-task ${t.completed ? 'is-completed' : ''}" data-id="${t.id}">
          <div class="micro-task-top">
            <input type="checkbox" class="custom-checkbox task-checkbox" ${t.completed ? 'checked' : ''} style="width:16px;height:16px;" />
            <span class="micro-task-title">${escapeHtml(t.title)}</span>
            <div class="micro-task-actions">
              <button class="action-btn star-btn ${t.isImportant ? 'active' : ''}" data-action="star" style="width:20px;height:20px;">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
              </button>
            </div>
          </div>
          ${t.priority === 'high' ? `<span class="tag tag-priority-high" style="font-size: 0.68rem; align-self: flex-start;">High</span>` : ''}
        </div>
      `).join('');
    }

    colEl.innerHTML = `
      <div class="day-col-header">
        <div class="day-name">${dayNames[i]}</div>
        <div class="day-number">${dayDate.getDate()}</div>
      </div>
      <div class="day-col-tasks">
        ${tasksHtml}
      </div>
      <button class="day-add-btn" data-date="${dayIso}">+ Add Task</button>
    `;

    gridEl.appendChild(colEl);
  }
}

// 4. IMPORTANT VIEW
function renderImportantPage(filteredTasks) {
  let importantTasks = filteredTasks.filter(t => t.isImportant);

  if (state.importantFilter === 'pending') {
    importantTasks = importantTasks.filter(t => !t.completed);
  } else if (state.importantFilter === 'completed') {
    importantTasks = importantTasks.filter(t => t.completed);
  }

  document.getElementById('importantTotalCount').textContent = importantTasks.length;
  const listEl = document.getElementById('importantTasksList');

  if (importantTasks.length === 0) {
    listEl.innerHTML = renderEmptyState('No important tasks found', 'Star any high-priority tasks to have them appear here.');
  } else {
    listEl.innerHTML = importantTasks.map(renderTaskItem).join('');
  }
}

// 5. LIVE CALENDAR VIEW
function renderCalendarPage(filteredTasks) {
  const viewDate = state.calendarViewDate;
  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  document.getElementById('calendarMonthYear').textContent = `${monthNames[month]} ${year}`;

  const firstDayIndex = new Date(year, month, 1).getDay(); // 0 = Sunday
  const lastDate = new Date(year, month + 1, 0).getDate();
  const prevMonthLastDate = new Date(year, month, 0).getDate();

  const gridEl = document.getElementById('calendarDaysGrid');
  gridEl.innerHTML = '';

  const todayStr = getTodayISO();

  // Previous month trailing days
  for (let x = firstDayIndex; x > 0; x--) {
    const dayNum = prevMonthLastDate - x + 1;
    const prevDate = new Date(year, month - 1, dayNum);
    const iso = formatDateToISO(prevDate);
    gridEl.appendChild(createCalendarCell(dayNum, iso, true, filteredTasks));
  }

  // Current month days
  for (let i = 1; i <= lastDate; i++) {
    const currDate = new Date(year, month, i);
    const iso = formatDateToISO(currDate);
    gridEl.appendChild(createCalendarCell(i, iso, false, filteredTasks));
  }

  // Next month leading days to complete grid (up to 35 or 42 cells)
  const totalCells = firstDayIndex + lastDate;
  const nextDays = (Math.ceil(totalCells / 7) * 7) - totalCells;
  for (let j = 1; j <= nextDays; j++) {
    const nextDate = new Date(year, month + 1, j);
    const iso = formatDateToISO(nextDate);
    gridEl.appendChild(createCalendarCell(j, iso, true, filteredTasks));
  }

  renderCalendarSelectedDateTasks(filteredTasks);
}

function createCalendarCell(dayNum, iso, isOtherMonth, filteredTasks) {
  const cell = document.createElement('div');
  cell.className = `cal-day-cell ${isOtherMonth ? 'other-month' : ''}`;
  
  const todayStr = getTodayISO();
  if (iso === todayStr) cell.classList.add('is-today');
  if (iso === state.selectedCalendarDateStr) cell.classList.add('is-selected');

  cell.dataset.date = iso;

  // Check tasks scheduled for this date or daily
  const tasksForDay = state.tasks.filter(t => t.dueDate === iso || t.isDaily);
  const hasImportant = tasksForDay.some(t => t.isImportant && !t.completed);

  let dotsHtml = '';
  if (tasksForDay.length > 0) {
    const count = Math.min(tasksForDay.length, 3);
    dotsHtml = `<div class="cal-task-dots">`;
    for (let d = 0; d < count; d++) {
      dotsHtml += `<span class="cal-dot ${hasImportant ? 'has-important' : ''}"></span>`;
    }
    dotsHtml += `</div>`;
  }

  cell.innerHTML = `
    <span class="cal-day-number">${dayNum}</span>
    ${dotsHtml}
  `;

  return cell;
}

function renderCalendarSelectedDateTasks(filteredTasks) {
  const selIso = state.selectedCalendarDateStr;
  const [y, m, d] = selIso.split('-').map(Number);
  const selDate = new Date(y, m - 1, d);

  document.getElementById('calSelectedDateTitle').textContent = formatFullDate(selDate);

  const dateTasks = filteredTasks.filter(t => t.dueDate === selIso || t.isDaily);
  const total = dateTasks.length;
  const completed = dateTasks.filter(t => t.completed).length;
  const pending = total - completed;

  document.getElementById('calDateTotal').textContent = total;
  document.getElementById('calDatePending').textContent = pending;
  document.getElementById('calDateCompleted').textContent = completed;

  const listEl = document.getElementById('calendarDateTasksList');
  if (dateTasks.length === 0) {
    listEl.innerHTML = renderEmptyState('No tasks for this date', 'Click "+ Add Task" to schedule something for this day.');
  } else {
    listEl.innerHTML = dateTasks.map(renderTaskItem).join('');
  }
}

// 6. DASHBOARD VIEW
function renderDashboardPage() {
  const total = state.tasks.length;
  const completed = state.tasks.filter(t => t.completed).length;
  const pending = total - completed;
  const important = state.tasks.filter(t => t.isImportant).length;

  const todayStr = getTodayISO();
  const todayTasks = state.tasks.filter(t => t.dueDate === todayStr || t.isDaily).length;

  // Current week tasks count
  const monday = getMonday(new Date());
  const sunday = addDays(monday, 6);
  const monStr = formatDateToISO(monday);
  const sunStr = formatDateToISO(sunday);
  const weekTasks = state.tasks.filter(t => (t.dueDate >= monStr && t.dueDate <= sunStr) || t.isDaily).length;

  // 6 Metric Cards
  document.getElementById('dashTotalTasks').textContent = total;
  document.getElementById('dashCompletedTasks').textContent = completed;
  document.getElementById('dashPendingTasks').textContent = pending;
  document.getElementById('dashImportantTasks').textContent = important;
  document.getElementById('dashTodayTasks').textContent = todayTasks;
  document.getElementById('dashWeekTasks').textContent = weekTasks;

  // Progress Circle Calculation
  const percent = total > 0 ? Math.round((completed / total) * 100) : 0;
  document.getElementById('dashProgressText').textContent = `${percent}%`;
  
  const ringEl = document.getElementById('dashProgressRing');
  const deg = (percent / 100) * 360;
  ringEl.style.background = `conic-gradient(var(--primary) ${deg}deg, #e2e8f0 ${deg}deg)`;

  document.getElementById('dashLegendCompleted').textContent = completed;
  document.getElementById('dashLegendPending').textContent = pending;
  document.getElementById('dashLegendImportant').textContent = important;

  // Breakdown bars
  const habitsCount = state.tasks.filter(t => t.isDaily).length;
  const highPriorityCount = state.tasks.filter(t => t.priority === 'high').length;

  document.getElementById('dashHabitsCount').textContent = `${habitsCount} tasks`;
  document.getElementById('dashHighPriorityCount').textContent = `${highPriorityCount} tasks`;
  document.getElementById('dashWeekScheduleCount').textContent = `${weekTasks} tasks`;

  const habitsPct = total > 0 ? (habitsCount / total) * 100 : 0;
  const highPct = total > 0 ? (highPriorityCount / total) * 100 : 0;
  const weekPct = total > 0 ? (weekTasks / total) * 100 : 0;

  document.getElementById('dashHabitsBar').style.width = `${habitsPct}%`;
  document.getElementById('dashHighPriorityBar').style.width = `${highPct}%`;
  document.getElementById('dashWeekBar').style.width = `${weekPct}%`;
}

// ==========================================
// MASTER RENDER DISPATCHER
// ==========================================
function renderApp() {
  // Filter by query if user typed in search bar
  let filteredTasks = [...state.tasks];
  if (state.searchQuery.trim()) {
    const q = state.searchQuery.toLowerCase();
    filteredTasks = filteredTasks.filter(t =>
      t.title.toLowerCase().includes(q) ||
      (t.description && t.description.toLowerCase().includes(q))
    );
  }

  // Update Global Header Title & Date
  const titles = {
    home: 'Home Overview',
    daily: 'Daily Routine & Tasks',
    weekly: 'Weekly Schedule',
    important: 'High-Priority Tasks',
    calendar: 'Live Calendar',
    dashboard: 'Task Analytics Dashboard'
  };
  document.getElementById('currentPageTitle').textContent = titles[state.currentPage] || 'To-Do List';
  document.getElementById('currentDateDisplay').textContent = formatFullDate(new Date());

  // Update Sidebar Badges
  const pendingCount = state.tasks.filter(t => !t.completed).length;
  const todayStr = getTodayISO();
  const dailyCount = state.tasks.filter(t => !t.completed && (t.dueDate === todayStr || t.isDaily)).length;
  
  const monday = getMonday(new Date());
  const sunday = addDays(monday, 6);
  const monStr = formatDateToISO(monday);
  const sunStr = formatDateToISO(sunday);
  const weeklyCount = state.tasks.filter(t => !t.completed && ((t.dueDate >= monStr && t.dueDate <= sunStr) || t.isDaily)).length;
  
  const importantCount = state.tasks.filter(t => !t.completed && t.isImportant).length;

  document.getElementById('badge-home').textContent = pendingCount;
  document.getElementById('badge-daily').textContent = dailyCount;
  document.getElementById('badge-weekly').textContent = weeklyCount;
  document.getElementById('badge-important').textContent = importantCount;

  // Update Sidebar Overall Progress Pill
  const total = state.tasks.length;
  const completed = state.tasks.filter(t => t.completed).length;
  const overallPct = total > 0 ? Math.round((completed / total) * 100) : 0;
  document.getElementById('sidebarProgressPercent').textContent = `${overallPct}%`;
  document.getElementById('sidebarProgressBar').style.width = `${overallPct}%`;

  // Render Current Page
  if (state.currentPage === 'home') renderHomePage(filteredTasks);
  else if (state.currentPage === 'daily') renderDailyPage(filteredTasks);
  else if (state.currentPage === 'weekly') renderWeeklyPage(filteredTasks);
  else if (state.currentPage === 'important') renderImportantPage(filteredTasks);
  else if (state.currentPage === 'calendar') renderCalendarPage(filteredTasks);
  else if (state.currentPage === 'dashboard') renderDashboardPage();
}

function navigateTo(pageId) {
  state.currentPage = pageId;
  
  // Update sidebar active classes
  document.querySelectorAll('.nav-item').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.page === pageId);
  });

  // Switch visible page view
  document.querySelectorAll('.page-view').forEach(view => {
    view.classList.remove('active');
  });

  const activeView = document.getElementById(`view-${pageId}`);
  if (activeView) activeView.classList.add('active');

  // Close mobile sidebar if open
  closeMobileSidebar();

  renderApp();
}

function openMobileSidebar() {
  document.getElementById('sidebar').classList.add('open');
  document.getElementById('sidebarBackdrop').classList.add('open');
}

function closeMobileSidebar() {
  document.getElementById('sidebar').classList.remove('open');
  document.getElementById('sidebarBackdrop').classList.remove('open');
}

// ==========================================
// EVENT LISTENERS INITIALIZATION
// ==========================================
function setupEventListeners() {
  // Navigation Menu Click
  document.querySelectorAll('.nav-item').forEach(item => {
    item.addEventListener('click', () => {
      const page = item.dataset.page;
      navigateTo(page);
    });
  });

  // Mobile menu buttons
  document.getElementById('openSidebarBtn').addEventListener('click', openMobileSidebar);
  document.getElementById('closeSidebarBtn').addEventListener('click', closeMobileSidebar);
  document.getElementById('sidebarBackdrop').addEventListener('click', closeMobileSidebar);

  // Global "Add Task" buttons
  document.getElementById('sidebarQuickAddBtn').addEventListener('click', () => openTaskModal());
  document.getElementById('headerAddTaskBtn').addEventListener('click', () => openTaskModal());
  
  // Home Inline Quick Add
  const quickInput = document.getElementById('quickTaskInput');
  const quickDate = document.getElementById('quickTaskDate');
  quickDate.value = getTodayISO();

  const handleQuickAdd = () => {
    const title = quickInput.value.trim();
    if (!title) return;
    addTask({
      title,
      dueDate: quickDate.value || getTodayISO(),
      priority: 'normal'
    });
    quickInput.value = '';
  };

  document.getElementById('quickTaskAddBtn').addEventListener('click', handleQuickAdd);
  quickInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') handleQuickAdd();
  });

  document.getElementById('viewAllUpcomingBtn').addEventListener('click', () => navigateTo('calendar'));
  document.getElementById('clearCompletedBtn').addEventListener('click', clearCompletedTasks);

  // Daily View Buttons
  document.getElementById('addTodayTaskBtn').addEventListener('click', () => openTaskModal(null, getTodayISO(), false));
  document.getElementById('addHabitBtn').addEventListener('click', () => openTaskModal(null, getTodayISO(), true));

  // Weekly Navigation
  document.getElementById('prevWeekBtn').addEventListener('click', () => {
    state.currentWeekStart = addDays(state.currentWeekStart, -7);
    renderApp();
  });
  document.getElementById('nextWeekBtn').addEventListener('click', () => {
    state.currentWeekStart = addDays(state.currentWeekStart, 7);
    renderApp();
  });
  document.getElementById('thisWeekBtn').addEventListener('click', () => {
    state.currentWeekStart = getMonday(new Date());
    renderApp();
  });

  // Weekly Grid Add Task to Specific Day
  document.getElementById('weeklyGrid').addEventListener('click', (e) => {
    const addBtn = e.target.closest('.day-add-btn');
    if (addBtn) {
      const date = addBtn.dataset.date;
      openTaskModal(null, date, false);
    }
  });

  // Important View Filter
  document.getElementById('importantFilterStatus').addEventListener('change', (e) => {
    state.importantFilter = e.target.value;
    renderApp();
  });

  // Calendar Navigation
  document.getElementById('calPrevMonthBtn').addEventListener('click', () => {
    state.calendarViewDate = new Date(state.calendarViewDate.getFullYear(), state.calendarViewDate.getMonth() - 1, 1);
    renderApp();
  });
  document.getElementById('calNextMonthBtn').addEventListener('click', () => {
    state.calendarViewDate = new Date(state.calendarViewDate.getFullYear(), state.calendarViewDate.getMonth() + 1, 1);
    renderApp();
  });
  document.getElementById('calTodayBtn').addEventListener('click', () => {
    state.calendarViewDate = new Date();
    state.selectedCalendarDateStr = getTodayISO();
    renderApp();
  });

  // Calendar Day Selection
  document.getElementById('calendarDaysGrid').addEventListener('click', (e) => {
    const cell = e.target.closest('.cal-day-cell');
    if (cell && cell.dataset.date) {
      state.selectedCalendarDateStr = cell.dataset.date;
      renderApp();
    }
  });

  // Calendar Add Task for selected date
  document.getElementById('calAddForDateBtn').addEventListener('click', () => {
    openTaskModal(null, state.selectedCalendarDateStr, false);
  });

  // Dashboard Shortcuts
  document.getElementById('dashGoDailyBtn').addEventListener('click', () => navigateTo('daily'));
  document.getElementById('dashGoCalendarBtn').addEventListener('click', () => navigateTo('calendar'));

  // Global Delegated Task Action Handlers (Check, Star, Edit, Delete)
  document.addEventListener('click', (e) => {
    // Checkbox toggle
    if (e.target.classList.contains('task-checkbox')) {
      const taskItem = e.target.closest('.task-item') || e.target.closest('.micro-task');
      if (taskItem) {
        const id = taskItem.dataset.id;
        toggleTaskComplete(id);
      }
      return;
    }

    // Action button clicks
    const actionBtn = e.target.closest('.action-btn');
    if (actionBtn) {
      const taskItem = actionBtn.closest('.task-item') || actionBtn.closest('.micro-task');
      if (!taskItem) return;
      const id = taskItem.dataset.id;
      const action = actionBtn.dataset.action;

      if (action === 'star') {
        toggleTaskImportant(id);
      } else if (action === 'edit') {
        openTaskModal(id);
      } else if (action === 'delete') {
        promptDeleteTask(id);
      }
    }
  });

  // Modal Form Submit
  document.getElementById('taskForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const id = document.getElementById('formTaskId').value;
    const taskData = {
      title: document.getElementById('formTaskTitle').value,
      description: document.getElementById('formTaskDesc').value,
      dueDate: document.getElementById('formTaskDate').value,
      priority: document.getElementById('formTaskPriority').value,
      isImportant: document.getElementById('formTaskImportant').checked,
      isDaily: document.getElementById('formTaskDaily').checked
    };

    if (id) {
      updateTask(id, taskData);
    } else {
      addTask(taskData);
    }

    closeTaskModal();
  });

  // Modal Cancel & Close
  document.getElementById('closeModalBtn').addEventListener('click', closeTaskModal);
  document.getElementById('cancelModalBtn').addEventListener('click', closeTaskModal);
  document.getElementById('taskModal').addEventListener('click', (e) => {
    if (e.target.id === 'taskModal') closeTaskModal();
  });

  // Delete Confirm Modal Buttons
  document.getElementById('confirmDeleteBtn').addEventListener('click', confirmDeleteTask);
  document.getElementById('cancelDeleteBtn').addEventListener('click', () => {
    document.getElementById('deleteConfirmModal').classList.remove('active');
    state.taskToDeleteId = null;
  });

  // Global Search Input
  const searchInput = document.getElementById('globalSearchInput');
  const clearSearchBtn = document.getElementById('clearSearchBtn');

  searchInput.addEventListener('input', (e) => {
    state.searchQuery = e.target.value;
    clearSearchBtn.style.display = state.searchQuery ? 'block' : 'none';
    renderApp();
  });

  clearSearchBtn.addEventListener('click', () => {
    searchInput.value = '';
    state.searchQuery = '';
    clearSearchBtn.style.display = 'none';
    renderApp();
  });

  // Keyboard shortcut Esc to close modals
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeTaskModal();
      document.getElementById('deleteConfirmModal').classList.remove('active');
    }
  });
}

// ==========================================
// BOOTSTRAP APPLICATION
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
  loadTasks();
  setupEventListeners();
  renderApp();
});
