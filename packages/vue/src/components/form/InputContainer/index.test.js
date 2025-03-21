import InputContainer from './index';
import TestHarness from '@/build/vitest/TestHarness';

const harness = new TestHarness(InputContainer, {
  mountOptions: {
    props: {
      uid: 'mock-id',
    },
  },
});

describe('InputContainer', () => {
  describe('props', () => {
    describe('uid', () => {
      it('populates the `for` attribute of the label element', () => {
        const wrapper = harness.getWrapper({
          props: { uid: 'mock-id', label: 'Mock Label' },
        });
        const label = wrapper.find('[data-test="label"]');
        expect(label.attributes('for')).toBe('mock-id');
      });
    });

    describe('label', () => {
      it('causes the label element to render when provided', () => {
        const wrapper = harness.getWrapper({
          props: { label: 'Mock Label' },
        });
        const label = wrapper.find('[data-test="label"]');
        expect(label.exists()).toBe(true);
        expect(label.text()).toContain('Mock Label');
      });

      it('does not cause the label element to render when not provided', () => {
        const wrapper = harness.getWrapper({
          props: { label: '' },
        });
        const label = wrapper.find('[data-test="label"]');
        expect(label.exists()).toBe(false);
      });
    });

    describe('labelParens', () => {
      it('causes the label parentheses element to render when provided', () => {
        const wrapper = harness.getWrapper({
          props: {
            label: 'Mock Label',
            labelParens: 'optional',
          },
        });
        const parens = wrapper.find('[data-test="labelParens"]');
        expect(parens.exists()).toBe(true);
        expect(parens.text()).toContain('(optional)');
      });

      it('does not cause the label parentheses element to render when not provided', () => {
        const wrapper = harness.getWrapper({
          props: {
            label: 'Mock Label',
            labelParens: '',
          },
        });
        const parens = wrapper.find('[data-test="labelParens"]');
        expect(parens.exists()).toBe(false);
      });
    });

    describe('description', () => {
      it('causes the description element to render when provided', () => {
        const wrapper = harness.getWrapper({
          props: {
            label: 'Mock Label',
            description: 'Mock description',
          },
        });
        const description = wrapper.find('[data-test="description"]');
        expect(description.exists()).toBe(true);
        expect(description.text()).toContain('Mock description');
      });

      it('does not cause the description element to render when not provided', () => {
        const wrapper = harness.getWrapper({
          props: {
            label: 'Mock Label',
            description: '',
          },
        });
        const description = wrapper.find('[data-test="description"]');
        expect(description.exists()).toBe(false);
      });
    });

    describe('error', () => {
      const visibilityClass = 'error-indicator--visible';

      it('causes the error indicator to be visible when populated', () => {
        const wrapper = harness.getWrapper({
          props: { error: 'Mock error' },
        });
        const errorIndicator = wrapper.find('[data-test="errorIndicator"]');
        expect(errorIndicator.classes(visibilityClass)).toBe(true);
      });

      it('causes the error indicator to be hidden when not populated', () => {
        const wrapper = harness.getWrapper({
          props: { error: null },
        });
        const errorIndicator = wrapper.find('[data-test="errorIndicator"]');
        expect(errorIndicator.classes(visibilityClass)).toBe(false);
      });

      it('is displayed in the template', () => {
        const wrapper = harness.getWrapper({
          props: { error: 'Mock error' },
        });
        const errorMessage = wrapper.find('[data-test="errorMessage"]');
        expect(errorMessage.text()).toContain('Mock error');
      });
    });

    describe('collapseErrorSpace', () => {
      it('causes the error message to not render when true and `error` is not populated', () => {
        const wrapper = harness.getWrapper({
          props: { collapseErrorSpace: true, error: null },
        });
        const errorMessage = wrapper.find('[data-test="errorMessage"]');
        expect(errorMessage.exists()).toBe(false);
      });

      it('does not cause the error message to not render when true and `error` is populated', () => {
        const wrapper = harness.getWrapper({
          props: { collapseErrorSpace: true, error: 'Mock error' },
        });
        const errorMessage = wrapper.find('[data-test="errorMessage"]');
        expect(errorMessage.exists()).toBe(true);
      });

      it('does not cause the error message to not render when false and `error` is not populated', () => {
        const wrapper = harness.getWrapper({
          props: { collapseErrorSpace: false, error: null },
        });
        const errorMessage = wrapper.find('[data-test="errorMessage"]');
        expect(errorMessage.exists()).toBe(true);
      });
    });
  });

  describe('hiddenLabel', () => {
    it('causes the info row to not render when true', () => {
      const wrapper = harness.getWrapper({
        props: { hiddenLabel: true },
      });
      const info = wrapper.find('[data-test="info"]');
      expect(info.classes().join(' ')).toContain('--hidden');
    });

    it('does not cause the info row to not render when false', () => {
      const wrapper = harness.getWrapper({
        props: { hiddenLabel: false },
      });
      const info = wrapper.find('[data-test="info"]');
      expect(info.classes().join(' ')).not.toContain('--hidden');
    });
  });
});
