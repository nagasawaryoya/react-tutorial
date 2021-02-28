export class StringUtil {
  /**
   *  メッセージ文フォーマット
   *  'あああ{0}いいいい{1}うううう'などの可変指定メッセージのフォーマットを行う。
   * @param メッセージ文
   * @param params 可変値パラメータ
   * @returns フォーマット後の文字列
   */
  public static format = (msg: string, ...params: any[]) => {
    for (let i = 0; i < params.length; i += 1) {
      msg = msg.replace(new RegExp('\\{' + i + '\\}', 'g'), params[i]);
    }
    return msg;
  };
}
