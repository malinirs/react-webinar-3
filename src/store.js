/**
 * Хранилище состояния приложения
 */
class Store {
  constructor(initState = {}) {
    this.state = initState;
    this.listeners = []; // Слушатели изменений состояния
    this.nextCode = Math.max(0, ...this.state.list.map(item => item.code)) + 1; // Выбирает max число наяиная с 0
  }

  /**
   * Подписка слушателя на изменения состояния
   * @param listener {Function}
   * @returns {Function} Функция отписки
   */
  subscribe(listener) {
    this.listeners.push(listener);
    // Возвращается функция для удаления добавленного слушателя
    return () => {
      this.listeners = this.listeners.filter(item => item !== listener);
    };
  }

  /**
   * Выбор состояния
   * @returns {Object}
   */
  getState() {
    return this.state;
  }

  /**
   * Установка состояния
   * @param newState {Object}
   */
  setState(newState) {
    this.state = newState;
    // Вызываем всех слушателей
    for (const listener of this.listeners) listener();
  }

  /**
   * Добавление новой записи
   */
  addItem() {
    const newItem = {
      code: this.nextCode,
      title: 'Новая запись',
    }

    this.nextCode += 1;

    this.setState({
      ...this.state,
      list: [...this.state.list, newItem],
    });
  }

  /**
   * Удаление записи по коду
   * @param code
   */
  deleteItem(code) {
    this.setState({
      ...this.state,
      list: this.state.list.filter(item => item.code !== code),
    });
  }

  /**
   * Выделение записи по коду
   * @param code
   */
  selectItem(code, event) {
    const isSelectMulti = event.ctrlKey || event.metaKey;

    this.setState({
      ...this.state,
      list: this.state.list.map(item => {
        if (item.code === code) {
          return { ...item, selected: !item.selected }; // selected = !undefined = true
        } else if (isSelectMulti) {
          return item;
        } return { ...item, selected: false }; // В остальных случаях сбрасываем выделение
      }),
    });
  }
}

export default Store;
