import { mount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import flushPromises from 'flush-promises';
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
      login: sinon.spy()
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

  it('dispatch "login" actions when login button clicked', async () => {
    const form = { username: 'admin', password: '123456' };
    const wrapper = mount(Login, {
      store,
      localVue,
      router
    });
    wrapper.setData({ form: form });
    wrapper.find('button').trigger('click');
    await flushPromises();
    expect(actions.login.called).to.equal(true);
  });
});
