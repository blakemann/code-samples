import { render as renderComponent, screen, waitFor } from '@testing-library/react';
import { merge } from 'lodash-es';

export default class TestHarness {
  constructor(component, { mountOptions = {} } = {}) {
    this.component = component;
    this.baseMountOptions = mountOptions;
    this.screen = screen;
    this.waitFor = waitFor;
  }

  render(mountOptions = {}) {
    const Component = this.component;
    const props = merge(
      {},
      this.baseMountOptions.props,
      mountOptions.props,
    );
    const returned = renderComponent(<Component {...props} />);
    this.updateProps = (newProps) => {
      const updatedProps = { ...props, ...newProps };
      returned.rerender(<Component {...updatedProps} />);
    };
    return returned;
  }
}
