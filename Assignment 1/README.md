# Minimalist To-Do Application

A clean, responsive, and feature-rich To-Do application built with vanilla HTML, CSS, and JavaScript. This project demonstrates modern web development practices while maintaining a minimalist black and white design aesthetic.

## 🚀 Features

### Core Functionality
- ✅ **Add Tasks**: Create new tasks with titles and optional descriptions
- ✅ **Mark Complete**: Toggle tasks between completed and pending states
- ✅ **Delete Tasks**: Remove tasks permanently
- ✅ **Input Validation**: Prevents adding empty tasks
- ✅ **Persistent Storage**: Tasks are saved in browser's localStorage

### Enhanced Features
- 🎯 **Priority System**: Assign Low, Medium, or High priority to tasks
- 🔍 **Task Filtering**: View All, Pending, or Completed tasks
- 📝 **Task Descriptions**: Add optional detailed descriptions
- 🧹 **Bulk Actions**: Clear all completed tasks at once
- 📱 **Responsive Design**: Works seamlessly on desktop and mobile

### Visual Design
- 🎨 **Color-Coded Priorities**: 
  - Low Priority 
  - Medium Priority 
  - High Priority 
- 🎯 **Intuitive Button Colors**: Green for completion, Red for deletion
- ✨ **Smooth Transitions**: Hover effects and animations
- 📱 **Mobile-Friendly**: Responsive layout for all screen sizes

## 🛠️ Technology Stack

- **HTML5**: Semantic markup with accessibility features
- **CSS3**: Modern styling with Flexbox and CSS Grid
- **Vanilla JavaScript**: ES6+ features, DOM manipulation, and localStorage
- **No External Dependencies**: Pure web technologies only

## 📁 Project Structure

```
Todo-webapp/
├── index.html          # Main HTML structure
├── styles.css          # All styling and responsive design
├── script.js          # JavaScript functionality
└── README.md          # This documentation
```

## 🚀 Getting Started

### Prerequisites
- Any modern web browser (Chrome, Firefox, Safari, Edge)
- No server setup required

### Installation
1. **Clone or Download** this repository
2. **Open** `index.html` in your web browser
3. **Start using** the application immediately!

### Usage

#### Adding a Task
1. Enter a task title in the "Task title..." field
2. Optionally add a description in the "Description" field
3. Select a priority level (Low, Medium, High)
4. Click "Add" or press Enter

#### Managing Tasks
- **Complete a Task**: Click the green "Done" button
- **Undo Completion**: Click "Undo" on completed tasks
- **Delete a Task**: Click the red "Delete" button
- **Filter Tasks**: Use "All", "Pending", or "Completed" buttons
- **Clear Completed**: Use "Clear All Completed" button

## 🎨 Design Philosophy

### Minimalist Approach
- Clean black and white base with strategic color accents
- Generous white space for better readability
- Simple, intuitive user interface
- Focus on functionality over decoration

### User Experience
- **Immediate Feedback**: Visual responses to all interactions
- **Accessibility**: Proper ARIA labels and semantic HTML
- **Mobile-First**: Responsive design that works on any device
- **Performance**: Lightweight and fast loading

## 🔧 Technical Implementation

### Key JavaScript Features
```javascript
// Local Storage Integration
function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Dynamic Task Rendering
function renderTasks() {
    // Filters and displays tasks based on current view
}

// Form Validation
if (!text) {
    taskInput.classList.add('error');
    return;
}
```

### CSS Highlights
```css
/* Responsive Design */
@media (max-width: 500px) {
    .container {
        max-width: 98vw;
        padding: 1rem 0.5rem;
    }
}

/* Priority Color System */
.task-priority.low { background: #4ade80; }
.task-priority.medium { background: #fbbf24; }
.task-priority.high { background: #ef4444; }
```

## 📱 Browser Compatibility

- ✅ Chrome 60+
- ✅ Firefox 60+
- ✅ Safari 12+
- ✅ Edge 79+

## 🎯 Assignment Requirements Met

### Mandatory Features (✅ Complete)
- [x] Add new tasks
- [x] Mark tasks as completed
- [x] Delete tasks
- [x] Clear distinction between completed/pending
- [x] Input validation for empty tasks
- [x] HTML/CSS/JavaScript separation
- [x] Semantic HTML practices
- [x] Clean, user-friendly UI
- [x] Hover/active button states

### Enhanced Features (✅ Complete)
- [x] Task filtering (All/Pending/Completed)
- [x] Local Storage persistence
- [x] "Clear All Completed" functionality
- [x] CSS transitions and animations
- [x] **Bonus**: Priority system with descriptions
- [x] **Bonus**: Color-coded interface
- [x] **Bonus**: Mobile responsiveness

## 🏆 Standout Features

1. **Priority System**: Three-level priority with visual indicators
2. **Task Descriptions**: Optional detailed task information
3. **Color Psychology**: Strategic use of colors for better UX
4. **Selective Strikethrough**: Only task text gets crossed out, not priority labels
5. **Enhanced Filtering**: Comprehensive task management
6. **Responsive Design**: Works perfectly on all devices

## 🚀 Future Enhancements

Potential features for future versions:
- Due dates and reminders
- Task categories/tags
- Search functionality
- Export/import tasks
- Drag-and-drop reordering
- Dark mode theme
- Task sharing capabilities

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 👨‍💻 Author

Created as part of a web development assignment demonstrating proficiency in:
- Vanilla JavaScript DOM manipulation
- CSS design and responsiveness
- HTML semantic structure
- User experience design
- Code organization and best practices

---

**Ready to organize your tasks?** Open `index.html` and start managing your to-dos with style! 🎉
