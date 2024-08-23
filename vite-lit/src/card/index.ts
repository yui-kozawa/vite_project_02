import { LitElement, html,css, nothing } from "lit";
import { customElement, property } from "lit/decorators.js";
// import styles from "./_assets/style.css"; //style-loaderやcss-loaderなどのローダーが正しく設定されていないと、CSSファイルをモジュールとして扱うことができないためエラー？


@customElement('c-card')
export class card extends LitElement {
//   static styles = unsafeCSS(styles);

    //-----------------------------
    //コンポーネント内のCSS
    //-----------------------------
    static styles = css`
        .card__item {
            display: flex;
            flex-direction: column;
            height: 100%;

            /* flex-grow: 1; */
        }

        .card__item.-border {
            border: 1px solid #ccc;
						border-radius: 10px;

        }

				/* aタグの場合のクラス名 */
        .card__link {
            position: relative;
            display: flex;
            flex-direction: column;
            color: #333;
            text-decoration: none;
						border-radius: 10px;
						overflow: hidden;
						flex: 1;
						transition: box-shadow 0.2s;
        }

				/* aタグのじゃない場合のクラス名 */

				.card__box {
					position: relative;
					display: flex;
					flex-direction: column;
					color: #333;
					border-radius: 10px;
					overflow: hidden;
					flex: 1;

				}

        .card__link:hover {
					box-shadow: 0px 0px 15px -5px #777777;
        }

        .card__img {
            width: 100%;
        }

        .card__img img {
            width: 100%;
            height: 100%;
            display: block;
            object-fit: cover;
            /* aspect-ratio: 16/9; */
        }

        .card__ttl {
            font-size: 20px;
            color: #333;
        }

        .card__txt {
            font-size: 16px;
        }
    `;

  @property({type: Boolean})
  border = false; //カードの枠線がつくかどうか

  @property()
  href: string = ""; //リンク先

  @property({type: Boolean})
  blank = false; //別窓かどうか

  @property()
  width: string = ""; //画像幅

  @property()
  height: string = ""; //画像高さ

  @property()
  src: string = ""; //画像のURL

  @property()
  srcSP: string = ""; //画像のURL

  @property()
  alt: string = ""; //画像alt

  @property()
  ratio: string = "16/9"; //画像のアス比
// ratio: Ratio = "16:9"; //画像のアス比 ⇨これを使うには RatioのLibraryを入れなきゃならなさそう？ヤンマー参考

/*
実装メモ--------------------------------------
target="_blank" => HTML側で blank と記載あったら（trueだったら） 属性付与／何も記載がなければレンダリングされない（false）
noopener => HTML側で blank と記載あったら（trueだったら） 属性付与／何も記載がなければレンダリングされない（false）
--------------------------------------
*/
    override render() { //テンプレートリテラルで記載するときは、return が必要かも
      return  html`
        <div class="card__item ${this.border ? "-border" : ""}">
					${this.href

						//aタグの場合
						? html `
							<a href="${this.href}"
                class="card__link"
                target="${this.blank ? "_blank" : nothing}"
                rel="${this.blank ? "noopener" : nothing}"
                >
                <div class="card__img">
                    <picture>
                        <source media="(max-width: 768px)" srcset="${this.srcSP}">
                        <img
                            src="${this.src}"
                            alt="${this.alt}"
                            width="${this.width}"
                            height="${this.height}"
                            style="aspect-ratio: ${this.ratio};"
                        >
                    </picture>
                </div>
                <slot name="ttl" class="card__ttl"></slot>
                <slot name="txt" class="card__txt"></slot>
							</a>
						`
						// aタグじゃない場合
						: html `
							<div class="card__box">
                <div class="card__img">
                    <picture>
                        <source media="(max-width: 768px)" srcset="${this.srcSP}">
                        <img
                            src="${this.src}"
                            alt="${this.alt}"
                            width="${this.width}"
                            height="${this.height}"
                            style="aspect-ratio: ${this.ratio};"
                        >
                    </picture>
                </div>
                <slot name="ttl" class="card__ttl"></slot>
                <slot name="txt" class="card__txt"></slot>
							</div>
						`
					}

        </div>
    `
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'c-card': card
    }
}
