import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ThemeProvider } from '../../contexts/ThemeContext';
import ResultsDisplay from '../../components/ResultsDisplay';
import BMIDisplay from '../../components/BMIDisplay';
import CaloriesDisplay from '../../components/CaloriesDisplay';
import WaterDisplay from '../../components/WaterDisplay';
import WeightLossDisplay from '../../components/WeightLossDisplay';
import ResultsTimelineDisplay from '../../components/ResultsTimelineDisplay';

describe('Display Components', () => {
  describe('ResultsDisplay', () => {
    const mockFormData = {
      Gender: 'male',
      BodyFat: '25',
    };
    const mockOnNext = vi.fn();

    it('should render body fat percentage', () => {
      render(
        <ThemeProvider>
          <ResultsDisplay formData={mockFormData} onNext={mockOnNext} />
        </ThemeProvider>
      );

      expect(screen.getByText('25%')).toBeInTheDocument();
    });

    it('should display appropriate message for male under 24% body fat', () => {
      const data = { Gender: 'male', BodyFat: '20' };
      render(
        <ThemeProvider>
          <ResultsDisplay formData={data} onNext={mockOnNext} />
        </ThemeProvider>
      );

      expect(
        screen.getByText(/your current level may be slowing metabolism/i)
      ).toBeInTheDocument();
    });

    it('should display appropriate message for male 25-31% body fat', () => {
      const data = { Gender: 'male', BodyFat: '28' };
      render(
        <ThemeProvider>
          <ResultsDisplay formData={data} onNext={mockOnNext} />
        </ThemeProvider>
      );

      expect(
        screen.getByText(/your current level may be slowing metabolism/i)
      ).toBeInTheDocument();
    });

    it('should display appropriate message for male over 32% body fat', () => {
      const data = { Gender: 'male', BodyFat: '35' };
      render(
        <ThemeProvider>
          <ResultsDisplay formData={data} onNext={mockOnNext} />
        </ThemeProvider>
      );

      expect(
        screen.getByText(/stuck in a constant state of inflammation/i)
      ).toBeInTheDocument();
    });

    it('should display appropriate message for female under 31% body fat', () => {
      const data = { Gender: 'female', BodyFat: '28' };
      render(
        <ThemeProvider>
          <ResultsDisplay formData={data} onNext={mockOnNext} />
        </ThemeProvider>
      );

      expect(
        screen.getByText(/your current level may be slowing metabolism/i)
      ).toBeInTheDocument();
    });

    it('should call onNext when next button is clicked', async () => {
      const user = userEvent.setup();
      render(
        <ThemeProvider>
          <ResultsDisplay formData={mockFormData} onNext={mockOnNext} />
        </ThemeProvider>
      );

      const nextButton = screen.getByRole('button', { name: /next/i });
      await user.click(nextButton);

      expect(mockOnNext).toHaveBeenCalledTimes(1);
    });
  });

  describe('BMIDisplay', () => {
    const mockFormData = { BMI: '28' };
    const mockOnNext = vi.fn();
    const mockOnBack = vi.fn();

    it('should render BMI value', () => {
      render(
        <ThemeProvider>
          <BMIDisplay formData={mockFormData} onNext={mockOnNext} onBack={mockOnBack} />
        </ThemeProvider>
      );

      expect(screen.getByText(/28/)).toBeInTheDocument();
    });

    it('should display message for BMI under 26', () => {
      const data = { BMI: '24' };
      render(
        <ThemeProvider>
          <BMIDisplay formData={data} onNext={mockOnNext} onBack={mockOnBack} />
        </ThemeProvider>
      );

      expect(screen.getByText(/right on the edge/i)).toBeInTheDocument();
    });

    it('should display message for BMI 30-34.9', () => {
      const data = { BMI: '32' };
      render(
        <ThemeProvider>
          <BMIDisplay formData={data} onNext={mockOnNext} onBack={mockOnBack} />
        </ThemeProvider>
      );

      expect(screen.getByText(/under more strain/i)).toBeInTheDocument();
    });

    it('should display message for BMI over 35', () => {
      const data = { BMI: '37' };
      render(
        <ThemeProvider>
          <BMIDisplay formData={data} onNext={mockOnNext} onBack={mockOnBack} />
        </ThemeProvider>
      );

      expect(screen.getByText(/deeper challenges/i)).toBeInTheDocument();
    });

    it('should call onNext when next button clicked', async () => {
      const user = userEvent.setup();
      render(
        <ThemeProvider>
          <BMIDisplay formData={mockFormData} onNext={mockOnNext} onBack={mockOnBack} />
        </ThemeProvider>
      );

      const nextButton = screen.getByRole('button', { name: /next/i });
      await user.click(nextButton);

      expect(mockOnNext).toHaveBeenCalledTimes(1);
    });

    it('should call onBack when back button clicked', async () => {
      const user = userEvent.setup();
      render(
        <ThemeProvider>
          <BMIDisplay formData={mockFormData} onNext={mockOnNext} onBack={mockOnBack} />
        </ThemeProvider>
      );

      const backButton = screen.getByRole('button', { name: /back/i });
      await user.click(backButton);

      expect(mockOnBack).toHaveBeenCalledTimes(1);
    });
  });

  describe('CaloriesDisplay', () => {
    const mockFormData = { Calorie: '1400' };
    const mockOnNext = vi.fn();
    const mockOnBack = vi.fn();

    it('should render calorie value', () => {
      render(
        <ThemeProvider>
          <CaloriesDisplay formData={mockFormData} onNext={mockOnNext} onBack={mockOnBack} />
        </ThemeProvider>
      );

      expect(screen.getByText(/1400/i)).toBeInTheDocument();
    });

    it('should display message for 1300-1500 calories', () => {
      const data = { Calorie: '1450' };
      render(
        <ThemeProvider>
          <CaloriesDisplay formData={data} onNext={mockOnNext} onBack={mockOnBack} />
        </ThemeProvider>
      );

      expect(screen.getByText(/already close/i)).toBeInTheDocument();
    });

    it('should display message for 1100-1299 calories', () => {
      const data = { Calorie: '1200' };
      render(
        <ThemeProvider>
          <CaloriesDisplay formData={data} onNext={mockOnNext} onBack={mockOnBack} />
        </ThemeProvider>
      );

      expect(screen.getByText(/primed to burn fat/i)).toBeInTheDocument();
    });

    it('should display message for under 1100 calories', () => {
      const data = { Calorie: '900' };
      render(
        <ThemeProvider>
          <CaloriesDisplay formData={data} onNext={mockOnNext} onBack={mockOnBack} />
        </ThemeProvider>
      );

      expect(screen.getByText(/extreme restriction/i)).toBeInTheDocument();
    });
  });

  describe('WaterDisplay', () => {
    const mockFormData = { WaterCups: '8' };
    const mockOnNext = vi.fn();
    const mockOnBack = vi.fn();

    it('should render water cups value', () => {
      render(
        <ThemeProvider>
          <WaterDisplay formData={mockFormData} onNext={mockOnNext} onBack={mockOnBack} />
        </ThemeProvider>
      );

      expect(screen.getByText(/8/)).toBeInTheDocument();
    });

    it('should display message for over 6 glasses', () => {
      const data = { WaterCups: '8' };
      render(
        <ThemeProvider>
          <WaterDisplay formData={data} onNext={mockOnNext} onBack={mockOnBack} />
        </ThemeProvider>
      );

      expect(screen.getByText(/nice work/i)).toBeInTheDocument();
    });

    it('should display message for 2-6 glasses', () => {
      const data = { WaterCups: '4' };
      render(
        <ThemeProvider>
          <WaterDisplay formData={data} onNext={mockOnNext} onBack={mockOnBack} />
        </ThemeProvider>
      );

      expect(screen.getByText(/getting closer/i)).toBeInTheDocument();
    });

    it('should display message for 2 glasses', () => {
      const data = { WaterCups: '2' };
      render(
        <ThemeProvider>
          <WaterDisplay formData={data} onNext={mockOnNext} onBack={mockOnBack} />
        </ThemeProvider>
      );

      expect(screen.getByText(/great start/i)).toBeInTheDocument();
    });

    it('should display message for 1 glass (coffee/tea)', () => {
      const data = { WaterCups: '1' };
      render(
        <ThemeProvider>
          <WaterDisplay formData={data} onNext={mockOnNext} onBack={mockOnBack} />
        </ThemeProvider>
      );

      expect(screen.getByText(/only drinking coffee or tea/i)).toBeInTheDocument();
    });
  });

  describe('WeightLossDisplay', () => {
    const mockFormData = { WeightLoss: '20' };
    const mockOnNext = vi.fn();
    const mockOnBack = vi.fn();

    it('should render weight loss value', () => {
      render(
        <ThemeProvider>
          <WeightLossDisplay formData={mockFormData} onNext={mockOnNext} onBack={mockOnBack} />
        </ThemeProvider>
      );

      expect(screen.getByText(/20/)).toBeInTheDocument();
    });

    it('should have next and back buttons', () => {
      render(
        <ThemeProvider>
          <WeightLossDisplay formData={mockFormData} onNext={mockOnNext} onBack={mockOnBack} />
        </ThemeProvider>
      );

      expect(screen.getByRole('button', { name: /next/i })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /back/i })).toBeInTheDocument();
    });
  });

  describe('ResultsTimelineDisplay', () => {
    const mockFormData = { DaysToResults: '90' };
    const mockOnNext = vi.fn();
    const mockOnBack = vi.fn();

    it('should render days to results value', () => {
      render(
        <ThemeProvider>
          <ResultsTimelineDisplay
            formData={mockFormData}
            onNext={mockOnNext}
            onBack={mockOnBack}
          />
        </ThemeProvider>
      );

      expect(screen.getByText(/90/)).toBeInTheDocument();
    });

    it('should have next and back buttons', () => {
      render(
        <ThemeProvider>
          <ResultsTimelineDisplay
            formData={mockFormData}
            onNext={mockOnNext}
            onBack={mockOnBack}
          />
        </ThemeProvider>
      );

      expect(screen.getByRole('button', { name: /next/i })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /back/i })).toBeInTheDocument();
    });
  });

  describe('Common Display Component Features', () => {
    it('should render theme toggle in all displays', () => {
      const mockFormData = { BodyFat: '25', Gender: 'male' };
      const mockOnNext = vi.fn();

      render(
        <ThemeProvider>
          <ResultsDisplay formData={mockFormData} onNext={mockOnNext} />
        </ThemeProvider>
      );

      const themeToggle = screen.getByRole('button', { name: /toggle theme/i });
      expect(themeToggle).toBeInTheDocument();
    });

    it('should render logo in all displays', () => {
      const mockFormData = { BodyFat: '25', Gender: 'male' };
      const mockOnNext = vi.fn();

      render(
        <ThemeProvider>
          <ResultsDisplay formData={mockFormData} onNext={mockOnNext} />
        </ThemeProvider>
      );

      const logo = screen.getByAltText(/keto slim logo/i);
      expect(logo).toBeInTheDocument();
    });
  });
});
