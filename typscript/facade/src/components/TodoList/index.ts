import { ITodoData } from '../../typings';
import Input, { IInputOptions } from './Subs/Input';
import List, { IListOptions } from './Subs/List';

/**
 * 外观组件
 */
class TodoList {
  private el: HTMLElement;
  private todoData: ITodoData[];
  private list: List;
  private input: Input;
  private todoWrapper: HTMLElement

  constructor(el: HTMLElement, todoData: ITodoData[]) {
    this.el = el
    this.todoData = todoData
    this.todoWrapper = document.createElement('div')
  }

  public init() {
    this.createComponents()
    this.render()
    this.bindEvent()
  }

  public createComponents () {
    this.input = new Input(<IInputOptions>{
      wrapperEl: this.todoWrapper,
      placeholderText: '请输入',
      buttonText: '增加'
    })
    this.list = new List(<IListOptions>{
      wrapperEl: this.todoWrapper,
      todoData: this.todoData
    })
  }

  private render() {
    this.input.render()
    this.list.render()
    this.el.appendChild(this.todoWrapper)
  }

  private bindEvent() {
    this.input.bindEvent()
    this.list.bindEvent()
  }
}

export default TodoList;
