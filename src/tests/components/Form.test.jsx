import { describe, it, expect, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ThemeProvider } from '../../contexts/ThemeContext';
import Form from '../../components/form';

describe('Form Component', () => {
  const mockOnSubmit = vi.fn();

  const renderForm = () => {
    return render(
      <ThemeProvider>
        <Form onSubmit={mockOnSubmit} />
      </ThemeProvider>
    );
  };

  beforeEach(() => {
    mockOnSubmit.mockClear();
  });

  describe('Rendering', () => {
    it('should render all form fields', () => {
      renderForm();

      expect(screen.getByLabelText(/gender/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/body fat percentage/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/bmi/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/daily calorie target/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/water intake/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/desired weight loss/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/days to see results/i)).toBeInTheDocument();
    });

    it('should render submit button as disabled initially', () => {
      renderForm();

      const submitButton = screen.getByRole('button', { name: /see my results/i });
      expect(submitButton).toBeDisabled();
    });

    it('should show helper text when form is incomplete', () => {
      renderForm();

      expect(
        screen.getByText(/please fill out all required fields to enable the button/i)
      ).toBeInTheDocument();
    });
  });

  describe('Form Validation', () => {
    it('should enable submit button when all fields are valid', async () => {
      const user = userEvent.setup();
      renderForm();

      // Fill in all fields
      const maleRadio = screen.getByLabelText(/male/i);
      await user.click(maleRadio);

      const bodyFatInput = screen.getByLabelText(/body fat percentage/i);
      await user.type(bodyFatInput, '25');

      const bmiInput = screen.getByLabelText(/bmi/i);
      await user.type(bmiInput, '28');

      const calorieInput = screen.getByLabelText(/daily calorie target/i);
      await user.type(calorieInput, '1500');

      const waterInput = screen.getByLabelText(/water intake/i);
      await user.type(waterInput, '8');

      const weightLossInput = screen.getByLabelText(/desired weight loss/i);
      await user.type(weightLossInput, '20');

      const daysInput = screen.getByLabelText(/days to see results/i);
      await user.type(daysInput, '90');

      await waitFor(() => {
        const submitButton = screen.getByRole('button', { name: /see my results/i });
        expect(submitButton).toBeEnabled();
      });
    });

    it('should show success message when form is complete', async () => {
      const user = userEvent.setup();
      renderForm();

      // Fill all fields
      await user.click(screen.getByLabelText(/female/i));
      await user.type(screen.getByLabelText(/body fat percentage/i), '30');
      await user.type(screen.getByLabelText(/bmi/i), '30');
      await user.type(screen.getByLabelText(/daily calorie target/i), '1400');
      await user.type(screen.getByLabelText(/water intake/i), '6');
      await user.type(screen.getByLabelText(/desired weight loss/i), '15');
      await user.type(screen.getByLabelText(/days to see results/i), '60');

      await waitFor(() => {
        expect(
          screen.getByText(/all fields completed! ready to see my results/i)
        ).toBeInTheDocument();
      });
    });
  });

  describe('Form Submission', () => {
    it('should call onSubmit with correct data when form is submitted', async () => {
      const user = userEvent.setup();
      renderForm();

      // Fill in form
      await user.click(screen.getByLabelText(/male/i));
      await user.type(screen.getByLabelText(/body fat percentage/i), '25');
      await user.type(screen.getByLabelText(/bmi/i), '28');
      await user.type(screen.getByLabelText(/daily calorie target/i), '1500');
      await user.type(screen.getByLabelText(/water intake/i), '8');
      await user.type(screen.getByLabelText(/desired weight loss/i), '20');
      await user.type(screen.getByLabelText(/days to see results/i), '90');

      const submitButton = screen.getByRole('button', { name: /see my results/i });
      await waitFor(() => expect(submitButton).toBeEnabled());

      await user.click(submitButton);

      await waitFor(() => {
        expect(mockOnSubmit).toHaveBeenCalledTimes(1);
        expect(mockOnSubmit).toHaveBeenCalledWith({
          Gender: 'male',
          BodyFat: '25',
          BMI: '28',
          Calorie: '1500',
          WaterCups: '8',
          WeightLoss: '20',
          DaysToResults: '90',
        });
      });
    });

    it('should not call onSubmit when form is incomplete', async () => {
      const user = userEvent.setup();
      renderForm();

      const submitButton = screen.getByRole('button', { name: /see my results/i });
      expect(submitButton).toBeDisabled();

      // Try to click disabled button (should not submit)
      await user.click(submitButton);

      expect(mockOnSubmit).not.toHaveBeenCalled();
    });
  });

  describe('Input Validation', () => {
    it('should not enable submit if body fat is 0', async () => {
      const user = userEvent.setup();
      renderForm();

      await user.click(screen.getByLabelText(/male/i));
      await user.type(screen.getByLabelText(/body fat percentage/i), '0');
      await user.type(screen.getByLabelText(/bmi/i), '28');
      await user.type(screen.getByLabelText(/daily calorie target/i), '1500');
      await user.type(screen.getByLabelText(/water intake/i), '8');
      await user.type(screen.getByLabelText(/desired weight loss/i), '20');
      await user.type(screen.getByLabelText(/days to see results/i), '90');

      const submitButton = screen.getByRole('button', { name: /see my results/i });
      expect(submitButton).toBeDisabled();
    });

    it('should not enable submit if calorie is 0', async () => {
      const user = userEvent.setup();
      renderForm();

      await user.click(screen.getByLabelText(/male/i));
      await user.type(screen.getByLabelText(/body fat percentage/i), '25');
      await user.type(screen.getByLabelText(/bmi/i), '28');
      await user.type(screen.getByLabelText(/daily calorie target/i), '0');
      await user.type(screen.getByLabelText(/water intake/i), '8');
      await user.type(screen.getByLabelText(/desired weight loss/i), '20');
      await user.type(screen.getByLabelText(/days to see results/i), '90');

      const submitButton = screen.getByRole('button', { name: /see my results/i });
      expect(submitButton).toBeDisabled();
    });

    it('should not enable submit if days is 0', async () => {
      const user = userEvent.setup();
      renderForm();

      await user.click(screen.getByLabelText(/male/i));
      await user.type(screen.getByLabelText(/body fat percentage/i), '25');
      await user.type(screen.getByLabelText(/bmi/i), '28');
      await user.type(screen.getByLabelText(/daily calorie target/i), '1500');
      await user.type(screen.getByLabelText(/water intake/i), '8');
      await user.type(screen.getByLabelText(/desired weight loss/i), '20');
      await user.type(screen.getByLabelText(/days to see results/i), '0');

      const submitButton = screen.getByRole('button', { name: /see my results/i });
      expect(submitButton).toBeDisabled();
    });
  });

  describe('Gender Selection', () => {
    it('should select male gender', async () => {
      const user = userEvent.setup();
      renderForm();

      const maleRadio = screen.getByLabelText(/male/i);
      await user.click(maleRadio);

      expect(maleRadio).toBeChecked();
    });

    it('should select female gender', async () => {
      const user = userEvent.setup();
      renderForm();

      const femaleRadio = screen.getByLabelText(/female/i);
      await user.click(femaleRadio);

      expect(femaleRadio).toBeChecked();
    });

    it('should switch between genders', async () => {
      const user = userEvent.setup();
      renderForm();

      const maleRadio = screen.getByLabelText(/male/i);
      const femaleRadio = screen.getByLabelText(/female/i);

      await user.click(maleRadio);
      expect(maleRadio).toBeChecked();
      expect(femaleRadio).not.toBeChecked();

      await user.click(femaleRadio);
      expect(femaleRadio).toBeChecked();
      expect(maleRadio).not.toBeChecked();
    });
  });

  describe('Accessibility', () => {
    it('should have proper form labels', () => {
      renderForm();

      const inputs = screen.getAllByRole('textbox');
      inputs.forEach((input) => {
        expect(input).toHaveAccessibleName();
      });
    });

    it('should have proper ARIA attributes', () => {
      const { container } = renderForm();

      const form = container.querySelector('form');
      expect(form).toHaveAttribute('aria-label');
    });
  });
});
