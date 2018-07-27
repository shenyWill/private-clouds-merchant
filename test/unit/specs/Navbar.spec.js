import { mount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import chai from 'chai';
import sinon from 'sinon';
import Navbar from '@/views/layout/components/Navbar.vue';

const expect = chai.expect;

const localVue = createLocalVue();
localVue.use(Vuex);

describe('Navbar.vue', () => {
  let getters;
  let store;
  let actions;

  beforeEach(() => {
    actions = {
      toggleMenu: sinon.spy()
    };

    getters = {
      isCollapse: () => true
    };

    store = new Vuex.Store({
      modules: {
        app: {
          state: {},
          actions,
          getters
        }
      }
    });
  });

  it('Navbar has a toggleMenu button', () => {
    const wrapper = mount(Navbar, { store, localVue });
    expect(wrapper.contains('.navbar__btn')).to.equal(true);
  });

  it('should contains navbar__collapse class if sidebar menu is collapse', () => {
    const wrapper = mount(Navbar, { store, localVue });
    const rootElement = wrapper.find('div');
    if (getters.isCollapse()) {
      expect(rootElement.classes()).to.include('navbar__collapse');
    } else {
      expect(rootElement.classes()).to.not.include('navbar__collapse');
    }
  });

  it('dispatch "toggleMenu" when button is clicked', () => {
    const wrapper = mount(Navbar, { store, localVue });
    wrapper.find('button').trigger('click');
    expect(actions.toggleMenu.called).to.equal(true);
  });
});
