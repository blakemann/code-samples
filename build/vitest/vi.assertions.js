/**
 * Assert if wrapper emitted an event.
 *
 * @param {Wrapper} wrapper - Vue Test Utils Wrapper object
 * @param {String} event - Expected event
 * @returns {Object} - Pass/fail object
 */
export function toHaveEmitted(wrapper, event) {
  if (arguments.length > 2) {
    throw new Error('Unexpected params provided to `toHaveEmitted`. Use `toHaveEmittedWith` instead.');
  }
  const emits = wrapper.emitted(event) || [];
  const pass = (emits && emits.length > 0);
  return {
    pass,
    message: pass
      ? () => `Expected ${this.utils.printExpected(event)} not to be emitted, but it was`
      : () => `Expected ${this.utils.printExpected(event)} to be emitted, but it was not`,
  };
}

/**
 * Assert if wrapper emitted an event with params.
 *
 * @param {Wrapper} wrapper - Vue Test Utils Wrapper object
 * @param {String} event - Expected event
 * @param {Array} params - Expected params
 * @returns {Object} - Pass/fail object
 */
export function toHaveEmittedWith(wrapper, event, ...params) {
  const didEmit = toHaveEmitted.call(this, wrapper, event);
  if ((!this.isNot && !didEmit.pass)) {
    return didEmit;
  }
  const emits = wrapper.emitted(event) || [];
  const pass = emits.some((emittedParams) => this.equals(params, emittedParams));
  return {
    pass,
    message: pass
      ? () => `Expected ${this.utils.printExpected(event)} not to be emitted with ${this.utils.printExpected(params)}, but it was`
      : () => {
        const received = emits.map((emittedParams, index) => `\n${index}: ${this.utils.printReceived(emittedParams)}`);
        return `Expected ${this.utils.printExpected(event)} to be emitted with ${this.utils.printExpected(params)}, but it was not.${received}`;
      },
  };
}

// eslint-disable-next-line no-undef
expect.extend({
  toHaveEmitted,
  toHaveEmittedWith,
});
