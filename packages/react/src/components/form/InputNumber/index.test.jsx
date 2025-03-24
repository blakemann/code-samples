import InputNumber from './index';
import TestHarness from '@/build/vitest/ReactTestHarness';

vi.mock('@/react/utilities', async () => ({
  ...await vi.importActual('@/react/utilities'),
  getUniqueId: vi.fn().mockImplementation((prefix) => `${prefix}-mock-id`),
}));

const renderInputContainer = vi.fn();

vi.mock('@/react/components/form/InputContainer', () => ({
  default: (props) => {
    renderInputContainer({ props });
    return <div data-mock-input-container="">{props.children} {props.validationMeta}</div>;
  },
}));

const harness = new TestHarness(InputNumber, {
  mountOptions: {
    props: {
      label: 'Mock Label',
    },
  },
});

describe('InputNumber', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('props', () => {
    describe('label', () => {
      it('sets the `label` prop of the InputContainer component', () => {
        // Act
        harness.render({
          props: { label: 'Mock Label' },
        });
        // Assert
        expect(renderInputContainer).toHaveBeenCalledWith({ props: expect.objectContaining({ label: 'Mock Label' }) });
      });
    });

    describe('labelParens', () => {
      it('sets the `labelParens` prop of the InputContainer component', () => {
        // Act
        harness.render({
          props: { labelParens: 'optional' },
        });
        // Assert
        expect(renderInputContainer).toHaveBeenCalledWith({ props: expect.objectContaining({ labelParens: 'optional' }) });
      });
    });

    describe('description', () => {
      it('sets the `description` prop of the InputContainer component', () => {
        // Act
        harness.render({
          props: { description: 'Mock description' },
        });
        // Assert
        expect(renderInputContainer).toHaveBeenCalledWith({ props: expect.objectContaining({ description: 'Mock description' }) });
      });
    });

    describe('value', () => {
      it('sets the `value` attribute of the input element', () => {
        // Act
        const { queryByTestId } = harness.render({
          props: { value: 15 },
        });
        // Assert
        const input = queryByTestId('input');
        expect(input.value).toBe('15');
      });
    });

    describe('error', () => {
      it('sets `error` prop of InputContainer component', () => {
        // Act
        harness.render({
          props: { error: 'Mock error' },
        });
        // Assert
        expect(renderInputContainer).toHaveBeenCalledWith({ props: expect.objectContaining({ error: 'Mock error' }) });
      });
    });

    describe('disabled', () => {
      it('sets disabled attributes on input element', () => {
        // Act
        const { queryByTestId } = harness.render({
          props: { disabled: true },
        });
        // Assert
        const input = queryByTestId('input');
        expect(input.getAttribute('disabled')).not.toBeUndefined();
        expect(input.getAttribute('aria-disabled')).not.toBeUndefined();
      });

      it('prevents increment/decrement buttons from rendering when true', () => {
        // Act
        const { queryByTestId } = harness.render({
          props: { disabled: true },
        });
        // Assert
        expect(queryByTestId('decrementButton')).toBeNull();
        expect(queryByTestId('incrementButton')).toBeNull();
      });
    });

    describe('showStepButtons', () => {
      it('causes increment/decrement buttons to render when true', () => {
        // Act
        const { queryByTestId } = harness.render({
          props: { showStepButtons: true },
        });
        // Assert
        expect(queryByTestId('decrementButton')).not.toBeNull();
        expect(queryByTestId('incrementButton')).not.toBeNull();
      });

      it('prevents increment/decrement buttons from rendering when false', () => {
        // Act
        const { queryByTestId } = harness.render({
          props: { showStepButtons: false },
        });
        // Assert
        expect(queryByTestId('decrementButton')).toBeNull();
        expect(queryByTestId('incrementButton')).toBeNull();
      });
    });

    describe('min', () => {
      it('sets `aria-valuemin` attribute on input element', () => {
        // Act
        const { queryByTestId } = harness.render({
          props: { min: 10 },
        });
        // Assert
        const input = queryByTestId('input');
        expect(input.getAttribute('aria-valuemin')).toBe('10');
      });

      it('prevents a value below provided from being entered', async () => {
        const onUpdateValue = vi.fn();
        const { queryByTestId } = harness.render({
          props: { min: 10, onUpdateValue },
        });
        const input = queryByTestId('input');
        // Act
        input.value = '5';
        const event = new Event('input', { bubbles: true });
        input.dispatchEvent(event);
        // Assert
        expect(onUpdateValue).toHaveBeenCalledWith(10);
      });
    });

    describe('max', () => {
      it('sets `aria-valuemax` attribute on input element', () => {
        // Act
        const { queryByTestId } = harness.render({
          props: { max: 10 },
        });
        // Assert
        const input = queryByTestId('input');
        expect(input.getAttribute('aria-valuemax')).toBe('10');
      });

      it('prevents a value above provided from being entered', async () => {
        const onUpdateValue = vi.fn();
        const { queryByTestId } = harness.render({
          props: { max: 10, onUpdateValue },
        });
        const input = queryByTestId('input');
        // Act
        input.value = '15';
        const event = new Event('input', { bubbles: true });
        input.dispatchEvent(event);
        // Assert
        expect(onUpdateValue).toHaveBeenCalledWith(10);
      });
    });

    describe('step', () => {
      it('controls the increment/decrement amount', async () => {
        const onUpdateValue = vi.fn();
        // Act
        const { queryByTestId } = harness.render({
          props: { step: 10, value: 10, onUpdateValue },
        });
        // Assert
        const incrementButton = queryByTestId('incrementButton');
        const decrementButton = queryByTestId('decrementButton');
        incrementButton.click();
        expect(onUpdateValue).toHaveBeenCalledWith(20);
        harness.updateProps({ value: 20 });
        decrementButton.click();
        expect(onUpdateValue).toHaveBeenNthCalledWith(2, 10);
      });
    });

    describe('onUpdateValue', () => {
      it('is called when input element `input` event occurs', async () => {
        const onUpdateValue = vi.fn();
        const { queryByTestId } = harness.render({
          props: { onUpdateValue },
        });
        const input = queryByTestId('input');
        // Act
        input.value = '20';
        const event = new Event('input', { bubbles: true });
        input.dispatchEvent(event);
        // Assert
        expect(onUpdateValue).toHaveBeenCalledWith(20);
      });
    });

    describe('onFocus', () => {
      it('is called when input element `focus` event occurs', async () => {
        const onFocus = vi.fn();
        const { queryByTestId } = harness.render({
          props: { onFocus },
        });
        const input = queryByTestId('input');
        // Act
        input.focus();
        // Assert
        expect(onFocus).toHaveBeenCalled();
      });
    });

    describe('onBlur', () => {
      it('is called when input element `focus` event occurs', async () => {
        const onBlur = vi.fn();
        const { queryByTestId } = harness.render({
          props: { onBlur },
        });
        const input = queryByTestId('input');
        input.focus();
        // Act
        input.blur();
        // Assert
        expect(onBlur).toHaveBeenCalled();
      });
    });
  });

  describe('lifecycle', () => {
    describe('setup', () => {
      it('sets `uid` prop of InputContainer component', () => {
        // Act
        harness.render();
        // Assert
        expect(renderInputContainer).toHaveBeenCalledWith({ props: expect.objectContaining({ uid: 'input-mock-id' }) });
      });
    });
  });
});
