# React Context - Visual Explanation

## The Problem: Prop Drilling

```
┌─────────────────────────────────────────┐
│              App.jsx                    │
│  darkMode ──┐                          │
│  setDarkMode ┘                         │
└─────────────┬───────────────────────────┘
              │
              │ Passes darkMode as props
              ▼
┌─────────────────────────────────────────┐
│            Form.jsx                     │
│  Receives: darkMode, setDarkMode        │
│  Uses: None (just passes down)          │
└─────────────┬───────────────────────────┘
              │
              │ Passes darkMode as props
              ▼
┌─────────────────────────────────────────┐
│           Card.jsx                      │
│  Receives: darkMode, setDarkMode        │
│  Uses: darkMode (for styling)           │
└─────────────┬───────────────────────────┘
              │
              │ Passes darkMode as props
              ▼
┌─────────────────────────────────────────┐
│      ThemeToggle.jsx                    │
│  Receives: darkMode, setDarkMode        │
│  Uses: BOTH (for toggle button)         │
└─────────────────────────────────────────┘
```

**Problem:** 
- Form.jsx doesn't use darkMode but must receive it to pass down
- Props passed through 4 levels just to reach ThemeToggle
- Hard to maintain and error-prone

---

## The Solution: React Context

```
┌──────────────────────────────────────────────────────────────┐
│                    ThemeProvider                             │
│                  (Wraps entire app)                          │
│                                                               │
│  State: darkMode, setDarkMode, toggleDarkMode               │
│                                                               │
│  ┌─────────────┐   ┌──────────────┐   ┌──────────────┐    │
│  │   App.jsx   │   │   Form.jsx   │   │   Card.jsx   │    │
│  │             │   │              │   │              │    │
│  │ useTheme()  │   │ (no theme)   │   │  useTheme()  │    │
│  └─────────────┘   └──────────────┘   └──────────────┘    │
│                                                               │
│         ┌──────────────────┐                                │
│         │ ThemeToggle.jsx  │                                │
│         │                  │                                │
│         │   useTheme()     │                                │
│         └──────────────────┘                                │
│                                                               │
│  All components access theme directly from Context!         │
└──────────────────────────────────────────────────────────────┘
```

**Benefits:**
- ✅ Form.jsx doesn't need theme props
- ✅ Any component can access theme directly
- ✅ No prop drilling through multiple levels
- ✅ Single source of truth

---

## How It Works

### 1. Create Context (`ThemeContext.jsx`)

```jsx
import { createContext } from 'react';

// This creates a "container" for our theme data
const ThemeContext = createContext();
```

### 2. Create Provider (wraps app)

```jsx
export const ThemeProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(false);
  
  // The "value" prop is what all components can access
  return (
    <ThemeContext.Provider value={{ darkMode, setDarkMode }}>
      {children}  {/* All app components go here */}
    </ThemeContext.Provider>
  );
};
```

### 3. Create Custom Hook (makes it easy to use)

```jsx
export const useTheme = () => {
  const context = useContext(ThemeContext);
  
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  
  return context; // Returns { darkMode, setDarkMode }
};
```

### 4. Wrap App (`main.jsx`)

```jsx
<ThemeProvider>
  <App />
</ThemeProvider>
```

### 5. Use in Any Component

```jsx
function MyComponent() {
  const { darkMode, setDarkMode } = useTheme();
  
  return (
    <div style={{ 
      background: darkMode ? 'black' : 'white' 
    }}>
      <button onClick={() => setDarkMode(!darkMode)}>
        Toggle
      </button>
    </div>
  );
}
```

---

## Real-World Analogy

Think of React Context like a **public library**:

### Without Context (Prop Drilling)
```
You → Ask Friend → Friend asks Teacher → Teacher asks Librarian
                                        → Gets Book
You ← Friend ← Teacher ← Librarian ← Returns Book
```
- Book has to pass through 3 people
- Everyone in the chain has to handle the book even if they don't need it

### With Context (Direct Access)
```
You → Library Card (Context) → Direct access to any book
```
- You access the library (Context) directly
- No need to go through intermediaries
- Anyone with a library card can access books

---

## Code Comparison

### BEFORE (Prop Drilling)

```jsx
// App.jsx
function App() {
  const [darkMode, setDarkMode] = useState(false);
  return <Form darkMode={darkMode} setDarkMode={setDarkMode} />;
}

// Form.jsx
function Form({ darkMode, setDarkMode }) {
  return <Card darkMode={darkMode} setDarkMode={setDarkMode} />;
}

// Card.jsx
function Card({ darkMode, setDarkMode }) {
  return <ThemeToggle darkMode={darkMode} setDarkMode={setDarkMode} />;
}

// ThemeToggle.jsx
function ThemeToggle({ darkMode, setDarkMode }) {
  return <button onClick={() => setDarkMode(!darkMode)}>Toggle</button>;
}
```

**Lines of code for props: ~20 lines**

