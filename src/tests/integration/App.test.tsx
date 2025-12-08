import { describe, it, expect } from 'vitest';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ThemeProvider } from '../../contexts/ThemeContext';
import App from '../../App';

// Helper function to fill the form with all required fields
async function fillForm(user: any, formData: any) {
  // Gender (radio button)
  await user.click(screen.getByRole('radio', { name: formData.gender }));

  // Body Fat % (range slider) - must use fireEvent for sliders
  const bodyFatSlider = screen.getByLabelText(/body fat %/i);
  fireEvent.change(bodyFatSlider, { target: { value: formData.bodyFat } });

  // BMI (range slider) - must use fireEvent for sliders
  const bmiSlider = screen.getByLabelText(/bmi/i);
  fireEvent.change(bmiSlider, { target: { value: formData.bmi } });

  // Daily Calorie Target (number input)
  await user.type(screen.getByLabelText(/daily calorie target/i), formData.calories);

  // Cups of Water Per Day (select dropdown)
  await user.selectOptions(screen.getByLabelText(/cups of water per day/i), formData.water);

  // Weekly Weight Loss Goal (number input)
  await user.type(screen.getByLabelText(/weekly weight loss goal/i), formData.weightLoss);

  // Days to See Results (number input)
  await user.type(screen.getByLabelText(/days to see results/i), formData.days);
}

describe('Integration Tests', () => {
  describe('Complete User Flow', () => {
    it('should complete full form submission flow', async () => {
      const user = userEvent.setup();

      render(
        <ThemeProvider>
          <App />
        </ThemeProvider>
      );

      // Verify we start on the form page
      expect(screen.getByText('Enter Your')).toBeInTheDocument();
      expect(screen.getByRole('group', { name: /gender/i })).toBeInTheDocument();

      // Fill out the form using the helper
      await fillForm(user, {
        gender: 'Male',
        bodyFat: '25',
        bmi: '28',
        calories: '1500',
        water: '6',
        weightLoss: '20',
        days: '90'
      });

      // Wait for submit button to be enabled
      const submitButton = screen.getByRole('button', { name: /see my results/i });
      await waitFor(() => expect(submitButton).toBeEnabled(), { timeout: 3000 });

      // Submit the form
      await user.click(submitButton);

      // Should navigate to results page
      await waitFor(() => {
        expect(screen.getByText(/25%/)).toBeInTheDocument();
      }, { timeout: 3000 });
    });

    it('should navigate through result pages', async () => {
      const user = userEvent.setup();

      render(
        <ThemeProvider>
          <App />
        </ThemeProvider>
      );

      // Fill and submit form
      await fillForm(user, {
        gender: 'Female',
        bodyFat: '30',
        bmi: '32',
        calories: '1400',
        water: '4',
        weightLoss: '15',
        days: '60'
      });

      const submitButton = screen.getByRole('button', { name: /see my results/i });
      await waitFor(() => expect(submitButton).toBeEnabled(), { timeout: 3000 });
      await user.click(submitButton);

      // Wait for first results page
      await waitFor(() => {
        expect(screen.getByText(/30%/)).toBeInTheDocument();
      }, { timeout: 3000 });

      // Click next to BMI page
      let nextButton = screen.getAllByRole('button', { name: /next/i })[0];
      await user.click(nextButton);

      await waitFor(() => {
        expect(screen.getByText(/32/)).toBeInTheDocument();
      }, { timeout: 3000 });
    });
  });

  describe('Theme and Accessibility', () => {
    it('should toggle dark mode', async () => {
      const user = userEvent.setup();

      render(
        <ThemeProvider>
          <App />
        </ThemeProvider>
      );

      const themeToggle = screen.getByRole('button', { name: /toggle dark mode/i });
      await user.click(themeToggle);

      await waitFor(() => {
        expect(localStorage.getItem('darkMode')).toBe('true');
      });
    });

    it('should have proper ARIA labels', () => {
      render(
        <ThemeProvider>
          <App />
        </ThemeProvider>
      );

      const form = screen.getByRole('form');
      expect(form).toHaveAttribute('aria-label');

      const themeToggle = screen.getByRole('button', { name: /toggle dark mode/i });
      expect(themeToggle).toHaveAccessibleName();
    });
  });
});


