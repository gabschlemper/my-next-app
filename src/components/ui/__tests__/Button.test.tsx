import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Button } from '../Button';

/**
 * Button Component Tests
 *
 * Testing Strategy:
 * - Accessibility compliance (ARIA attributes, keyboard navigation)
 * - Visual states and variants
 * - Loading states and disabled states
 * - Event handling
 * - Screen reader compatibility
 */

describe('Button Component', () => {
  describe('Accessibility', () => {
    it('should have proper ARIA attributes when disabled', () => {
      render(<Button disabled>Disabled Button</Button>);
      const button = screen.getByRole('button', { name: /disabled button/i });

      expect(button).toHaveAttribute('aria-disabled', 'true');
      expect(button).toBeDisabled();
    });

    it('should have proper ARIA attributes when loading', () => {
      render(<Button isLoading>Loading Button</Button>);
      const button = screen.getByRole('button');

      expect(button).toHaveAttribute('aria-disabled', 'true');
      expect(button).toBeDisabled();
      expect(screen.getByText('Loading...')).toBeInTheDocument();
    });

    it('should be focusable with keyboard navigation', async () => {
      const user = userEvent.setup();
      render(<Button>Focusable Button</Button>);

      const button = screen.getByRole('button', { name: /focusable button/i });

      await user.tab();
      expect(button).toHaveFocus();
    });

    it('should be clickable with Enter and Space keys', async () => {
      const user = userEvent.setup();
      const handleClick = jest.fn();

      render(<Button onClick={handleClick}>Keyboard Button</Button>);
      const button = screen.getByRole('button', { name: /keyboard button/i });

      button.focus();
      await user.keyboard('{Enter}');
      expect(handleClick).toHaveBeenCalledTimes(1);

      await user.keyboard(' ');
      expect(handleClick).toHaveBeenCalledTimes(2);
    });
  });

  describe('Variants and States', () => {
    it('should render primary variant by default', () => {
      render(<Button>Primary Button</Button>);
      const button = screen.getByRole('button', { name: /primary button/i });

      expect(button).toHaveClass('bg-blue-600', 'text-white');
    });

    it('should render secondary variant', () => {
      render(<Button variant="secondary">Secondary Button</Button>);
      const button = screen.getByRole('button', { name: /secondary button/i });

      expect(button).toHaveClass('bg-gray-100', 'text-gray-900');
    });

    it('should render outline variant', () => {
      render(<Button variant="outline">Outline Button</Button>);
      const button = screen.getByRole('button', { name: /outline button/i });

      expect(button).toHaveClass('border', 'border-gray-300', 'bg-transparent');
    });

    it('should render different sizes', () => {
      const { rerender } = render(<Button size="sm">Small Button</Button>);
      expect(screen.getByRole('button')).toHaveClass('h-8', 'px-3', 'text-sm');

      rerender(<Button size="lg">Large Button</Button>);
      expect(screen.getByRole('button')).toHaveClass('h-12', 'px-8', 'text-lg');
    });
  });

  describe('Loading State', () => {
    it('should show loading spinner when isLoading is true', () => {
      render(<Button isLoading>Loading Button</Button>);

      expect(screen.getByRole('button')).toBeDisabled();
      expect(screen.getByText('Loading...')).toBeInTheDocument();
      // Check for spinner by looking for the SVG element
      expect(document.querySelector('svg')).toBeInTheDocument();
    });

    it('should hide button text when loading', () => {
      render(<Button isLoading>Button Text</Button>);

      const buttonText = screen.getByText('Button Text');
      expect(buttonText).toHaveClass('sr-only');
    });
  });

  describe('Event Handling', () => {
    it('should call onClick when clicked', async () => {
      const user = userEvent.setup();
      const handleClick = jest.fn();

      render(<Button onClick={handleClick}>Click Me</Button>);
      const button = screen.getByRole('button', { name: /click me/i });

      await user.click(button);
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('should not call onClick when disabled', async () => {
      const user = userEvent.setup();
      const handleClick = jest.fn();

      render(
        <Button onClick={handleClick} disabled>
          Disabled Button
        </Button>
      );
      const button = screen.getByRole('button', { name: /disabled button/i });

      await user.click(button);
      expect(handleClick).not.toHaveBeenCalled();
    });

    it('should not call onClick when loading', async () => {
      const user = userEvent.setup();
      const handleClick = jest.fn();

      render(
        <Button onClick={handleClick} isLoading>
          Loading Button
        </Button>
      );
      const button = screen.getByRole('button');

      await user.click(button);
      expect(handleClick).not.toHaveBeenCalled();
    });
  });
});
