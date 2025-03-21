import FormDemo from './index';
import TestHarness from '@/build/vitest/TestHarness';

const harness = new TestHarness(FormDemo);

describe('FormDemo', () => {
  describe('events', () => {
    describe('name field `update:modelValue` event', () => {
      it('updates the name provided to the ProfileCard component', async () => {
        const wrapper = harness.getWrapper();
        const nameField = wrapper.findComponent({ ref: 'nameField' });
        const profileCard = wrapper.findComponent({ ref: 'profileCard' });
        // Act
        await nameField.vm.$emit('update:modelValue', 'Mock Name');
        // Assert
        expect(profileCard.props('name')).toBe('Mock Name');
      });
    });

    describe('age field `update:modelValue` event', () => {
      it('updates the age provided to the ProfileCard component', async () => {
        const wrapper = harness.getWrapper();
        const nameField = wrapper.findComponent({ ref: 'nameField' });
        const profileCard = wrapper.findComponent({ ref: 'profileCard' });
        // Act
        await nameField.vm.$emit('update:modelValue', 15);
        // Assert
        expect(profileCard.props('name')).toBe(15);
      });
    });
  });
});
