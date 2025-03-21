import React from 'react';
import { createElement } from './utils.js';
import './styles.css';

/**
 * Приложение
 * @param store {Store} Состояние приложения
 * @returns {React.ReactElement}
 */
function App({ store }) {
  const list = store.getState().list;

  return (
    <div className="App">
      <div className="App-head">
        <h1>Приложение на чистом JS</h1>
      </div>
      <div className="App-controls">
        <button onClick={() => store.addItem()}>Добавить</button>
      </div>
      <div className="App-center">
        <div className="List">
          {list.map(item => (
            <div key={item.code} className="List-item">
              <div
                className={'Item' + (item.selected ? ' Item_selected' : '')}
                onClick={(event) => store.selectItem(item.code, event)}
              >
                <div className="Item-code">{item.code}</div>
                <div className="Item-title">
                {item.title}
                {item.selectedCount > 0 ? <span className="Item-count"> | Выделяли {item.selectedCount} раз</span> : null}
                </div>
                <div className="Item-actions">
                  <button onClick={(event) => { 
                    store.deleteItem(item.code),
                    event.stopPropagation(); // Останавка всплытия события, чтобы клик обрабатывался только кнопкой "Удалить", а не родительским элементом
                    }}>
                      Удалить</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
