import { ITodoData } from '../../../typings';
import Component from './Components';

export interface IListOptions {
  wrapperEl: HTMLElement;
  todoData: ITodoData[];
}

class List extends Component {
  private wrapperEl: HTMLElement;
  // 静态属性，唯一的一个引用
  private static todoData: ITodoData[];
  constructor(options: IListOptions) {
    super();
    this.wrapperEl = options.wrapperEl;
    List.todoData = options.todoData;
  }

  public render() {
    const listView = Component.listView(List.todoData);
    this.wrapperEl.innerHTML += listView;
  }

  public bindEvent() {
    const oTodoList: HTMLElement = document.querySelector('.todo-list');
    oTodoList.addEventListener('click', this.handleListClick.bind(this), false);
  }

  public static addItem(val: string) {
    const TodoList:HTMLElement = document.querySelector('.todo-list')
    const _item: ITodoData = {
      id: new Date().getTime().toString(),
      content: val,
      completed: false,
    };

    List.todoData.push(_item);

    if (List.todoData.length === 1) {
      TodoList.innerHTML = ''
    }
    console.log(TodoList,'TodoList.innerHTML')

    TodoList.innerHTML += Component.todoView(_item);
  }

  private handleListClick(e: MouseEvent) {
    const tar = e.target as HTMLElement;
    const tagName = tar.tagName.toLowerCase();
    const oTodoItems = document.getElementsByClassName('todo-item');
    const id = tar.dataset.id

    switch (tagName) {
      case 'input':
        this._handleCheckBoxClick(id, oTodoItems);
        break;
      case 'button':
        this._handleButtonClick(id, oTodoItems);
        break;
      default:
        break;
    }
  }

  private _handleCheckBoxClick (id:string, oTodoItems: HTMLCollection) {
    List.todoData = List.todoData.map((item:ITodoData, index:number) => {
      if (id === item.id) {
        item.completed = !item.completed
        oTodoItems[index].querySelector('span').style.textDecoration = item.completed ? 'line-through' : ''
        console.log(oTodoItems[index].querySelector('input'),'input')
        // oTodoItems[index].target.checked
      }
      return item
    })
  }

  private _handleButtonClick (id: string, oTodoItems: HTMLCollection) {
    List.todoData = List.todoData.filter((item:ITodoData, index: number) => {
      if (item.id !== id) {
        return item
      } else {
        oTodoItems[index].remove();
      }
    })

    oTodoItems
  }
}

export default List;
