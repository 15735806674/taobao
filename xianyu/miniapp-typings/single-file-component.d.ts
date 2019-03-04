/**
 * App 实例
 *
 * 仅在 SFC 可用。
 */
declare module '@core/app' {
  /**
   * 添加 App 级别事件监听
   * @param name 事件名
   * @param callback 回调函数
   */
  declare function on(name: string, callback: Function): void;

  /**
   * 移除 App 级别事件监听
   * @param name 事件名
   * @param callback 对应的回调函数引用
   */
  declare function off(name: string, callback: Function): void;
}
