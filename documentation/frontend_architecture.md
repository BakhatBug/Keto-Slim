# Frontend Architecture

The frontend is built with **React** and **TypeScript**, powered by **Vite** for fast development and build performance. It uses a modern component-based architecture.

## 🏗️ Core Concepts

### Component Structure
The UI is broken down into small, reusable components.
- **Pages**: Top-level components representing distinct views.
    - `FormPage`: The initial health assessment questionnaire.
    - `ResultsDisplay`: Shows Body Fat percentage.
    - `BMIDisplay`: Shows BMI calculation.
    - `CaloriesDisplay`: Shows daily calorie needs.
    - `WaterDisplay`: Shows hydration recommendations.
    - `WeightLossDisplay`: Shows projected weight loss.
    - `ResultsTimelineDisplay`: Visual timeline of progress.
    - `FinalPlanPage`: The comprehensive generated plan.
- **Components**: Reusable UI elements (`ThemeToggle`, `Card`, etc.).

### State Management
- **Global UI State**: 
  - `ThemeContext`: Manages Dark/Light mode preference across the entire app.
- **Form Data State**: 
  - Managed centrally in `App.tsx` using **`useState`**.
  - **Lifting State Up**: The form data is collected in the `Form` component but stored in the parent `App` component.
  - **Prop Drilling**: The `formData` object is passed down as props to all result display components via a `Protected Route` pattern to ensure data exists before rendering.
- **Routing**: `react-router-dom` handles navigation between the multi-step result pages.

```mermaid
graph TD
    App[App.tsx (Holds formData State)] --> ThemeProvider
    ThemeProvider --> Router
    Router --> FormRoute[/]
    Router --> ResultRoute1[/body-fat]
    Router --> ResultRoute2[/bmi]
    
    FormRoute --> FormComponent
    ResultRoute1 --> ResultsDisplay
    ResultRoute2 --> BMIDisplay
    
    App -- passes formData prop --> ResultsDisplay
    App -- passes formData prop --> BMIDisplay
```

## 🎨 Styling
- **TailwindCSS**: Utility-first CSS framework for rapid UI development.
- **CSS Modules/Plain CSS**: Used for specific custom animations or styles not easily covered by Tailwind.
- **Responsive Design**: Mobile-first approach ensuring compatibility with all screen sizes.

## 📂 Directory Map

- **`src/components`**: Shared UI components.
- **`src/contexts`**: Context definitions and Providers (e.g., `ThemeContext`).
- **`src/pages`**: Main view components (if separated, seemingly integrated in components currently).
- **`src/assets`**: Static assets like images and global styles.

## 🔄 Key User Flows

### 1. Assessment Flow
User lands on Home -> Completes Multi-step Form -> Data sent to Backend -> Result Page Generated.

### 2. Purchase Flow
User views Result -> Selects Products -> Adds to Cart -> Checkout (Guest/User) -> Order Confirmation.

## 🔌 API Integration
- **Current Status**: **Mock Data / Local State** (Pending Integration).
- The frontend currently operates using separate local state for demonstration purposes.
- **Future Integration Plan**:
  - Connect `POST /forms` to submit the `formData` object.
  - Connect `GET /results/:id` to retrieve persistent results.
  - Connect `POST /orders` for the checkout process.

## 🚀 Performance Optimization
- **Code Splitting**: Dynamic imports for routes to reduce initial bundle size.
- **Assets**: Optimized images and standard static asset caching.