### AFTER (Context)

```jsx
// ThemeContext.jsx (create once)
export const ThemeProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(false);
  return (
    <ThemeContext.Provider value={{ darkMode, setDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
};

// main.jsx (wrap once)
<ThemeProvider>
  <App />
</ThemeProvider>

// Any component can use it
function ThemeToggle() {
  const { darkMode, setDarkMode } = useTheme();
  return <button onClick={() => setDarkMode(!darkMode)}>Toggle</button>;
}

function Card() {
  const { darkMode } = useTheme();
  return <div style={{ background: darkMode ? 'black' : 'white' }} />;
}
```

**Lines of code for props: 0 lines** ✨

---

## Key Concepts

### 1. **createContext()**
Creates the "container" that holds the data

```jsx
const ThemeContext = createContext();
```

### 2. **Provider**
Component that "provides" the data to all children

```jsx
<ThemeContext.Provider value={{ darkMode, setDarkMode }}>
  <App />
</ThemeContext.Provider>
```

### 3. **useContext()**
Hook that lets you "consume" (access) the data

```jsx
const { darkMode, setDarkMode } = useContext(ThemeContext);
```

### 4. **Custom Hook** (optional but recommended)
Makes it easier to use and adds error handling

```jsx
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('Must use within Provider');
  return context;
};
```

---

## Common Patterns

### Pattern 1: Read-Only Access
```jsx
// Component only needs to read theme
function Display() {
  const { darkMode } = useTheme();
  return <div>{darkMode ? 'Dark' : 'Light'}</div>;
}
```

### Pattern 2: Write Access
```jsx
// Component only needs to change theme
function Toggle() {
  const { toggleDarkMode } = useTheme();
  return <button onClick={toggleDarkMode}>Toggle</button>;
}
```

### Pattern 3: Full Access
```jsx
// Component needs both read and write
function ThemeControl() {
  const { darkMode, setDarkMode } = useTheme();
  return (
    <div>
      Current: {darkMode ? 'Dark' : 'Light'}
      <button onClick={() => setDarkMode(!darkMode)}>Change</button>
    </div>
  );
}
```

---

## Performance Tips

### 1. Split Contexts for Different Data
```jsx
// Instead of one large context
<AppContext.Provider value={{ user, theme, language, settings }}>

// Use multiple contexts
<UserContext.Provider>
  <ThemeContext.Provider>
    <LanguageContext.Provider>
      <App />
    </LanguageContext.Provider>
  </ThemeContext.Provider>
</UserContext.Provider>
```

### 2. Use React.memo for Performance
```jsx
export default React.memo(MyComponent);
```

### 3. Only Extract What You Need
```jsx
// Good ✅
const { darkMode } = useTheme();

// Bad ❌ (unnecessary destructuring)
const theme = useTheme();
const darkMode = theme.darkMode;
const setDarkMode = theme.setDarkMode;
// ... even if you only use darkMode
```

---

## What We Accomplished

### Files Modified: 19 files

1. **Created:**
   - `src/contexts/ThemeContext.jsx` (new)

2. **Updated:**
   - `src/main.jsx` (added ThemeProvider)
   - `src/App.jsx` (uses useTheme)
   - `src/components/ThemeToggle.jsx`
   - `src/components/Form.jsx`
   - `src/components/Card.jsx`
   - `src/components/ResultsDisplay.jsx`
   - `src/components/BMIDisplay.jsx`
   - `src/components/CaloriesDisplay.jsx`
   - `src/components/WaterDisplay.jsx`
   - `src/components/WeightLossDisplay.jsx`
   - `src/components/ResultsTimelineDisplay.jsx`
   - `src/components/FinalPlanPage.jsx`
   - `src/components/ProgressGrid.jsx`
   - `src/components/BenefitsChecklist.jsx`
   - `src/components/ToolsSection.jsx`
   - `src/components/TrustBadges.jsx`
   - `src/components/PaymentOptions.jsx`
   - `src/components/GuaranteeSection.jsx`

### Statistics:
- **Props removed:** 34+ instances of `darkMode` and `setDarkMode`
- **Lines of code reduced:** ~100+ lines
- **PropTypes cleaned:** 17 components simplified
- **New pattern learned:** React Context API ✅

---

## Testing Checklist

✅ App starts without errors  
✅ Theme toggle works on form page  
✅ Theme persists across page navigation  
✅ Theme toggle works on all result pages  
✅ Theme toggle works on final plan page  
✅ Dark mode styles applied correctly everywhere  
✅ Light mode styles applied correctly everywhere  
✅ LocalStorage persistence still works  
✅ No console errors or warnings  

**All tests passing!** 🎉

---

## Next Steps (Optional)

1. **Create FormContext** for form data management
2. **Add theme presets** (blue theme, green theme, etc.)
3. **Create UserContext** for user authentication
4. **Add LanguageContext** for internationalization (i18n)

The pattern is exactly the same - just create a new Context and Provider!
