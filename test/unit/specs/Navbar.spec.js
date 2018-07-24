import { shallowMount, createLocalVue } from '@vue/test-utils';
import chai from 'chai';
import Vuex from 'vuex';
import Navbar from '@/views/layout/components/Navbar.vue';

const expect = chai.expect;

const localVue = createLocalVue();
localVue.use(Vuex);

describe('Navbar.vue', () => {
  let getters;
  let store;
  let actions;

  beforeEach(() => {
    getters = {
      isCollapse: () => { return true; }
    };

    actions = {
      toggleMenu: () => {}
    };

    store = new Vuex.Store({
      actions,
      getters
    });
  });

  it('Navbar has a toggleMenu button', () => {
    const wrapper = shallowMount(Navbar, { store, localVue });
    expect(wrapper.contains('.navbar__btn')).to.equal(true);
  });

  it('should contains navbar__collapse class if sidebar menu is collapse', () => {
    const wrapper = shallowMount(Navbar, { store, localVue });
    const rootElement = wrapper.find('div');
    if (getters.isCollapse()) {
      expect(rootElement.classes()).to.include('navbar__collapse');
    } else {
      expect(rootElement.classes()).to.not.include('navbar__collapse');
    }
  });
});
