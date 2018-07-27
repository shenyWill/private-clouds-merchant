import { mount, createLocalVue } from '@vue/test-utils';
import { expect } from 'chai';
import Vuex from 'vuex';
import VueRouter from 'vue-router';
import Sidebar from '@/views/layout/components/Sidebar';

const localVue = createLocalVue();
localVue.use(Vuex);
localVue.use(VueRouter);

const routes = [{
  path: '/index',
  name: 'Dashboard',
  meta: { title: '系统首页', icon: '', cache: true }
}];

const router = new VueRouter({ routes });

describe('Sidebar Component', () => {
  let state = {};
  let store;
  let actions;
  let getters;

  beforeEach(() => {
    actions = {
    };
    getters = {
      isCollapse: () => true
    };
    store = new Vuex.Store({
      modules: {
        app: {
          state,
          actions,
          getters
        }
      }
    });
  });

  it('render correctly when created', () => {
    const wrapper = mount(Sidebar, { store, localVue, router });
    expect(wrapper.classes()).to.include('sidebar__collapse');
  });
});
