import InputContainer from './index';
import TestHarness from '@/build/vitest/ReactTestHarness';

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
        const { queryByTestId } = harness.render({
          props: { uid: 'mock-id', label: 'Mock Label' },
        });
        const label = queryByTestId('label');
        expect(label.getAttribute('for')).toBe('mock-id');
      });
    });

    describe('label', () => {
      it('causes the label element to render when provided', () => {
        const { queryByTestId } = harness.render({
          props: { label: 'Mock Label' },
        });
        const label = queryByTestId('label');
        expect(label).not.toBeNull();
        expect(label.innerText).toContain('Mock Label');
      });

      it('does not cause the label element to render when not provided', () => {
        const { queryByTestId } = harness.render({
          props: { label: '' },
        });
        const label = queryByTestId('label');
        expect(label).toBeNull();
      });
    });

    describe('labelParens', () => {
      it('causes the label parentheses element to render when provided', () => {
        const { queryByTestId } = harness.render({
          props: {
            label: 'Mock Label',
            labelParens: 'optional',
          },
        });
        const parens = queryByTestId('labelParens');
        expect(parens).not.toBeNull();
        expect(parens.innerText).toContain('(optional)');
      });

      it('does not cause the label parentheses element to render when not provided', () => {
        const { queryByTestId } = harness.render({
          props: {
            label: 'Mock Label',
            labelParens: '',
          },
        });
        const parens = queryByTestId('labelParens');
        expect(parens).toBeNull();
      });
    });

    describe('description', () => {
      it('causes the description element to render when provided', () => {
        const { queryByTestId } = harness.render({
          props: {
            label: 'Mock Label',
            description: 'Mock description',
          },
        });
        const description = queryByTestId('description');
        expect(description).not.toBeNull();
        expect(description.innerText).toContain('Mock description');
      });

      it('does not cause the description element to render when not provided', () => {
        const { queryByTestId } = harness.render({
          props: {
            label: 'Mock Label',
            description: '',
          },
        });
        const description = queryByTestId('description');
        expect(description).toBeNull();
      });
    });

    describe('error', () => {
      const visibilityClass = 'error-indicator--visible';

      it('causes the error indicator to be visible when populated', () => {
        const { queryByTestId } = harness.render({
          props: { error: 'Mock error' },
        });
        const errorIndicator = queryByTestId('errorIndicator');
        expect(errorIndicator.classList.toString()).toContain(visibilityClass);
      });

      it('causes the error indicator to be hidden when not populated', () => {
        const { queryByTestId } = harness.render({
          props: { error: null },
        });
        const errorIndicator = queryByTestId('errorIndicator');
        expect(errorIndicator.classList.toString()).not.toContain(visibilityClass);
      });

      it('is displayed in the template', () => {
        const { queryByTestId } = harness.render({
          props: { error: 'Mock error' },
        });
        const errorMessage = queryByTestId('errorMessage');
        expect(errorMessage.innerText).toContain('Mock error');
      });
    });

    describe('collapseErrorSpace', () => {
      it('causes the error message to not render when true and `error` is not populated', () => {
        const { queryByTestId } = harness.render({
          props: { collapseErrorSpace: true, error: null },
        });
        const errorMessage = queryByTestId('errorMessage');
        expect(errorMessage).toBeNull();
      });

      it('does not cause the error message to not render when true and `error` is populated', () => {
        const { queryByTestId } = harness.render({
          props: { collapseErrorSpace: true, error: 'Mock error' },
        });
        const errorMessage = queryByTestId('errorMessage');
        expect(errorMessage).not.toBeNull();
      });

      it('does not cause the error message to not render when false and `error` is not populated', () => {
        const { queryByTestId } = harness.render({
          props: { collapseErrorSpace: false, error: null },
        });
        const errorMessage = queryByTestId('errorMessage');
        expect(errorMessage).not.toBeNull();
      });
    });
  });

  describe('hiddenLabel', () => {
    it('causes the info row to not render when true', () => {
      const { queryByTestId } = harness.render({
        props: { hiddenLabel: true },
      });
      const info = queryByTestId('info');
      expect(info.classList.toString()).toContain('--hidden');
    });

    it('does not cause the info row to not render when false', () => {
      const { queryByTestId } = harness.render({
        props: { hiddenLabel: false },
      });
      const info = queryByTestId('info');
      expect(info.classList.toString()).not.toContain('--hidden');
    });
  });
});
