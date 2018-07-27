import { expect } from 'chai';
import { mount } from '@vue/test-utils';
import TestExample from '@/views/TestExample.vue';

describe('Vue Test Utils Basic Example', () => {
  const wrapper = mount(TestExample);

  it('increments count when button is clicked', () => {
    wrapper.find('button').trigger('click');
    expect(wrapper.find('div').text()).contains('1');
  });
});
