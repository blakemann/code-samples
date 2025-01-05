import { isEqual } from 'lodash-es';
import * as assertions from './vi.assertions';

const harness = new class {
  static getContext(not) {
    return {
      equals: isEqual,
      isNot: not,
    };
  }

  constructor() {
    this.not = {};
    Object.entries(assertions).forEach(([name, method]) => {
      Object.defineProperty(this, name, {
        value: (...params) => {
          const { pass } = method.call(this.constructor.getContext(false), ...params);
          return pass;
        },
      });
    });
    Object.entries(assertions).forEach(([name, method]) => {
      Object.defineProperty(this.not, name, {
        value: (...params) => {
          const { pass } = method.call(this.constructor.getContext(true), ...params);
          return !pass;
        },
      });
    });
  }
}();

describe('Vitest Assertions', () => {
  describe('toHaveEmitted', () => {
    it('passes when event emitted', () => {
      const wrapper = { emitted: () => [[]] };
      const result = harness.toHaveEmitted(wrapper, 'event');
      const notResult = harness.not.toHaveEmitted(wrapper, 'event');
      expect(result).toBe(true);
      expect(notResult).toBe(false);
    });

    it('fails when event not emitted', () => {
      const wrapper = { emitted: () => [] };
      const result = harness.toHaveEmitted(wrapper, 'event');
      const notResult = harness.not.toHaveEmitted(wrapper, 'event');
      expect(result).toBe(false);
      expect(notResult).toBe(true);
    });
  });

  describe('toHaveEmittedWith', () => {
    it('passes when event emitted with params', () => {
      const wrapper = { emitted: () => [['paramA', 'paramB']] };
      const result = harness.toHaveEmittedWith(wrapper, 'event', 'paramA', 'paramB');
      const notResult = harness.not.toHaveEmittedWith(wrapper, 'event', 'paramA', 'paramB');
      expect(result).toBe(true);
      expect(notResult).toBe(false);
    });

    it('fails when event not emitted', () => {
      const wrapper = { emitted: () => [] };
      const result = harness.toHaveEmittedWith(wrapper, 'event', 'paramA', 'paramB');
      const notResult = harness.not.toHaveEmittedWith(wrapper, 'event', 'paramA', 'paramB');
      expect(result).toBe(false);
      expect(notResult).toBe(true);
    });

    it('fails when event emitted with missing params', () => {
      const wrapper = { emitted: () => [['paramA']] };
      const result = harness.toHaveEmittedWith(wrapper, 'event', 'paramA', 'paramB');
      const notResult = harness.not.toHaveEmittedWith(wrapper, 'event', 'paramA', 'paramB');
      expect(result).toBe(false);
      expect(notResult).toBe(true);
    });

    it('fails when event emitted with mismatched params', () => {
      const wrapper = { emitted: () => [['paramA', 'notParamB']] };
      const result = harness.toHaveEmittedWith(wrapper, 'event', 'paramA', 'paramB');
      const notResult = harness.not.toHaveEmittedWith(wrapper, 'event', 'paramA', 'paramB');
      expect(result).toBe(false);
      expect(notResult).toBe(true);
    });
  });
});
