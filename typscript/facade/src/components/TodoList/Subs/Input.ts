import Component from './Components';
import List from './List';

export interface IInputOptions {
  wrapperEl: HTMLElement;
  placeholderText: string;
  buttonText: string;
}

class Input extends Component {
  private options: IInputOptions;

  constructor(options: IInputOptions) {
    super();
    this.options = options;
  }

  public render() {
    const { placeholderText, buttonText, wrapperEl } = this.options;
    const inputView = Component.inputView(placeholderText, buttonText);
    wrapperEl.innerHTML += inputView;
  }

  public bindEvent() {
    const oAddBtn = document.querySelector('.btn-add')
    const oInput = document.querySelector('.todo-input')
    oAddBtn.addEventListener('click', this.handleClickBtn.bind(this, oInput), false)
  }

  private handleClickBtn(inputDom) {
    const val:string = inputDom.value.trim()

    if (val.length) {
      List.addItem(val)
      inputDom.value = ''
    }

  }
}

export default Input;
