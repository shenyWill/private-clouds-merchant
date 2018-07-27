import { mount, createLocalVue } from '@vue/test-utils';
import { expect } from 'chai';
import sinon from 'sinon';
import Vuex from 'vuex';
import VueRouter from 'vue-router';
import TagsView from '@/views/layout/components/TagsView';

const localVue = createLocalVue();
localVue.use(Vuex);
localVue.use(VueRouter);
const routes = [{
  path: '/index',
  name: 'Dashboard',
  meta: { title: '系统首页', icon: '', cache: true }
}];
const router = new VueRouter({routes});

describe('Tagsview', () => {
  let state = {};
  let store;
  let actions;
  let getters;

  beforeEach(() => {
    actions = {
      addVisitedViews: sinon.spy(),
      delVisitedViews: sinon.spy()
    };
    getters = {
      isCollapse: () => false,
      visitedViews: () => {
        return [{
          name: 'Dashboard',
          path: '/index',
          title: '系统首页'
        }];
      }
    };
    store = new Vuex.Store({
      modules: {
        tagsView: {
          state,
          actions,
          getters
        }
      }
    });
  });

  it('render correctly when created', () => {
    const wrapper = mount(TagsView, { store, localVue, router });
    const item = wrapper.find('.tagsview__item');
    const title = (store.getters.visitedViews[0]).title;
    expect(item.text()).to.be.equal(title);
  });

  it('current selected tag contains active class', () => {
    const wrapper = mount(TagsView, { store, localVue, router });
    wrapper.vm.$router.push('/index');
    const item = wrapper.find('.tagsview__item');
    expect(item.classes()).to.include('active');
  });

  it('dispatch "closeSelectedtag" when close tag button is clicked', () => {
    const wrapper = mount(TagsView, { store, localVue, router });
    wrapper.find('.tagsview__icon-close').trigger('click');
    expect(actions.delVisitedViews.called).to.equal(true);
  });

  it('close the last tag router will push to index component', () => {
    const wrapper = mount(TagsView, { store, localVue, router });
    wrapper.vm.$router.push('/index');
    wrapper.find('.tagsview__icon-close').trigger('click');
    expect(wrapper.vm.$route.path).to.equal('/index');
  });
});
