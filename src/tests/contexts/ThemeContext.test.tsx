import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, renderHook, act } from '@testing-library/react';
import { ThemeProvider, useTheme } from '../../contexts/ThemeContext';

describe('ThemeContext', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  describe('ThemeProvider', () => {
    it('should provide default darkMode as false', () => {
      const TestComponent = () => {
        const { darkMode } = useTheme();
        return <div data-testid="dark-mode">{darkMode.toString()}</div>;
      };

      render(
        <ThemeProvider>
          <TestComponent />
        </ThemeProvider>
      );

      expect(screen.getByTestId('dark-mode')).toHaveTextContent('false');
    });

    it('should initialize darkMode from localStorage if available', () => {
      localStorage.setItem('darkMode', JSON.stringify(true));

      const TestComponent = () => {
        const { darkMode } = useTheme();
        return <div data-testid="dark-mode">{darkMode.toString()}</div>;
      };

      render(
        <ThemeProvider>
          <TestComponent />
        </ThemeProvider>
      );

      expect(screen.getByTestId('dark-mode')).toHaveTextContent('true');
    });

    it('should persist darkMode to localStorage when changed', () => {
      const TestComponent = () => {
        const { darkMode, setDarkMode } = useTheme();
        return (
          <div>
            <div data-testid="dark-mode">{darkMode.toString()}</div>
            <button onClick={() => setDarkMode(true)}>Enable Dark Mode</button>
          </div>
        );
      };

      const { rerender } = render(
        <ThemeProvider>
          <TestComponent />
        </ThemeProvider>
      );

      const button = screen.getByText('Enable Dark Mode');
      act(() => {
        button.click();
      });

      rerender(
        <ThemeProvider>
          <TestComponent />
        </ThemeProvider>
      );

      expect(localStorage.getItem('darkMode')).toBe('true');
    });
  });

  describe('useTheme hook', () => {
    it('should return darkMode, setDarkMode, and toggleDarkMode', () => {
      const { result } = renderHook(() => useTheme(), {
        wrapper: ThemeProvider,
      });

      expect(result.current).toHaveProperty('darkMode');
      expect(result.current).toHaveProperty('setDarkMode');
      expect(result.current).toHaveProperty('toggleDarkMode');
      expect(typeof result.current.darkMode).toBe('boolean');
      expect(typeof result.current.setDarkMode).toBe('function');
      expect(typeof result.current.toggleDarkMode).toBe('function');
    });

    it('should throw error when used outside ThemeProvider', () => {
      // Suppress console.error for this test
      const spy = vi.spyOn(console, 'error').mockImplementation(() => { });

      expect(() => {
        renderHook(() => useTheme());
      }).toThrow('useTheme must be used within a ThemeProvider');

      spy.mockRestore();
    });

    it('should toggle darkMode when toggleDarkMode is called', () => {
      const { result } = renderHook(() => useTheme(), {
        wrapper: ThemeProvider,
      });

      expect(result.current.darkMode).toBe(false);

      act(() => {
        result.current.toggleDarkMode();
      });

      expect(result.current.darkMode).toBe(true);

      act(() => {
        result.current.toggleDarkMode();
      });

      expect(result.current.darkMode).toBe(false);
    });

    it('should update darkMode when setDarkMode is called', () => {
      const { result } = renderHook(() => useTheme(), {
        wrapper: ThemeProvider,
      });

      expect(result.current.darkMode).toBe(false);

      act(() => {
        result.current.setDarkMode(true);
      });

      expect(result.current.darkMode).toBe(true);

      act(() => {
        result.current.setDarkMode(false);
      });

      expect(result.current.darkMode).toBe(false);
    });
  });

  describe('localStorage integration', () => {
    it('should save darkMode state to localStorage', () => {
      const { result } = renderHook(() => useTheme(), {
        wrapper: ThemeProvider,
      });

      act(() => {
        result.current.setDarkMode(true);
      });

      const savedValue = localStorage.getItem('darkMode');
      expect(savedValue).toBe('true');
      if (savedValue) {
        expect(JSON.parse(savedValue)).toBe(true);
      }
    });

    it('should handle invalid localStorage data gracefully', () => {
      localStorage.setItem('darkMode', 'invalid-json');

      const TestComponent = () => {
        const { darkMode } = useTheme();
        return <div data-testid="dark-mode">{darkMode.toString()}</div>;
      };

      render(
        <ThemeProvider>
          <TestComponent />
        </ThemeProvider>
      );

      // Should fallback to default (false)
      expect(screen.getByTestId('dark-mode')).toHaveTextContent('false');
    });
  });

  describe('Multiple components using context', () => {
    it('should share state between multiple components', () => {
      const ComponentA = () => {
        const { darkMode, setDarkMode } = useTheme();
        return (
          <div>
            <div data-testid="component-a">{darkMode.toString()}</div>
            <button onClick={() => setDarkMode(true)}>A: Enable</button>
          </div>
        );
      };

      const ComponentB = () => {
        const { darkMode } = useTheme();
        return <div data-testid="component-b">{darkMode.toString()}</div>;
      };

      render(
        <ThemeProvider>
          <ComponentA />
          <ComponentB />
        </ThemeProvider>
      );

      expect(screen.getByTestId('component-a')).toHaveTextContent('false');
      expect(screen.getByTestId('component-b')).toHaveTextContent('false');

      const button = screen.getByText('A: Enable');
      act(() => {
        button.click();
      });

      expect(screen.getByTestId('component-a')).toHaveTextContent('true');
      expect(screen.getByTestId('component-b')).toHaveTextContent('true');
    });
  });
});
