# Vue.js 3 Todo App - Modular Structure

This is a Vue.js 3 todo application restructured to be as close as possible to SFC (Single File Component) structure while using CDN and the Composition API with `setup()` function.

## Project Structure

```
helton-vue-cdn1/
├── index.html              # Main HTML file with templates
├── main.js                 # Entry point - loads and mounts the app
├── components/
│   ├── App.css            # App component styles (equivalent to <style> in SFC)
│   ├── App.js             # App component logic (equivalent to <script> in SFC)
│   ├── TaskItem.css       # TaskItem component styles (equivalent to <style> in SFC)
│   └── TaskItem.js         # TaskItem component logic (equivalent to <script> in SFC)
└── README.md              # This file
```

## File Descriptions

### `index.html`
- Main HTML file that loads Vue.js from CDN
- Contains HTML templates using `<template>` elements with IDs
- Links to the external CSS file
- Contains the mounting point `<div id="app"></div>`
- Loads the main.js entry point

### `main.js`
- Entry point of the application
- Dynamically loads the App component and template
- Creates and mounts the Vue application



### `components/App.css`
- Contains global styles and App-specific styles (equivalent to `<style>` in SFC)
- Includes CSS variables for theming (light/dark mode)
- App container, header, input area, and clock styles

### `components/App.js`
- Contains the Vue component logic using Composition API
- Uses `setup()` function (not `<script setup>`)
- Exports the component as default export
- All reactive data, computed properties, and methods are defined here

### `components/TaskItem.css`
- Contains TaskItem-specific styles (equivalent to `<style>` in SFC)
- Task item layout, checkbox, buttons, and edit input styles

### `components/TaskItem.js`
- Reusable TaskItem component that handles individual task functionality
- Shows the extensibility of this structure
- Demonstrates props, emits, and component communication
- Uses template from HTML by ID
- Handles task editing, completion, and deletion

## Features

- ✅ Add, edit, and delete tasks
- ✅ Mark tasks as completed
- ✅ Dark/Light theme toggle
- ✅ Local storage persistence
- ✅ Real-time clock display
- ✅ Responsive design
- ✅ Accessibility features
- ✅ Modern UI with smooth transitions

## How to Run

1. Clone or download the project
2. Open `index.html` in a web browser
3. The application will load automatically

## Technical Details

- **Vue.js 3**: Using CDN version
- **Composition API**: Using `setup()` function (not `<script setup>`)
- **CSS Variables**: For theme switching
- **Local Storage**: For data persistence
- **ES6 Modules**: For component loading
- **No Build Tools**: Pure HTML/CSS/JS structure
- **HTML Templates**: Templates are HTML `<template>` elements with IDs

## Structure Benefits

This modular structure provides several benefits:

1. **Separation of Concerns**: Template, styles, and logic are in separate files
2. **Maintainability**: Easier to find and modify specific parts
3. **Reusability**: Components can be easily reused
4. **SFC-like Experience**: Similar to working with Single File Components
5. **No Build Tools**: Can run directly in the browser
6. **CDN Compatible**: Works with Vue.js loaded from CDN

## Future Enhancements

This structure makes it easy to:
- Add more components
- Implement proper routing
- Add state management
- Integrate with build tools later
- Add TypeScript support # Estudos-VueCDN1-
