import * as React from 'react';
import * as TestUtils from 'react-addons-test-utils';
import TodoFooter from './TodoFooter';
import {SHOW_ALL, SHOW_ACTIVE} from '../constants/TodoFilters';
import {assign} from '../assign';

function setup(propOverrides: any) {
  const props = assign({
    completedCount: 0,
    activeCount: 0,
    filter: SHOW_ALL,
    onClearCompleted: jasmine.createSpy('onClearCompleted'),
    onShow: jasmine.createSpy('onShow')
  }, propOverrides);

  const renderer = TestUtils.createRenderer();
  renderer.render(<TodoFooter {...props}/>);
  const output = renderer.getRenderOutput();

  return {
    props,
    output
  };
}

function getTextContent(elem: any) {
  const children = Array.isArray(elem.props.children) ?
    elem.props.children : [elem.props.children];

  return children.reduce((out, child) => {
    // children are either elements or text strings
    return out + (child.props ? getTextContent(child) : child);
  }, '');
}

describe('components', () => {
  describe('TodoFooter', () => {
    it('should render container', () => {
      const {output} = setup({});
      expect(output.type).toBe('footer');
      expect(output.props.className).toBe('todo-footer');
    });

    it('should display active count when 0', () => {
      const {output} = setup({activeCount: 0});
      const [count] = output.props.children;
      expect(getTextContent(count)).toBe('No items left');
    });

    it('should display active count when above 0', () => {
      const {output} = setup({activeCount: 1});
      const [count] = output.props.children;
      expect(getTextContent(count)).toBe('1 item left');
    });

    it('should render filters', () => {
      const {output} = setup({});
      const [, filters] = output.props.children;
      expect(filters.type).toBe('ul');
      expect(filters.props.className).toBe('filters');
      expect(filters.props.children.length).toBe(3);
      filters.props.children.forEach((filter, i) => {
        expect(filter.type).toBe('li');
        const a = filter.props.children;
        expect(a.props.className).toBe(i === 0 ? 'selected' : '');
        expect(a.props.children).toBe({
          0: 'All',
          1: 'Active',
          2: 'Completed'
        }[i]);
      });
    });

    it('should call onShow when a filter is clicked', () => {
      const {output, props} = setup({});
      const [, filters] = output.props.children;
      const filterLink = filters.props.children[1].props.children;
      filterLink.props.onClick({});
      expect(props.onShow).toHaveBeenCalledWith(SHOW_ACTIVE);
    });

    it('shouldnt show clear button when no completed todos', () => {
      const {output} = setup({completedCount: 0});
      const [, , clear] = output.props.children;
      expect(clear).toBe(undefined);
    });

    it('should render clear button when completed todos', () => {
      const {output} = setup({completedCount: 1});
      const [, , clear] = output.props.children;
      expect(clear.type).toBe('button');
      expect(clear.props.children).toBe('Clear completed');
    });

    it('should call onClearCompleted on clear button click', () => {
      const {output, props} = setup({completedCount: 1});
      const [, , clear] = output.props.children;
      clear.props.onClick({});
      expect(props.onClearCompleted).toHaveBeenCalled();
    });
  });
});
