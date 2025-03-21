import InputText from './index';
import TestHarness from '@/build/vitest/TestHarness';

vi.mock('@/vue/composables', async () => ({
  ...await vi.importActual('@/vue/composables'),
  useUniqueId: vi.fn().mockImplementation((prefix) => `${prefix}-mock-id`),
}));

const harness = new TestHarness(InputText, {
  mountOptions: {
    props: {
      label: 'Mock Label',
    },
  },
  renderStubDefaultSlot: true,
});

describe('InputText', () => {
  describe('props', () => {
    describe('type', () => {
      it('sets the `type` attribute of the input element', () => {
        // Act
        const wrapper = harness.getWrapper({
          props: { type: 'email' },
        });
        // Assert
        const input = wrapper.find('[data-test="input"]');
        expect(input.attributes('type')).toBe('email');
      });
    });

    describe('label', () => {
      it('sets the `label` prop of the InputContainer component', () => {
        // Act
        const wrapper = harness.getWrapper({
          props: { label: 'Mock Label' },
        });
        // Assert
        const inputContainer = wrapper.findComponent({ ref: 'inputContainer' });
        expect(inputContainer.props('label')).toBe('Mock Label');
      });
    });

    describe('labelParens', () => {
      it('sets the `labelParens` prop of the InputContainer component', () => {
        // Act
        const wrapper = harness.getWrapper({
          props: { labelParens: 'optional' },
        });
        // Assert
        const inputContainer = wrapper.findComponent({ ref: 'inputContainer' });
        expect(inputContainer.props('labelParens')).toBe('optional');
      });
    });

    describe('description', () => {
      it('sets the `description` prop of the InputContainer component', () => {
        // Act
        const wrapper = harness.getWrapper({
          props: { description: 'Mock description' },
        });
        // Assert
        const inputContainer = wrapper.findComponent({ ref: 'inputContainer' });
        expect(inputContainer.props('description')).toBe('Mock description');
      });
    });

    describe('modelValue', () => {
      it('sets the `value` attribute of the input element', () => {
        // Act
        const wrapper = harness.getWrapper({
          props: { modelValue: 'Mock value' },
        });
        // Assert
        const input = wrapper.find('[data-test="input"]');
        expect(input.wrapperElement.value).toBe('Mock value');
      });

      it('is used to show current length in character counter', () => {
        // Act
        const wrapper = harness.getWrapper({
          props: { modelValue: 'Mock value', maxlength: 100 },
          shallow: false,
        });
        // Assert
        const characterCounter = wrapper.find('[data-test="characterCounter"]');
        expect(characterCounter.text()).toContain('10 / 100');
      });

      it('causes character counter `over-limit` style when its length exceeds max', () => {
        // Act
        const wrapper = harness.getWrapper({
          props: { modelValue: 'Mock value', maxlength: 5 },
          shallow: false,
        });
        // Assert
        const characterCounter = wrapper.find('[data-test="characterCounter"]');
        expect(characterCounter.classes().join(' ')).toContain('--over-limit');
      });

      it('does not cause character counter `over-limit` style when its length is less than max', () => {
        // Act
        const wrapper = harness.getWrapper({
          props: { modelValue: 'Mock value', maxlength: 15 },
          shallow: false,
        });
        // Assert
        const characterCounter = wrapper.find('[data-test="characterCounter"]');
        expect(characterCounter.classes().join(' ')).not.toContain('--over-limit');
      });
    });

    describe('maxlength', () => {
      it('causes character counter to render if set', () => {
        // Act
        const wrapper = harness.getWrapper({
          props: { maxlength: 20 },
          shallow: false,
        });
        // Assert
        const characterCounter = wrapper.find('[data-test="characterCounter"]');
        expect(characterCounter.exists()).toBe(true);
        expect(characterCounter.text()).toContain('0 / 20');
      });

      it('does not cause character counter to render if not set', () => {
        // Act
        const wrapper = harness.getWrapper({
          props: { maxlength: null },
          shallow: false,
        });
        // Assert
        const characterCounter = wrapper.find('[data-test="characterCounter"]');
        expect(characterCounter.exists()).toBe(false);
      });
    });

    describe('error', () => {
      it('sets `error` prop of InputContainer component', () => {
        // Act
        const wrapper = harness.getWrapper({
          props: { error: 'Mock error' },
        });
        // Assert
        const inputContainer = wrapper.findComponent({ ref: 'inputContainer' });
        expect(inputContainer.props('error')).toBe('Mock error');
      });
    });

    describe('disabled', () => {
      it('sets disabled attributes on input element', () => {
        // Act
        const wrapper = harness.getWrapper({
          props: { disabled: true },
        });
        // Assert
        const input = wrapper.find('[data-test="input"]');
        expect(input.attributes('disabled')).not.toBeUndefined();
        expect(input.attributes('aria-disabled')).not.toBeUndefined();
      });
    });
  });

  describe('events', () => {
    describe('input element `input` event', () => {
      it('causes `update:modelValue` event to be emitted with contained value', async () => {
        const wrapper = harness.getWrapper();
        const input = wrapper.find('[data-test="input"]');
        // Act
        input.wrapperElement.value = 'Mock value';
        await input.trigger('input');
        // Assert
        expect(wrapper).toHaveEmittedWith('update:modelValue', 'Mock value');
      });
    });
  });

  describe('exposed', () => {
    describe('focus method', () => {
      it('causes focus method to be called on input', () => {
        const wrapper = harness.getWrapper({ shallow: false });
        const focus = vi.spyOn(wrapper.vm.input, 'focus');
        // Act
        wrapper.vm.focus();
        // Assert
        expect(focus).toHaveBeenCalled();
      });
    });
  });

  describe('lifecycle', () => {
    describe('setup', () => {
      it('sets `uid` prop of InputContainer component', () => {
        // Act
        const wrapper = harness.getWrapper();
        // Assert
        const inputContainer = wrapper.findComponent({ ref: 'inputContainer' });
        expect(inputContainer.props('uid')).toBe('input-mock-id');
      });
    });
  });
});
