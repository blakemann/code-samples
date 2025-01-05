import { config, shallowMount, mount, enableAutoUnmount, flushPromises } from '@vue/test-utils';
import { merge } from 'lodash-es';

export default class TestHarness {
  controls = [];

  constructor(component, { mountOptions = {}, renderStubDefaultSlot = false } = {}) {
    this.component = component;
    this.baseMountOptions = mountOptions;
    this.flushPromises = flushPromises;
    this.enableAutoUnmount = enableAutoUnmount;
    if (renderStubDefaultSlot) {
      config.global.renderStubDefaultSlot = true;
    }
  }

  registerControl(name, method, async = true) {
    this.controls.push({ name, method, async });
  }

  bindControls(wrapper) {
    const controller = {};
    this.controls.forEach((control) => {
      if (control.async) {
        controller[control.name] = async (...params) => {
          const value = await control.method(wrapper, ...params);
          await wrapper.vm.$nextTick();
          return value;
        };
      } else {
        controller[control.name] = (...params) => control.method(wrapper, ...params);
      }
    });
    wrapper.controller = controller;
    return wrapper;
  }

  getWrapper({ shallow = true, ...mountOptions } = {}) {
    const mountMethod = shallow ? shallowMount : mount;
    const wrapper = mountMethod(this.component, merge(
      {},
      TestHarness.globalMountOptions,
      this.baseMountOptions,
      mountOptions,
    ));
    return this.bindControls(wrapper);
  }
}
