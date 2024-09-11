import { LitElement, html,css, nothing } from "lit";
import { customElement, property } from "lit/decorators.js";

// import styles from "./_assets/style.css"; //style-loaderやcss-loaderなどのローダーが正しく設定されていないと、CSSファイルをモジュールとして扱うことができないためエラー？

@customElement('c-btn')
export class btn extends LitElement {

    static styles = css`

        button {
        padding: 0;
        border: none;
        outline: none;
        font: inherit;
        color: inherit;
        background: none
        }
        .btn {
            /* display: inline-block; */
        position: relative;
        border-radius: 9999px;
        background-color: rgb(218, 64, 40);
        color: #fff;
        min-width: 300px;
        min-height: 56px;
        padding: 8px 48px;
        text-decoration: none;
        text-align: center;
        box-sizing: border-box;
        display: flex;
        align-items: center;
        justify-content: center;
        width: fit-content;
        }

        .btn i {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        }

        .btn.right i {
        right: 24px;
        }
        .btn.left i {
        left: 24px;
        }
        .btn.sm {
        min-height: 48px;
        font-size: 12px;
        padding: 8px 32px;
        }
        .btn.sm.right i {
        right: 16px;
        }
        .btn.sm.left i {
        left: 16px;
        }

    `

    //デコレータ
    @property()
    href: string = ""; //リンク先

    @property({type: String})
    color: "primary" | "secondary" | "disable" = "primary";

    @property({type: String})
    icon: "arrow_r" | "arrow_l" | "pdf" | "blank" = "arrow_r";

    @property()
    label: string = "";

    // @property({type: String})
    // type: "link" | "button" = "link";

    @property()
    size: "base" | "sm" = "base";

    @property({type: Boolean})
    blank = false;

    @property({type: String})
    prefix: "left" | "right" = "right";

    _iconMark() {
        console.log(this.icon)
        switch(this.icon) {
            case "arrow_l": {
                html  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z"/></svg>`
                break;
            }
            case "arrow_r": {
                html  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z"/></svg>`
                break;
            }
            case "pdf": {
                console.log('ueeei')
                html `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M320 0c-17.7 0-32 14.3-32 32s14.3 32 32 32l82.7 0L201.4 265.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L448 109.3l0 82.7c0 17.7 14.3 32 32 32s32-14.3 32-32l0-160c0-17.7-14.3-32-32-32L320 0zM80 32C35.8 32 0 67.8 0 112L0 432c0 44.2 35.8 80 80 80l320 0c44.2 0 80-35.8 80-80l0-112c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 112c0 8.8-7.2 16-16 16L80 448c-8.8 0-16-7.2-16-16l0-320c0-8.8 7.2-16 16-16l112 0c17.7 0 32-14.3 32-32s-14.3-32-32-32L80 32z"/></svg>`
                // html  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><!--!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M0 64C0 28.7 28.7 0 64 0L224 0l0 128c0 17.7 14.3 32 32 32l128 0 0 288c0 35.3-28.7 64-64 64L64 512c-35.3 0-64-28.7-64-64L0 64zm384 64l-128 0L256 0 384 128z"/></svg>`
                break;
            }
        }
    }

    override render() {
        //font awesomeだとShadowDOM内ではCSS読み込めないからダメかも

        const icon = html`
        ${this.blank
            ? html `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M320 0c-17.7 0-32 14.3-32 32s14.3 32 32 32l82.7 0L201.4 265.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L448 109.3l0 82.7c0 17.7 14.3 32 32 32s32-14.3 32-32l0-160c0-17.7-14.3-32-32-32L320 0zM80 32C35.8 32 0 67.8 0 112L0 432c0 44.2 35.8 80 80 80l320 0c44.2 0 80-35.8 80-80l0-112c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 112c0 8.8-7.2 16-16 16L80 448c-8.8 0-16-7.2-16-16l0-320c0-8.8 7.2-16 16-16l112 0c17.7 0 32-14.3 32-32s-14.3-32-32-32L80 32z"/></svg>` : ""}
        `
        // const icon2 = this._iconMark();

        const icon2 = html`
        ${this.icon ? this._iconMark() : ""}
        `


        return html `
        ${this.href
            ? html`
                <a
                href="${this.href}"
                target="${this.blank ? "_blank" : nothing}"
                class="btn ${this.blank ? "blank" : ""} ${this.size == "sm" ? "sm" : ""}"
                rel="${this.blank ? "noopener" : nothing}"
                >
                ${this.label}
                ${icon}
                ${icon2}
                </a>
            `
            : html `
                <button
                class="btn ${this.size}"
                >
                ${this.label}

                </button>
            `
        }
        `
    }

}

declare global {
    interface HTMLElementTagNameMap {
        'c-btn': btn
    }
}
