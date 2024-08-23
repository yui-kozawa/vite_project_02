

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

      const caughtUpMessage = html`<p>全クリ！！/p>`
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

// // import litLogo from './assets/lit.svg'
// // import viteLogo from '/vite.svg'

// /**
//  * An example element.
//  *
//  * @slot - This element has a slot
//  * @csspart button - The button
//  */
// @customElement('my-element')
// export class MyElement extends LitElement {
//   /**
//    * Copy for the read the docs hint.
//    */
//   @property()
//   docsHint = 'Click on the Vite and Lit logos to learn more'

//   /**
//    * The number of times the button has been clicked.
//    */
//   @property({ type: Number })
//   count = 0

//   render() {
//     return html`
//       <div>
//         <a href="https://vitejs.dev" target="_blank">
//           <img src=${viteLogo} class="logo" alt="Vite logo" />
//         </a>
//         <a href="https://lit.dev" target="_blank">
//           <img src=${litLogo} class="logo lit" alt="Lit logo" />
//         </a>
//       </div>
//       <slot></slot>
//       <div class="card">
//         <button @click=${this._onClick} part="button">
//           count is ${this.count}
//         </button>
//       </div>
//       <p class="read-the-docs">${this.docsHint}</p>
//     `
//   }

//   private _onClick() {
//     this.count++
//   }

//   static styles = css`
//     :host {
//       max-width: 1280px;
//       margin: 0 auto;
//       padding: 2rem;
//       text-align: center;
//     }

//     .logo {
//       height: 6em;
//       padding: 1.5em;
//       will-change: filter;
//       transition: filter 300ms;
//     }
//     .logo:hover {
//       filter: drop-shadow(0 0 2em #646cffaa);
//     }
//     .logo.lit:hover {
//       filter: drop-shadow(0 0 2em #325cffaa);
//     }

//     .card {
//       padding: 2em;
//     }

//     .read-the-docs {
//       color: #888;
//     }

//     ::slotted(h1) {
//       font-size: 3.2em;
//       line-height: 1.1;
//     }

//     a {
//       font-weight: 500;
//       color: #646cff;
//       text-decoration: inherit;
//     }
//     a:hover {
//       color: #535bf2;
//     }

//     button {
//       border-radius: 8px;
//       border: 1px solid transparent;
//       padding: 0.6em 1.2em;
//       font-size: 1em;
//       font-weight: 500;
//       font-family: inherit;
//       background-color: #1a1a1a;
//       cursor: pointer;
//       transition: border-color 0.25s;
//     }
//     button:hover {
//       border-color: #646cff;
//     }
//     button:focus,
//     button:focus-visible {
//       outline: 4px auto -webkit-focus-ring-color;
//     }

//     @media (prefers-color-scheme: light) {
//       a:hover {
//         color: #747bff;
//       }
//       button {
//         background-color: #f9f9f9;
//       }
//     }
//   `
// }

// declare global {
//   interface HTMLElementTagNameMap {
//     'my-element': MyElement
//   }
// }
