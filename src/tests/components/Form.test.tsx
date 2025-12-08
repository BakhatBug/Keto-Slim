import { describe, it, expect, vi, Mock, beforeEach } from 'vitest';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ThemeProvider } from '../../contexts/ThemeContext';
import Form from '../../components/form';

describe('Form Component', () => {
  const mockOnSubmit: Mock = vi.fn();

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

      expect(screen.getByRole('group', { name: /gender/i })).toBeInTheDocument();
      expect(screen.getByLabelText(/body fat/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/bmi/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/daily calorie target/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/cups of water per day/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/weekly weight loss goal/i)).toBeInTheDocument();
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
      const maleRadio = screen.getByLabelText('Male');
      await user.click(maleRadio);

      const bodyFatInput = screen.getByLabelText(/body fat/i);
      fireEvent.change(bodyFatInput, { target: { value: '25' } });

      const bmiInput = screen.getByLabelText(/bmi/i);
      fireEvent.change(bmiInput, { target: { value: '28' } });

      const calorieInput = screen.getByLabelText(/daily calorie target/i);
      await user.type(calorieInput, '1500');

      const waterInput = screen.getByLabelText(/cups of water per day/i);
      await user.selectOptions(waterInput, '6');

      const weightLossInput = screen.getByLabelText(/weekly weight loss goal/i);
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
      await user.click(screen.getByLabelText('Female'));
      fireEvent.change(screen.getByLabelText(/body fat/i), { target: { value: '30' } });
      fireEvent.change(screen.getByLabelText(/bmi/i), { target: { value: '30' } });
      await user.type(screen.getByLabelText(/daily calorie target/i), '1400');
      await user.selectOptions(screen.getByLabelText(/cups of water per day/i), '6');
      await user.type(screen.getByLabelText(/weekly weight loss goal/i), '15');
      await user.type(screen.getByLabelText(/days to see results/i), '60');

      await waitFor(() => {
        expect(
          screen.getByText('All fields completed! Ready to see your results.')
        ).toBeInTheDocument();
      }, { timeout: 3000 });
    });
  });

  describe('Form Submission', () => {
    it('should call onSubmit with correct data when form is submitted', async () => {
      const user = userEvent.setup();
      renderForm();

      // Fill in form
      await user.click(screen.getByLabelText('Male'));
      fireEvent.change(screen.getByLabelText(/body fat/i), { target: { value: '25' } });
      fireEvent.change(screen.getByLabelText(/bmi/i), { target: { value: '28' } });
      await user.type(screen.getByLabelText(/daily calorie target/i), '1500');
      await user.selectOptions(screen.getByLabelText(/cups of water per day/i), '6');
      await user.type(screen.getByLabelText(/weekly weight loss goal/i), '20');
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
          WaterCups: '6',
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

      await user.click(screen.getByLabelText('Male'));
      fireEvent.change(screen.getByLabelText(/body fat/i), { target: { value: '0' } });
      fireEvent.change(screen.getByLabelText(/bmi/i), { target: { value: '28' } });
      await user.type(screen.getByLabelText(/daily calorie target/i), '1500');
      await user.selectOptions(screen.getByLabelText(/cups of water per day/i), '6');
      await user.type(screen.getByLabelText(/weekly weight loss goal/i), '20');
      await user.type(screen.getByLabelText(/days to see results/i), '90');

      const submitButton = screen.getByRole('button', { name: /see my results/i });
      expect(submitButton).toBeDisabled();
    });

    it('should not enable submit if calorie is 0', async () => {
      const user = userEvent.setup();
      renderForm();

      await user.click(screen.getByLabelText('Male'));
      fireEvent.change(screen.getByLabelText(/body fat/i), { target: { value: '25' } });
      fireEvent.change(screen.getByLabelText(/bmi/i), { target: { value: '28' } });
      await user.type(screen.getByLabelText(/daily calorie target/i), '0');
      await user.selectOptions(screen.getByLabelText(/cups of water per day/i), '6');
      await user.type(screen.getByLabelText(/weekly weight loss goal/i), '20');
      await user.type(screen.getByLabelText(/days to see results/i), '90');

      const submitButton = screen.getByRole('button', { name: /see my results/i });
      expect(submitButton).toBeDisabled();
    });

    it('should not enable submit if days is 0', async () => {
      const user = userEvent.setup();
      renderForm();

      await user.click(screen.getByLabelText('Male'));
      fireEvent.change(screen.getByLabelText(/body fat/i), { target: { value: '25' } });
      fireEvent.change(screen.getByLabelText(/bmi/i), { target: { value: '28' } });
      await user.type(screen.getByLabelText(/daily calorie target/i), '1500');
      await user.selectOptions(screen.getByLabelText(/cups of water per day/i), '6');
      await user.type(screen.getByLabelText(/weekly weight loss goal/i), '20');
      await user.type(screen.getByLabelText(/days to see results/i), '0');

      const submitButton = screen.getByRole('button', { name: /see my results/i });
      expect(submitButton).toBeDisabled();
    });
  });

  describe('Gender Selection', () => {
    it('should select male gender', async () => {
      const user = userEvent.setup();
      renderForm();

      const maleRadio = screen.getByLabelText('Male');
      await user.click(maleRadio);

      expect(maleRadio).toBeChecked();
    });

    it('should select female gender', async () => {
      const user = userEvent.setup();
      renderForm();

      const femaleRadio = screen.getByLabelText('Female');
      await user.click(femaleRadio);

      expect(femaleRadio).toBeChecked();
    });

    it('should switch between genders', async () => {
      const user = userEvent.setup();
      renderForm();

      const maleRadio = screen.getByLabelText('Male');
      const femaleRadio = screen.getByLabelText('Female');

      await user.click(maleRadio);
      expect(maleRadio).toBeChecked();
      expect(femaleRadio).not.toBeChecked();

      await user.click(femaleRadio);
      expect(femaleRadio).toBeChecked();
      expect(maleRadio).not.toBeChecked();
    });
  });

  describe('Accessibility', () => {
    it('should have proper ARIA attributes', () => {
      const { container } = renderForm();

      const form = container.querySelector('form');
      expect(form).toHaveAttribute('aria-label');

      // Verify all inputs have labels
      const numberInputs = screen.getAllByRole('spinbutton');
      numberInputs.forEach((input) => {
        expect(input).toHaveAccessibleName();
      });
    });
  });
});


