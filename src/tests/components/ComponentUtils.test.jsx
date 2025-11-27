import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ThemeProvider } from '../../contexts/ThemeContext';
import ThemeToggle from '../../components/ThemeToggle';
import Card from '../../components/Card';
import ProgressIndicator from '../../components/ProgressIndicator';

describe('Component Unit Tests', () => {
  describe('ThemeToggle', () => {
    it('should render theme toggle button', () => {
      render(
        <ThemeProvider>
          <ThemeToggle />
        </ThemeProvider>
      );

      const button = screen.getByRole('button', { name: /toggle theme/i });
      expect(button).toBeInTheDocument();
    });

    it('should toggle theme when clicked', async () => {
      const user = userEvent.setup();

      const TestComponent = () => {
        return (
          <ThemeProvider>
            <ThemeToggle />
          </ThemeProvider>
        );
      };

      render(<TestComponent />);

      const button = screen.getByRole('button', { name: /toggle theme/i });

      // Initial state should be light mode
      expect(localStorage.getItem('darkMode')).toBeFalsy();

      // Click to enable dark mode
      await user.click(button);

      // Should update localStorage
      expect(localStorage.getItem('darkMode')).toBe('true');
    });

    it('should show correct icon based on theme', () => {
      render(
        <ThemeProvider>
          <ThemeToggle />
        </ThemeProvider>
      );

      const button = screen.getByRole('button');
      expect(button).toBeInTheDocument();
      // SVG icons should be present
      const svg = button.querySelector('svg');
      expect(svg).toBeInTheDocument();
    });
  });

  describe('Card', () => {
    it('should render children content', () => {
      render(
        <ThemeProvider>
          <Card>
            <div>Test Content</div>
          </Card>
        </ThemeProvider>
      );

      expect(screen.getByText('Test Content')).toBeInTheDocument();
    });

    it('should render logo when showLogo is true', () => {
      render(
        <ThemeProvider>
          <Card showLogo={true}>
            <div>Content</div>
          </Card>
        </ThemeProvider>
      );

      const logo = screen.getByAltText('Keto Slim Logo');
      expect(logo).toBeInTheDocument();
    });

    it('should not render logo when showLogo is false', () => {
      render(
        <ThemeProvider>
          <Card showLogo={false}>
            <div>Content</div>
          </Card>
        </ThemeProvider>
      );

      const logo = screen.queryByAltText('Keto Slim Logo');
      expect(logo).not.toBeInTheDocument();
    });

    it('should render progress indicator when showProgress is true', () => {
      render(
        <ThemeProvider>
          <Card showProgress={true} currentStep={2} totalSteps={5}>
            <div>Content</div>
          </Card>
        </ThemeProvider>
      );

      expect(screen.getByText('2 of 5')).toBeInTheDocument();
    });

    it('should not render progress when showProgress is false', () => {
      render(
        <ThemeProvider>
          <Card showProgress={false} currentStep={2} totalSteps={5}>
            <div>Content</div>
          </Card>
        </ThemeProvider>
      );

      expect(screen.queryByText('2 of 5')).not.toBeInTheDocument();
    });

    it('should apply custom className', () => {
      const { container } = render(
        <ThemeProvider>
          <Card className="custom-class">
            <div>Content</div>
          </Card>
        </ThemeProvider>
      );

      const article = container.querySelector('article');
      expect(article).toHaveClass('custom-class');
    });

    it('should apply dark mode styles', () => {
      localStorage.setItem('darkMode', 'true');

      const { container } = render(
        <ThemeProvider>
          <Card>
            <div>Content</div>
          </Card>
        </ThemeProvider>
      );

      const main = container.querySelector('main');
      expect(main).toHaveClass('bg-gray-900');
    });
  });

  describe('ProgressIndicator', () => {
    it('should render current step and total steps', () => {
      render(
        <ThemeProvider>
          <ProgressIndicator currentStep={3} totalSteps={7} />
        </ThemeProvider>
      );

      expect(screen.getByText('3 of 7')).toBeInTheDocument();
    });

    it('should render custom label', () => {
      render(
        <ThemeProvider>
          <ProgressIndicator currentStep={2} totalSteps={5} label="Custom Progress" />
        </ThemeProvider>
      );

      expect(screen.getByText('Custom Progress')).toBeInTheDocument();
    });

    it('should render default label when not provided', () => {
      render(
        <ThemeProvider>
          <ProgressIndicator currentStep={1} totalSteps={5} />
        </ThemeProvider>
      );

      expect(screen.getByText('Your Results')).toBeInTheDocument();
    });

    it('should calculate correct progress percentage', () => {
      const { container } = render(
        <ThemeProvider>
          <ProgressIndicator currentStep={2} totalSteps={4} />
        </ThemeProvider>
      );

      // 2/4 = 50%
      const progressBar = container.querySelector('[style*="width"]');
      expect(progressBar).toHaveStyle({ width: '50%' });
    });

    it('should handle edge case of step 0', () => {
      const { container } = render(
        <ThemeProvider>
          <ProgressIndicator currentStep={0} totalSteps={5} />
        </ThemeProvider>
      );

      const progressBar = container.querySelector('[style*="width"]');
      expect(progressBar).toHaveStyle({ width: '0%' });
    });

    it('should handle full progress', () => {
      const { container } = render(
        <ThemeProvider>
          <ProgressIndicator currentStep={5} totalSteps={5} />
        </ThemeProvider>
      );

      const progressBar = container.querySelector('[style*="width"]');
      expect(progressBar).toHaveStyle({ width: '100%' });
    });
  });
});
