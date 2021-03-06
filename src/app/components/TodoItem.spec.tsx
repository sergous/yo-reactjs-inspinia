import * as React from 'react';
import * as TestUtils from 'react-addons-test-utils';
import TodoItem from './TodoItem';
import TodoTextInput from './TodoTextInput';
import Todo from '../models/todo';

function setup(editing: boolean = false) {
  const props = {
    todo: new Todo({text: 'Use Redux'}),
    editTodo: jasmine.createSpy('editTodo'),
    deleteTodo: jasmine.createSpy('deleteTodo'),
    completeTodo: jasmine.createSpy('completeTodo')
  };

  const renderer = TestUtils.createRenderer();

  renderer.render(
    <TodoItem {...props}/>
  );

  let output = renderer.getRenderOutput();

  if (editing) {
    const label = output.props.children.props.children[1];
    label.props.onDoubleClick({});
    output = renderer.getRenderOutput();
  }

  return {
    props,
    output,
    renderer
  };
}

describe('components', () => {
  describe('TodoItem', () => {
    it('initial render', () => {
      const {output} = setup();

      expect(output.type).toBe('li');
      expect(output.props.className).toBe('');

      const div = output.props.children;

      expect(div.type).toBe('span');

      const [input, label, button] = div.props.children;

      expect(input.type).toBe('input');
      expect(input.props.checked).toBe(false);

      expect(label.type).toBe('label');
      expect(label.props.children).toBe('Use Redux');

      expect(button.type).toBe('button');
      expect(button.props.className).toBe('btn pull-right');
    });

    it('input onChange should call completeTodo', () => {
      const {output, props} = setup();
      const input = output.props.children.props.children[0];
      input.props.onChange({});
      expect(props.completeTodo).toHaveBeenCalledWith(props.todo);
    });

    it('button onClick should call deleteTodo', () => {
      const {output, props} = setup();
      const button = output.props.children.props.children[2];
      button.props.onClick({});
      expect(props.deleteTodo).toHaveBeenCalledWith(props.todo);
    });

    it('label onDoubleClick should put component in edit state', () => {
      const {output, renderer} = setup();
      const label = output.props.children.props.children[1];
      label.props.onDoubleClick({});
      const updated = renderer.getRenderOutput();
      expect(updated.type).toBe('li');
      expect(updated.props.className).toBe('editing');
    });

    it('edit state render', () => {
      const {output} = setup(true);

      expect(output.type).toBe('li');
      expect(output.props.className).toBe('editing');

      const input = output.props.children;
      expect(input.type).toBe(TodoTextInput);
      expect(input.props.text).toBe('Use Redux');
      expect(input.props.editing).toBe(true);
    });

    it('TodoTextInput onSave should call editTodo', () => {
      const {output, props} = setup(true);
      output.props.children.props.onSave(new Todo({text: 'Use Redux'}));
      expect(props.editTodo).toHaveBeenCalledWith(props.todo);
    });

    it('TodoTextInput onSave should call deleteTodo if text is empty', () => {
      const {output, props} = setup(true);
      output.props.children.props.onSave('');
      expect(props.deleteTodo).toHaveBeenCalledWith(props.todo);
    });

    it('TodoTextInput onSave should exit component from edit state', () => {
      const {output, renderer} = setup(true);
      output.props.children.props.onSave('Use Redux');
      const updated = renderer.getRenderOutput();
      expect(updated.type).toBe('li');
      expect(updated.props.className).toBe('');
    });
  });
});
