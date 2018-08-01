import { mount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import VueRouter from 'vue-router';
import Login from '@/views/Login';

const localVue = createLocalVue();
localVue.use(VueRouter);
localVue.use(Vuex);

const routes = [{
  path: '/login',
  name: 'Login'
}];

const router = new VueRouter({ routes });

describe('Login Component', () => {
  let state = {};
  let store;
  let getters;
  let actions;

  beforeEach(() => {
    actions = {
    };
    store = new Vuex.Store({
      modules: {
        user: {
          state,
          actions,
          getters
        }
      }
    });
  });

  it('render correctly when created', () => {
    const wrapper = mount(Login, { store, localVue, router });
  });
});
