import styles from './App.module.css';
import React, { useState } from 'react';
import cn from 'classnames';

const data = [
  {
    "title": "Кино",
    "info": ["Группа крови", "Хочу перемен!", "Последний герой", "Пачка сигарет"],
  },
  {
    "title": "Молчат дома",
    "info": ["Клетка", "Судно", "Тоска", "Танцевать"],
  },
  {
    "title": "Дайте танк (!)",
    "info": ["Люди", "Утро", "Маленький", "Я"],
  },
  {
    "title": "Буерак",
    "info": ["Спортивные очки", "Культ тела", "Там где ты", "Танцы по расчёту"],
  },
  {
    "title": "Ploho",
    "info": ["Город устал", "Добрая песня", "По краю острова", "Сердце получает нож"],
  }
]


function App() {
  const [inputValue, setinputValue] = useState('  ')
  const [valueOnSubmit, setvalueOnSubmit] = useState('  ')

  const chosenColumn = 2

  function onChange(e) {
    setinputValue(e.target.value);
    if (e.target.value.length === 0) {
      setinputValue('  ')
    }
  }

  function handleSubmit(e) {
    setvalueOnSubmit(inputValue);
    e.preventDefault();
  }

  const foundData = []
  data.map((i, colId) => {
    if ((colId === chosenColumn)) {
      i.info.filter(data => (data.toLowerCase().includes(valueOnSubmit.toLowerCase()))).map((r) => (foundData.push(r)))
    }
    return i
  })

  return (
    <div>
      <div>
        <form onSubmit={(e) => { handleSubmit(e) }}>
          <input
            className={styles.input}
            type="text"
            placeholder='Напишите название песни'
            onChange={(e) => onChange(e)}
          />
          <input className={styles.input} type="submit" value="Поиск" />
        </form>
        <div className={styles.text}>Выбран поиск по {chosenColumn + 1} столбцу.</div>
        {foundData.length !== 0 ? <div className={styles.text}>Количество найденных совпадений: {foundData.length}</div> : <div className={styles.text}>Ничего не найдено.</div>}
      </div>
      <div className={styles.container}>
        {data.map((i) => {
          const allDataArr = []
          allDataArr.push(i.title)
          i.info.map(d => allDataArr.push(d))
          return (
            allDataArr.map((tableElement, index) => {
              return (
                <div key={index} className={cn(styles.info, {
                  [styles.found_info]: index !== 0 && foundData.includes(tableElement),
                  [styles.title]: index === 0,
                })}>{tableElement}</div>
              );
            })
          );
        })}
      </div>
      <footer className={styles.footer}>*Таблица с музыкой в жанре Постпанк. Заголовки - группы, ячейки ниже - песни.</footer>
    </div>
  );
}

export default App;
