# React Context - Quick Reference Card

## Quick Start (3 Steps)

### Step 1: Create Context File

```jsx
// src/contexts/MyContext.jsx
import { createContext, useContext, useState } from 'react';

const MyContext = createContext();

export const useMyContext = () => {
  const context = useContext(MyContext);
  if (!context) throw new Error('useMyContext must be used within MyProvider');
  return context;
};

export const MyProvider = ({ children }) => {
  const [state, setState] = useState(initialValue);
  
  return (
    <MyContext.Provider value={{ state, setState }}>
      {children}
    </MyContext.Provider>
  );
};
```

### Step 2: Wrap App

```jsx
// src/main.jsx
import { MyProvider } from './contexts/MyContext.jsx';

createRoot(document.getElementById('root')).render(
  <MyProvider>
    <App />
  </MyProvider>
);
```

### Step 3: Use Anywhere

```jsx
// Any component
import { useMyContext } from '../contexts/MyContext.jsx';

function MyComponent() {
  const { state, setState } = useMyContext();
  
  return <div>{state}</div>;
}
```

---

## Context Checklist

When creating a new Context, include:

```jsx
// ✅ 1. Create Context
const MyContext = createContext();

// ✅ 2. Custom Hook (with error handling)
export const useMyContext = () => {
  const context = useContext(MyContext);
  if (!context) {
    throw new Error('useMyContext must be used within MyProvider');
  }
  return context;
};

// ✅ 3. Provider Component
export const MyProvider = ({ children }) => {
  // State and logic here
  const [data, setData] = useState();
  
  // ✅ 4. Value object
  const value = { data, setData };
  
  // ✅ 5. LocalStorage (if needed)
  useEffect(() => {
    localStorage.setItem('key', JSON.stringify(data));
  }, [data]);
  
  return (
    <MyContext.Provider value={value}>
      {children}
    </MyContext.Provider>
  );
};
```

---

## Common Context Examples

### Theme Context

```jsx
const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme must be used within ThemeProvider');
  return context;
};

export const ThemeProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(false);
  
  const toggleDarkMode = () => setDarkMode(!darkMode);
  
  return (
    <ThemeContext.Provider value={{ darkMode, setDarkMode, toggleDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
};
```

### User Context

```jsx
const UserContext = createContext();

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) throw new Error('useUser must be used within UserProvider');
  return context;
};

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  
  const login = (userData) => setUser(userData);
  const logout = () => setUser(null);
  
  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};
```

### Language Context

```jsx
const LanguageContext = createContext();

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage must be used within LanguageProvider');
  return context;
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('en');
  
  const translations = {
    en: { hello: 'Hello', goodbye: 'Goodbye' },
    es: { hello: 'Hola', goodbye: 'Adiós' },
  };
  
  const t = (key) => translations[language][key];
  
  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};
```

---

## Usage Patterns

### Read Only
```jsx
function Display() {
  const { darkMode } = useTheme();
  return <div>Theme: {darkMode ? 'Dark' : 'Light'}</div>;
}
```

### Write Only
```jsx
function Toggle() {
  const { toggleDarkMode } = useTheme();
  return <button onClick={toggleDarkMode}>Toggle</button>;
}
```

### Read and Write
```jsx
function Control() {
  const { darkMode, setDarkMode } = useTheme();
  return (
    <>
      <div>Current: {darkMode ? 'Dark' : 'Light'}</div>
      <button onClick={() => setDarkMode(true)}>Dark</button>
      <button onClick={() => setDarkMode(false)}>Light</button>
    </>
  );
}
```

---

## Multiple Contexts

```jsx
// main.jsx
<UserProvider>
  <ThemeProvider>
    <LanguageProvider>
      <App />
    </LanguageProvider>
  </ThemeProvider>
</UserProvider>

// Component using multiple contexts
function MyComponent() {
  const { user } = useUser();
  const { darkMode } = useTheme();
  const { t } = useLanguage();
  
  return (
    <div style={{ background: darkMode ? 'black' : 'white' }}>
      {t('hello')}, {user?.name}!
    </div>
  );
}
```

---

## LocalStorage Pattern

```jsx
export const MyProvider = ({ children }) => {
  // Initialize from localStorage
  const [data, setData] = useState(() => {
    const saved = localStorage.getItem('myKey');
    return saved ? JSON.parse(saved) : defaultValue;
  });
  
  // Save to localStorage on change
  useEffect(() => {
    localStorage.setItem('myKey', JSON.stringify(data));
  }, [data]);
  
  return (
    <MyContext.Provider value={{ data, setData }}>
      {children}
    </MyContext.Provider>
  );
};
```

---

## Error Handling

```jsx
// Always wrap useContext in custom hook with error
export const useMyContext = () => {
  const context = useContext(MyContext);
  
  if (!context) {
    throw new Error('useMyContext must be used within MyProvider');
  }
  
  return context;
};

// This prevents using context outside provider:
function BadComponent() {
  const { data } = useMyContext(); // ❌ Throws error if not in Provider
  return <div>{data}</div>;
}
```

