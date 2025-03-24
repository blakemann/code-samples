import InputNumber from './index';
import TestHarness from '@/build/vitest/TestHarness';

vi.mock('@/vue/composables', async () => ({
  ...await vi.importActual('@/vue/composables'),
  useUniqueId: vi.fn().mockImplementation((prefix) => `${prefix}-mock-id`),
}));

const harness = new TestHarness(InputNumber, {
  mountOptions: {
    props: {
      label: 'Mock Label',
    },
  },
  renderStubDefaultSlot: true,
});

describe('InputNumber', () => {
  describe('props', () => {
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
      it('sets the `modelValue` attribute of the NumberFieldRoot component', () => {
        // Act
        const wrapper = harness.getWrapper({
          props: { modelValue: 123 },
        });
        // Assert
        const fieldRoot = wrapper.findComponent({ ref: 'fieldRoot' });
        expect(fieldRoot.props('modelValue')).toBe(123);
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
      it('sets disabled prop on NumberFieldRoot component', () => {
        // Act
        const wrapper = harness.getWrapper({
          props: { disabled: true },
        });
        // Assert
        const fieldRoot = wrapper.findComponent({ ref: 'fieldRoot' });
        expect(fieldRoot.props('disabled')).toBe(true);
      });

      it('prevents increment/decrement buttons from rendering when true', () => {
        // Act
        const wrapper = harness.getWrapper({
          props: { disabled: true },
        });
        // Assert
        expect(wrapper.findComponent({ ref: 'decrementButton' }).exists()).toBe(false);
        expect(wrapper.findComponent({ ref: 'incrementButton' }).exists()).toBe(false);
      });
    });

    describe('showStepButtons', () => {
      it('causes increment/decrement buttons to render when true', () => {
        // Act
        const wrapper = harness.getWrapper({
          props: { showStepButtons: true },
        });
        // Assert
        expect(wrapper.findComponent({ ref: 'decrementButton' }).exists()).toBe(true);
        expect(wrapper.findComponent({ ref: 'incrementButton' }).exists()).toBe(true);
      });

      it('prevents increment/decrement buttons from rendering when false', () => {
        // Act
        const wrapper = harness.getWrapper({
          props: { showStepButtons: false },
        });
        // Assert
        expect(wrapper.findComponent({ ref: 'decrementButton' }).exists()).toBe(false);
        expect(wrapper.findComponent({ ref: 'incrementButton' }).exists()).toBe(false);
      });
    });

    describe('min', () => {
      it('sets min prop on NumberFieldRoot component', () => {
        // Act
        const wrapper = harness.getWrapper({
          props: { min: 10 },
        });
        // Assert
        const fieldRoot = wrapper.findComponent({ ref: 'fieldRoot' });
        expect(fieldRoot.props('min')).toBe(10);
      });
    });

    describe('max', () => {
      it('sets max prop on NumberFieldRoot component', () => {
        // Act
        const wrapper = harness.getWrapper({
          props: { max: 10 },
        });
        // Assert
        const fieldRoot = wrapper.findComponent({ ref: 'fieldRoot' });
        expect(fieldRoot.props('max')).toBe(10);
      });
    });

    describe('step', () => {
      it('sets step prop on NumberFieldRoot component', () => {
        // Act
        const wrapper = harness.getWrapper({
          props: { step: 10 },
        });
        // Assert
        const fieldRoot = wrapper.findComponent({ ref: 'fieldRoot' });
        expect(fieldRoot.props('step')).toBe(10);
      });
    });

    describe('formatOptions', () => {
      it('sets formatOptions prop on NumberFieldRoot component', () => {
        // Act
        const wrapper = harness.getWrapper({
          props: { formatOptions: { minimumFractionDigits: 2 } },
        });
        // Assert
        const fieldRoot = wrapper.findComponent({ ref: 'fieldRoot' });
        expect(fieldRoot.props('formatOptions')).toEqual({ minimumFractionDigits: 2 });
      });
    });
  });

  describe('events', () => {
    describe('NumberFieldRoot component `update:modelValue` event', () => {
      it('causes `update:modelValue` event to be emitted with contained value', async () => {
        const wrapper = harness.getWrapper();
        const fieldRoot = wrapper.findComponent({ ref: 'fieldRoot' });
        // Act
        await fieldRoot.vm.$emit('update:modelValue', 123);
        // Assert
        expect(wrapper).toHaveEmittedWith('update:modelValue', 123);
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
