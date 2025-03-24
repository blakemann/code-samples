import ProfileCard from './index';
import TestHarness from '@/build/vitest/ReactTestHarness';

const harness = new TestHarness(ProfileCard, {
  mountOptions: {
    props: {
      name: 'Vitest',
      age: 12,
    },
  },
});

describe('ProfileCard', () => {
  describe('props', () => {
    describe('name', () => {
      it('is displayed within the template', () => {
        // Act
        const { queryByTestId } = harness.render({
          props: { name: 'Mock Name' },
        });
        // Assert
        const field = queryByTestId('name');
        expect(field.innerText).toBe('Mock Name');
      });
    });

    describe('age', () => {
      it('is displayed within the template', () => {
        // Act
        const { queryByTestId } = harness.render({
          props: { age: 15 },
        });
        // Assert
        const field = queryByTestId('age');
        expect(field.innerText).toBe('15');
      });
    });
  });
});
