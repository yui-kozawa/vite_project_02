
//--------------------------------
//Lit定型文 仕様するデコレータによって変える？
//--------------------------------

import { LitElement,html, css} from 'lit';
import { customElement, state, property, query } from 'lit/decorators.js'; //内部リアクティブステートには @state ディレクティブを使う。シャドウDOM内の要素を参照するために @query デコレータを使用。インポートに追加する

type ToDoItem = {
  text: string,
  completed: boolean
}

@customElement('y-todo-list') //html側で記載するエレメントを定義
export class ToDoList extends LitElement { //Litコンポーネントを作るときは必須の記載、この中にコンポーネントを作っていく

    static override styles = css`
      .completed {
        text-decoration-line: line-through;
        color: #777;
      }
    `;


    @state()
    private _listItems = [ //pugのオブジェクトと一緒のような書き方
      {text: 'Lit チュートリアル', completed: true},
      {text: 'LitでTodoリストを作る', completed:  false}
    ];

    @property()
    hideCompleted = false;

    @query('#item') //クエリ？
    input!: HTMLInputElement;

    override render() { //表示するHTML要素HTMLリテラルで定義。変数化したものは「${}」にて追加

      const items = this.hideCompleted
        ? this._listItems.filter((item) => !item.completed)
        : this._listItems
      const todos = html`
        <ul>
          ${items.map((item) =>
            html`
              <li
              class=${item.completed ? 'completed' : ''}
              style="cursor: pointer" @click=${() => this.toggleCompleted(item)}>
                ${item.text}
              </li>
            `
          )}
        </ul>
      `;

      const caughtUpMessage = html`<p>全クリ！！</p>`
      const todosOrMessage = items.length > 0 ? todos : caughtUpMessage; //Todoがひとつ異常あったらTodoリストを表示、なかったらメッセージを表示
      return html`
      <h2>ToDoリスト</h2>
      ${todosOrMessage}
      <input id="item" aria-label="New item">
      <button @click=${this.addToDo}>追加</button>

      <br>
      <label>
          <input type="checkbox"
            @change=${this.setHideCompleted}
            ?chacked=${this.hideCompleted}>
            完了したものは非表示
      </label>

      `;
    }

    addToDo() {
      this._listItems = [...this._listItems,
        {text: this.input.value, completed: false}];
      this.input.value ='';
    }

    toggleCompleted(item: ToDoItem) {
      item.completed = !item.completed;
      this.requestUpdate();
    }

    setHideCompleted(e: Event) {
      this.hideCompleted = (e.target as HTMLInputElement).checked;
    }
}

declare global {
  interface HTMLElementTagNameMap {
    'y-todo-list': ToDoList //カスタムエレメント名：class名
  }
}
