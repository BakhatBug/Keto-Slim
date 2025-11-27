import { describe, it, expect, vi } from 'vitest';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ThemeProvider } from '../../contexts/ThemeContext';
import App from '../../App';

// Helper function to fill the form with all required fields
async function fillForm(user, formData) {
  // Gender (radio button)
  await user.click(screen.getByRole('radio', { name: formData.gender }));
  
  // Body Fat % (range slider)
  const bodyFatSlider = screen.getByLabelText(/body fat %/i);
  fireEvent.change(bodyFatSlider, { target: { value: formData.bodyFat } });
  
  // BMI (range slider)
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
      expect(screen.getByText(/enter your/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/gender/i)).toBeInTheDocument();

      // Fill out the form
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
      await waitFor(() => expect(submitButton).toBeEnabled());

      // Submit the form
      await user.click(submitButton);

      // Should navigate to results page
      await waitFor(
        () => {
          expect(screen.getByText(/25%/)).toBeInTheDocument();
        },
        { timeout: 3000 }
      );
    });

    it('should navigate through all result pages', async () => {
      const user = userEvent.setup();

      render(
        <ThemeProvider>
          <App />
        </ThemeProvider>
      );

      // Fill and submit form
      await user.click(screen.getByRole('radio', { name: 'Male' }));
      await user.type(screen.getByLabelText(/body fat %/i), '25');
      await user.type(screen.getByLabelText(/bmi/i), '28');
      await user.type(screen.getByLabelText(/daily calorie target/i), '1500');
      await user.type(screen.getByLabelText(/cups of water per day/i), '8');
      await user.type(screen.getByLabelText(/weekly weight loss goal/i), '20');
      await user.type(screen.getByLabelText(/days to see results/i), '90');

      const submitButton = screen.getByRole('button', { name: /see my results/i });
      await waitFor(() => expect(submitButton).toBeEnabled());
      await user.click(submitButton);

      // Wait for first results page
      await waitFor(() => {
        expect(screen.getByText(/25%/)).toBeInTheDocument();
      });

      // Click through to BMI page
      let nextButton = screen.getByRole('button', { name: /next/i });
      await user.click(nextButton);

      await waitFor(() => {
        expect(screen.getByText(/28/)).toBeInTheDocument();
      });

      // Click through to Calories page
      nextButton = screen.getByRole('button', { name: /next/i });
      await user.click(nextButton);

      await waitFor(() => {
        expect(screen.getByText(/1500/i)).toBeInTheDocument();
      });

      // Click through to Water page
      nextButton = screen.getByRole('button', { name: /next/i });
      await user.click(nextButton);

      await waitFor(() => {
        expect(screen.getByText(/8/)).toBeInTheDocument();
      });

      // Click through to Weight Loss page
      nextButton = screen.getByRole('button', { name: /next/i });
      await user.click(nextButton);

      await waitFor(() => {
        expect(screen.getByText(/20/)).toBeInTheDocument();
      });

      // Click through to Timeline page
      nextButton = screen.getByRole('button', { name: /next/i });
      await user.click(nextButton);

      await waitFor(() => {
        expect(screen.getByText(/90/)).toBeInTheDocument();
      });

      // Click through to Final Plan page
      nextButton = screen.getByRole('button', { name: /next/i });
      await user.click(nextButton);

      await waitFor(() => {
        expect(screen.getByText(/your keto plan is ready/i)).toBeInTheDocument();
      });
    });

    it('should allow navigation back through pages', async () => {
      const user = userEvent.setup();

      render(
        <ThemeProvider>
          <App />
        </ThemeProvider>
      );

      // Fill and submit form to get to results
      await user.click(screen.getByRole('radio', { name: 'Male' }));
      await user.type(screen.getByLabelText(/body fat %/i), '25');
      await user.type(screen.getByLabelText(/bmi/i), '28');
      await user.type(screen.getByLabelText(/daily calorie target/i), '1500');
      await user.type(screen.getByLabelText(/cups of water per day/i), '8');
      await user.type(screen.getByLabelText(/weekly weight loss goal/i), '20');
      await user.type(screen.getByLabelText(/days to see results/i), '90');

      const submitButton = screen.getByRole('button', { name: /see my results/i });
      await waitFor(() => expect(submitButton).toBeEnabled());
      await user.click(submitButton);

      // Wait for results page
      await waitFor(() => {
        expect(screen.getByText(/25%/)).toBeInTheDocument();
      });

      // Go forward to BMI page
      await user.click(screen.getByRole('button', { name: /next/i }));

      await waitFor(() => {
        expect(screen.getByText(/28/)).toBeInTheDocument();
      });

      // Go back to results page
      const backButton = screen.getByRole('button', { name: /back/i });
      await user.click(backButton);

      await waitFor(() => {
        expect(screen.getByText(/25%/)).toBeInTheDocument();
      });
    });
  });

  describe('Theme Switching Throughout App', () => {
    it('should toggle dark mode on form page', async () => {
      const user = userEvent.setup();

      render(
        <ThemeProvider>
          <App />
        </ThemeProvider>
      );

      const themeToggle = screen.getByRole('button', { name: /toggle dark mode/i });

      // Initially light mode
      expect(localStorage.getItem('darkMode')).toBeFalsy();

      // Toggle to dark mode
      await user.click(themeToggle);

      await waitFor(() => {
        expect(localStorage.getItem('darkMode')).toBe('true');
      });
    });

    it('should persist theme across page navigation', async () => {
      const user = userEvent.setup();

      render(
        <ThemeProvider>
          <App />
        </ThemeProvider>
      );

      // Enable dark mode on form page
      const themeToggle = screen.getByRole('button', { name: /toggle dark mode/i });
      await user.click(themeToggle);

      await waitFor(() => {
        expect(localStorage.getItem('darkMode')).toBe('true');
      });

      // Fill and submit form
      await user.click(screen.getByRole('radio', { name: 'Male' }));
      await user.type(screen.getByLabelText(/body fat %/i), '25');
      await user.type(screen.getByLabelText(/bmi/i), '28');
      await user.type(screen.getByLabelText(/daily calorie target/i), '1500');
      await user.type(screen.getByLabelText(/cups of water per day/i), '8');
      await user.type(screen.getByLabelText(/weekly weight loss goal/i), '20');
      await user.type(screen.getByLabelText(/days to see results/i), '90');

      const submitButton = screen.getByRole('button', { name: /see my results/i });
      await waitFor(() => expect(submitButton).toBeEnabled());
      await user.click(submitButton);

      // Wait for results page
      await waitFor(() => {
        expect(screen.getByText(/25%/)).toBeInTheDocument();
      });

      // Dark mode should still be enabled
      expect(localStorage.getItem('darkMode')).toBe('true');
    });

    it('should allow theme toggle on any page', async () => {
      const user = userEvent.setup();

      render(
        <ThemeProvider>
          <App />
        </ThemeProvider>
      );

      // Fill and submit to get to results
      await user.click(screen.getByRole('radio', { name: 'Male' }));
      await user.type(screen.getByLabelText(/body fat %/i), '25');
      await user.type(screen.getByLabelText(/bmi/i), '28');
      await user.type(screen.getByLabelText(/daily calorie target/i), '1500');
      await user.type(screen.getByLabelText(/cups of water per day/i), '8');
      await user.type(screen.getByLabelText(/weekly weight loss goal/i), '20');
      await user.type(screen.getByLabelText(/days to see results/i), '90');

      const submitButton = screen.getByRole('button', { name: /see my results/i });
      await waitFor(() => expect(submitButton).toBeEnabled());
      await user.click(submitButton);

      await waitFor(() => {
        expect(screen.getByText(/25%/)).toBeInTheDocument();
      });

      // toggle dark mode on results page
      const themeToggle = screen.getByRole('button', { name: /toggle dark mode/i });
      await user.click(themeToggle);

      expect(localStorage.getItem('darkMode')).toBe('true');
    });
  });

  describe('Form Data Persistence', () => {
    it('should maintain form data throughout navigation', async () => {
      const user = userEvent.setup();

      render(
        <ThemeProvider>
          <App />
        </ThemeProvider>
      );

      // Submit form with specific data
      await user.click(screen.getByRole('radio', { name: 'Female' }));
      await user.type(screen.getByLabelText(/body fat %/i), '30');
      await user.type(screen.getByLabelText(/bmi/i), '32');
      await user.type(screen.getByLabelText(/daily calorie target/i), '1400');
      await user.type(screen.getByLabelText(/cups of water per day/i), '6');
      await user.type(screen.getByLabelText(/weekly weight loss goal/i), '15');
      await user.type(screen.getByLabelText(/days to see results/i), '60');

      const submitButton = screen.getByRole('button', { name: /see my results/i });
      await waitFor(() => expect(submitButton).toBeEnabled());
      await user.click(submitButton);

      // Verify data on results page
      await waitFor(() => {
        expect(screen.getByText(/30%/)).toBeInTheDocument();
      });

      // Navigate to BMI page
      await user.click(screen.getByRole('button', { name: /next/i }));

      // Verify BMI data
      await waitFor(() => {
        expect(screen.getByText(/32/)).toBeInTheDocument();
      });

      // Navigate to Calories page
      await user.click(screen.getByRole('button', { name: /next/i }));

      // Verify Calorie data
      await waitFor(() => {
        expect(screen.getByText(/1400/i)).toBeInTheDocument();
      });
    });
  });

  describe('Error Handling', () => {
    it('should not crash with invalid form data', async () => {
      const user = userEvent.setup();

      render(
        <ThemeProvider>
          <App />
        </ThemeProvider>
      );

      // Try submitting without filling form
      const submitButton = screen.getByRole('button', { name: /see my results/i });
      expect(submitButton).toBeDisabled();

      // Fill form with edge case values
      await user.click(screen.getByRole('radio', { name: 'Male' }));
      await user.type(screen.getByLabelText(/body fat %/i), '100');
      await user.type(screen.getByLabelText(/bmi/i), '100');
      await user.type(screen.getByLabelText(/daily calorie target/i), '5000');
      await user.type(screen.getByLabelText(/cups of water per day/i), '20');
      await user.type(screen.getByLabelText(/weekly weight loss goal/i), '100');
      await user.type(screen.getByLabelText(/days to see results/i), '365');

      await waitFor(() => expect(submitButton).toBeEnabled());
      await user.click(submitButton);

      // Should still navigate (even with extreme values)
      await waitFor(() => {
        expect(screen.getByText(/100%/)).toBeInTheDocument();
      });
    });
  });

  describe('Accessibility', () => {
    it('should have proper focus management', async () => {
      const user = userEvent.setup();

      render(
        <ThemeProvider>
          <App />
        </ThemeProvider>
      );

      // Tab to theme toggle button first
      await user.tab();
      expect(screen.getByRole('button', { name: /toggle dark mode/i })).toHaveFocus();

      // Tab to first form input (male radio)
      await user.tab();
      const maleRadio = screen.getByRole('radio', { name: 'Male' });
      expect(maleRadio).toHaveFocus();
    });

    it('should have proper ARIA labels throughout', () => {
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


