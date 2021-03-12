/**
 * 抽象类
 * 类似 React Components 组件
 */

import { ITodoData } from '../../../typings';

abstract class Component {
  /**
   * 受保护的静态方法
   * 外部不能使用
   * 内部可以使用
   * 子类可以使用
   */
  protected static inputView(placeholderText: string, buttonText: string): string {
    return `
    <div class="input-view">
      <input type="text" class="todo-input" placeholder=${placeholderText} />
      <button class="btn-add">${buttonText}</button>
    </div>
    `;
  }

  protected static listView(data: ITodoData[]) {
    return `
      <div class="todo-list">
        ${
          data && data.length
            ? data.map((todo: ITodoData) => {
                return Component.todoView(todo);
              })
            : '当前没有数据'
        }
      </div>
    `.split(',').join('');
  }

  protected static todoView(todoData: ITodoData): string {
    const { id, completed, content } = todoData;

    return `
    <div class="todo-item">
      <input type="checkbox" data-id="${id}" ${completed ? 'checked' : ''} />
      <span style="text-decoration: ${completed ? 'line-through' : ''}">${content}</span>
      <button data-id="${id}" >删除</button>
    </div>
    `;
  }
}

export default Component;
