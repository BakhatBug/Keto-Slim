import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ThemeProvider } from '../../contexts/ThemeContext';
import FinalPlanPage from '../../components/FinalPlanPage';
import ProgressGrid from '../../components/sections/ProgressGrid';
import BenefitsChecklist from '../../components/sections/BenefitsChecklist';
import ToolsSection from '../../components/sections/ToolsSection';
import TrustBadges from '../../components/sections/TrustBadges';
import PaymentOptions from '../../components/sections/PaymentOptions';
import GuaranteeSection from '../../components/sections/GuaranteeSection';

describe('FinalPlanPage and Child Components', () => {
  describe('FinalPlanPage', () => {
    const mockFormData = {
      BodyFat: '25',
      Gender: 'male',
      BMI: '28',
      Calorie: '1500',
      WaterCups: '6',
      WeightLoss: '20',
      DaysToResults: '90',
    };
    const mockOnRestart = vi.fn();

    beforeEach(() => {
      mockOnRestart.mockClear();
      vi.useFakeTimers();
    });

    afterEach(() => {
      vi.useRealTimers();
    });

    it('should render FinalPlanPage with all sections', () => {
      render(
        <ThemeProvider>
          <FinalPlanPage formData={mockFormData} onRestart={mockOnRestart} />
        </ThemeProvider>
      );

      expect(screen.getByText(/ketoslim plan is ready/i)).toBeInTheDocument();
      expect(screen.getByText(/3 month custom keto plan/i)).toBeInTheDocument();
    });

    it('should display before and after body fat percentages', () => {
      render(
        <ThemeProvider>
          <FinalPlanPage formData={mockFormData} onRestart={mockOnRestart} />
        </ThemeProvider>
      );

      expect(screen.getByText(/Now/)).toBeInTheDocument();
      expect(screen.getByText(/6 months/i)).toBeInTheDocument();
    });

    it('should render countdown timer', () => {
      render(
        <ThemeProvider>
          <FinalPlanPage formData={mockFormData} onRestart={mockOnRestart} />
        </ThemeProvider>
      );

      expect(screen.getByText(/discount expires in/i)).toBeInTheDocument();
    });

    it('should countdown timer display initial time', () => {
      render(
        <ThemeProvider>
          <FinalPlanPage formData={mockFormData} onRestart={mockOnRestart} />
        </ThemeProvider>
      );

      // Initial time should be 10:00
      expect(screen.getByText(/10:00/)).toBeInTheDocument();
    });

    it('should display payment options', () => {
      render(
        <ThemeProvider>
          <FinalPlanPage formData={mockFormData} onRestart={mockOnRestart} />
        </ThemeProvider>
      );

      expect(screen.getByText(/3 payments of/i)).toBeInTheDocument();
      expect(screen.getByText(/1 payment of/i)).toBeInTheDocument();
    });

    it('should render payment options that can be clicked', () => {
      render(
        <ThemeProvider>
          <FinalPlanPage formData={mockFormData} onRestart={mockOnRestart} />
        </ThemeProvider>
      );

      const threePaymentOption = screen.getByText(/3 payments of/i).closest('div');
      expect(threePaymentOption).toBeInTheDocument();
    });

    it('should render checkout button', () => {
      render(
        <ThemeProvider>
          <FinalPlanPage formData={mockFormData} onRestart={mockOnRestart} />
        </ThemeProvider>
      );

      const buyButton = screen.getByRole('button', { name: /continue to checkout/i });
      expect(buyButton).toBeInTheDocument();
    });

    it('should render guarantee section', () => {
      render(
        <ThemeProvider>
          <FinalPlanPage formData={mockFormData} onRestart={mockOnRestart} />
        </ThemeProvider>
      );

      expect(screen.getByText(/money back guarantee/i)).toBeInTheDocument();
    });
  });

  describe('ProgressGrid', () => {
    it('should render progress comparison', () => {
      render(
        <ThemeProvider>
          <ProgressGrid />
        </ThemeProvider>
      );

      const bodyFatElements = screen.getAllByText(/body fat/i);
      expect(bodyFatElements.length).toBeGreaterThan(0);
      const energyLevelsElements = screen.getAllByText(/energy levels/i);
      expect(energyLevelsElements.length).toBeGreaterThan(0);
      const metabolismElements = screen.getAllByText(/metabolism speed/i);
      expect(metabolismElements.length).toBeGreaterThan(0);
    });

    it('should show progress bars', () => {
      const { container } = render(
        <ThemeProvider>
          <ProgressGrid />
        </ThemeProvider>
      );

      const progressBars = container.querySelectorAll('.w-full.h-2');
      expect(progressBars.length).toBeGreaterThan(0);
    });
  });

  describe('BenefitsChecklist', () => {
    it('should render benefits list', () => {
      render(
        <ThemeProvider>
          <BenefitsChecklist />
        </ThemeProvider>
      );

      expect(screen.getByText(/improving digestion/i)).toBeInTheDocument();
      expect(screen.getByText(/toning muscles/i)).toBeInTheDocument();
      expect(screen.getByText(/mental wellness reset/i)).toBeInTheDocument();
      expect(screen.getByText(/physical endurance boost/i)).toBeInTheDocument();
    });

    it('should render checkmarks for each benefit', () => {
      const { container } = render(
        <ThemeProvider>
          <BenefitsChecklist />
        </ThemeProvider>
      );

      const checkmarks = container.querySelectorAll('li');
      expect(checkmarks.length).toBe(4);
    });
  });

  describe('ToolsSection', () => {
    const phoneImage = '/test-phone.webp';

    it('should render tools section heading', () => {
      render(
        <ThemeProvider>
          <ToolsSection phoneImage={phoneImage} />
        </ThemeProvider>
      );

      expect(screen.getByText(/get all the right tools/i)).toBeInTheDocument();
    });

    it('should render all tool items', () => {
      render(
        <ThemeProvider>
          <ToolsSection phoneImage={phoneImage} />
        </ThemeProvider>
      );

      expect(screen.getByText(/daily custom meal plan/i)).toBeInTheDocument();
      expect(screen.getByText(/done-for-you grocery lists/i)).toBeInTheDocument();
      expect(screen.getByText(/overwhelm-free delicious recipes/i)).toBeInTheDocument();
      expect(screen.getByText(/weekly tips & guidance/i)).toBeInTheDocument();
    });

    it('should render phone image', () => {
      render(
        <ThemeProvider>
          <ToolsSection phoneImage={phoneImage} />
        </ThemeProvider>
      );

      const image = screen.getByRole('img');
      expect(image).toHaveAttribute('src', phoneImage);
    });
  });

  describe('TrustBadges', () => {
    const pmcLogo = '/test-pmc.svg';
    const mayoLogo = '/test-mayo.webp';

    it('should render trust section heading', () => {
      render(
        <ThemeProvider>
          <TrustBadges pmcLogo={pmcLogo} mayoLogo={mayoLogo} />
        </ThemeProvider>
      );

      expect(screen.getByText(/trusted by health & nutrition professionals/i)).toBeInTheDocument();
    });

    it('should render PMC logo', () => {
      render(
        <ThemeProvider>
          <TrustBadges pmcLogo={pmcLogo} mayoLogo={mayoLogo} />
        </ThemeProvider>
      );

      const pmcImage = screen.getByAltText(/pmc pubmed central/i);
      expect(pmcImage).toBeInTheDocument();
      expect(pmcImage).toHaveAttribute('src', pmcLogo);
    });

    it('should render Mayo Clinic logo', () => {
      render(
        <ThemeProvider>
          <TrustBadges pmcLogo={pmcLogo} mayoLogo={mayoLogo} />
        </ThemeProvider>
      );

      const mayoImage = screen.getByAltText(/mayo clinic/i);
      expect(mayoImage).toBeInTheDocument();
      expect(mayoImage).toHaveAttribute('src', mayoLogo);
    });

    it('should render source links', () => {
      render(
        <ThemeProvider>
          <TrustBadges pmcLogo={pmcLogo} mayoLogo={mayoLogo} />
        </ThemeProvider>
      );

      const sourceLinks = screen.getAllByText(/source/i);
      expect(sourceLinks.length).toBeGreaterThan(0);
    });
  });

  describe('PaymentOptions', () => {
    const mockOnPaymentChange = vi.fn();

    it('should render both payment options', () => {
      render(
        <ThemeProvider>
          <PaymentOptions selectedPayment="1payment" onPaymentChange={mockOnPaymentChange} />
        </ThemeProvider>
      );

      expect(screen.getByText(/3 payments of/i)).toBeInTheDocument();
      expect(screen.getByText(/1 payment of/i)).toBeInTheDocument();
    });

    it('should call onPaymentChange when option is clicked', async () => {
      const user = userEvent.setup();
      render(
        <ThemeProvider>
          <PaymentOptions selectedPayment="1payment" onPaymentChange={mockOnPaymentChange} />
        </ThemeProvider>
      );

      const threePaymentOption = screen.getByText(/3 payments of/i).closest('div');
      if (threePaymentOption) {
        await user.click(threePaymentOption);
      }

      expect(mockOnPaymentChange).toHaveBeenCalledWith('3payments');
    });

    it('should render selected payment option', () => {
      render(
        <ThemeProvider>
          <PaymentOptions selectedPayment="3payments" onPaymentChange={mockOnPaymentChange} />
        </ThemeProvider>
      );

      // Verify payment option exists
      const threePaymentDiv = screen.getByText(/3 payments of/i).closest('div');
      expect(threePaymentDiv).toBeInTheDocument();
    });

    it('should show most popular badge on 3-payment option', () => {
      render(
        <ThemeProvider>
          <PaymentOptions selectedPayment="1payment" onPaymentChange={mockOnPaymentChange} />
        </ThemeProvider>
      );

      expect(screen.getByText(/most popular/i)).toBeInTheDocument();
    });
  });

  describe('GuaranteeSection', () => {
    const stampImage = '/test-stamp.png';

    it('should render guarantee heading', () => {
      render(
        <ThemeProvider>
          <GuaranteeSection stampImage={stampImage} />
        </ThemeProvider>
      );

      expect(screen.getByText(/money back guarantee/i)).toBeInTheDocument();
    });

    it('should render stamp image', () => {
      render(
        <ThemeProvider>
          <GuaranteeSection stampImage={stampImage} />
        </ThemeProvider>
      );

      const image = screen.getByAltText(/60 day money back guarantee/i);
      expect(image).toBeInTheDocument();
      expect(image).toHaveAttribute('src', stampImage);
    });

    it('should render guarantee terms', () => {
      render(
        <ThemeProvider>
          <GuaranteeSection stampImage={stampImage} />
        </ThemeProvider>
      );

      expect(screen.getByText(/we are confident/i)).toBeInTheDocument();
      expect(screen.getByText(/60 days/i)).toBeInTheDocument();
    });
  });
});
