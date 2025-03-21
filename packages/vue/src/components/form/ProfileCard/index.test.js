import ProfileCard from './index';
import TestHarness from '@/build/vitest/TestHarness';

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
        const wrapper = harness.getWrapper({
          props: { name: 'Mock Name' },
        });
        // Assert
        const field = wrapper.find('[data-test="name"]');
        expect(field.text()).toBe('Mock Name');
      });
    });

    describe('age', () => {
      it('is displayed within the template', () => {
        // Act
        const wrapper = harness.getWrapper({
          props: { age: 15 },
        });
        // Assert
        const field = wrapper.find('[data-test="age"]');
        expect(field.text()).toBe('15');
      });
    });
  });
});