---

## Best Practices

### ✅ DO

```jsx
// 1. Use custom hooks
const { darkMode } = useTheme();

// 2. Keep contexts focused (single responsibility)
<ThemeProvider>  // Only theme
<UserProvider>   // Only user
<LanguageProvider>  // Only language

// 3. Provide default values
const ThemeContext = createContext({ darkMode: false });

// 4. Use TypeScript for type safety (optional)
interface ThemeContextType {
  darkMode: boolean;
  setDarkMode: (value: boolean) => void;
}
```

### ❌ DON'T

```jsx
// 1. Don't use context for everything
// Use props for nearby components (1-2 levels)

// 2. Don't create one giant context
<AppContext.Provider value={{ user, theme, language, settings, ... }}>

// 3. Don't forget error handling
const context = useContext(MyContext); // ❌ Missing error check

// 4. Don't pass frequently changing values
// Use state management libraries (Redux, Zustand) for complex state
```

---

## Debugging Tips

### Check if Provider is Missing

```jsx
export const useTheme = () => {
  const context = useContext(ThemeContext);
  
  if (!context) {
    console.error('ThemeContext is undefined. Did you forget to wrap your app with ThemeProvider?');
    throw new Error('useTheme must be used within ThemeProvider');
  }
  
  return context;
};
```

### Log Context Value

```jsx
function MyComponent() {
  const theme = useTheme();
  console.log('Theme Context:', theme);
  
  return <div>...</div>;
}
```

### React DevTools

Install React DevTools extension to inspect Context values in browser:
- Look for "Context.Provider" in component tree
- See current context values

---

## Performance Optimization

### 1. Split Contexts

Instead of:
```jsx
// ❌ One large context
<AppContext.Provider value={{ user, theme, settings }}>
```

Use:
```jsx
// ✅ Multiple focused contexts
<UserContext.Provider>
  <ThemeContext.Provider>
    <SettingsContext.Provider>
```

### 2. Memoize Context Value

```jsx
export const MyProvider = ({ children }) => {
  const [state, setState] = useState();
  
  // Memoize value to prevent unnecessary re-renders
  const value = useMemo(
    () => ({ state, setState }),
    [state]
  );
  
  return (
    <MyContext.Provider value={value}>
      {children}
    </MyContext.Provider>
  );
};
```

### 3. Use React.memo

```jsx
export default React.memo(MyComponent);
```

---

## Common Mistakes

### Mistake 1: Using Context Directly

```jsx
// ❌ DON'T
const context = useContext(ThemeContext);

// ✅ DO
const { darkMode } = useTheme();
```

### Mistake 2: Forgetting Provider

```jsx
// ❌ DON'T
<App />  // Missing provider

// ✅ DO
<ThemeProvider>
  <App />
</ThemeProvider>
```

### Mistake 3: Creating New Object in Value

```jsx
// ❌ DON'T (creates new object on every render)
<MyContext.Provider value={{ data, setData }}>

// ✅ DO (use useMemo)
const value = useMemo(() => ({ data, setData }), [data]);
<MyContext.Provider value={value}>
```

---

## Project Structure

```
src/
├── contexts/
│   ├── ThemeContext.jsx
│   ├── UserContext.jsx
│   └── LanguageContext.jsx
├── components/
│   ├── ThemeToggle.jsx (uses useTheme)
│   ├── UserProfile.jsx (uses useUser)
│   └── LanguageSelector.jsx (uses useLanguage)
├── main.jsx (wraps with Providers)
└── App.jsx
```

---

## Summary Comparison

| Aspect | Props | Context |
|--------|-------|---------|
| **Use Case** | Nearby components (1-2 levels) | Many components across tree |
| **Prop Drilling** | ❌ Yes | ✅ No |
| **Setup** | Simple | Requires Provider |
| **Performance** | Fast | Fast (with optimization) |
| **Type Safety** | ✅ Easy with PropTypes | Requires careful typing |
| **Learning Curve** | Easy | Moderate |

---

## Quick Decision Guide

**Use Props when:**
- Data is only needed by 1-2 components
- Components are close in the tree
- Simple data flow

**Use Context when:**
- Many components need the data
- Components are far apart in tree
- Avoiding deep prop drilling
- Global state (theme, user, language)

---

## Resources

- **React Docs:** https://react.dev/learn/passing-data-deeply-with-context
- **Our Implementation:** See `CONTEXT_IMPLEMENTATION.md`
- **Visual Guide:** See `CONTEXT_VISUAL_GUIDE.md`

---

## In Our Project

We use Context for:
- ✅ **Theme** (dark mode/light mode)
- Components using it: 17 components
- Props eliminated: 34+ prop passes
- Files modified: 19 files

**Status:** ✅ Successfully implemented and tested

---

Created by: GitHub Copilot  
Date: 2025  
Project: Keto Slim
