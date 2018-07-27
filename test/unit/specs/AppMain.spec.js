import { mount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import VueRouter from 'vue-router';
import { expect } from 'chai';
import AppMain from '@/views/layout/components/AppMain.vue';

const localVue = createLocalVue();
localVue.use(Vuex);
localVue.use(VueRouter);

const routes = [{
  name: 'Dashboard',
  path: '/index'
}];

const router = new VueRouter({ routes });

describe('App Main Component', () => {
  let store;
  let getters;

  beforeEach(() => {
    getters = {
      isCollapse: () => true,
      cachedViews: () => {}
    };
    store = new Vuex.Store({
      getters
    });
  });

  it('render correctly when created', () => {
    const wrapper = mount(AppMain, { store, localVue, router });
    expect(wrapper.classes()).to.include('app-main__collapse');
  });
});
