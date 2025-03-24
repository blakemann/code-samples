import InputText from './index';
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

const harness = new TestHarness(InputText, {
  mountOptions: {
    props: {
      label: 'Mock Label',
    },
  },
});

describe('InputText', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('props', () => {
    describe('type', () => {
      it('sets the `type` attribute of the input element', () => {
        // Act
        const { queryByTestId } = harness.render({
          props: { type: 'email' },
        });
        // Assert
        const input = queryByTestId('input');
        expect(input.getAttribute('type')).toBe('email');
      });
    });

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
          props: { value: 'Mock value' },
        });
        // Assert
        const input = queryByTestId('input');
        expect(input.value).toBe('Mock value');
      });

      it('is used to show current length in character counter', () => {
        // Act
        const { queryByTestId } = harness.render({
          props: { value: 'Mock value', maxlength: 100 },
          shallow: false,
        });
        // Assert
        const characterCounter = queryByTestId('characterCounter');
        expect(characterCounter.innerText).toContain('10 / 100');
      });

      it('causes character counter `over-limit` style when its length exceeds max', () => {
        // Act
        const { queryByTestId } = harness.render({
          props: { value: 'Mock value', maxlength: 5 },
          shallow: false,
        });
        // Assert
        const characterCounter = queryByTestId('characterCounter');
        expect(characterCounter.classList.toString()).toContain('--over-limit');
      });

      it('does not cause character counter `over-limit` style when its length is less than max', () => {
        // Act
        const { queryByTestId } = harness.render({
          props: { value: 'Mock value', maxlength: 15 },
          shallow: false,
        });
        // Assert
        const characterCounter = queryByTestId('characterCounter');
        expect(characterCounter.classList.toString()).not.toContain('--over-limit');
      });
    });

    describe('maxlength', () => {
      it('causes character counter to render if set', () => {
        // Act
        const { queryByTestId } = harness.render({
          props: { maxlength: 20 },
          shallow: false,
        });
        // Assert
        const characterCounter = queryByTestId('characterCounter');
        expect(characterCounter).not.toBeNull();
        expect(characterCounter.innerText).toContain('0 / 20');
      });

      it('does not cause character counter to render if not set', () => {
        // Act
        const { queryByTestId } = harness.render({
          props: { maxlength: null },
          shallow: false,
        });
        // Assert
        const characterCounter = queryByTestId('characterCounter');
        expect(characterCounter).toBeNull();
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
    });

    describe('onUpdateValue', () => {
      it('is called when input element `input` event occurs', async () => {
        const onUpdateValue = vi.fn();
        const { queryByTestId } = harness.render({
          props: { onUpdateValue },
        });
        const input = queryByTestId('input');
        // Act
        input.value = 'Mock value';
        const event = new Event('input', { bubbles: true });
        input.dispatchEvent(event);
        // Assert
        expect(onUpdateValue).toHaveBeenCalledWith('Mock value');
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
