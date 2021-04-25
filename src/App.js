import './App.css';
import React, {useState, useRef} from 'react';

const ToDoList = (props) => {
  const text = props.textList;
  return (
    <ul className="list">
      {text?.map((item, index) =>
        <li key={index} onClick={() => props.deleteElement(index)} className="item">
          {item}
        </li>
      )}
    </ul>
  );
}
const CustomParent = () => {
  const [textInputValue, setTextInputValue] = useState('');
  const [toDoList, setToDoList] = useState([]);
  const inputRef = useRef(null);

  const deleteElement = (elementIndex) => {
    setToDoList(toDoList.filter((item, index) =>index !== elementIndex))
  }
  const setValue = (event) => setTextInputValue(event.target.value);
  const addElement = () => {
    if (textInputValue !== '') {
      setToDoList([...toDoList, textInputValue]);
      setTextInputValue('');
    }
      focusTextInput();
  };
  const onEnterPress = (event) => {
    if (event.charCode === 13) {
      addElement();
    }
  }
  const clearList = () => {
    setToDoList([]);
    setTextInputValue('');
    focusTextInput();
  }
  const focusTextInput = () => {
    console.log(inputRef.current);
    inputRef.current.focus();
  }

  return (
    <div className="container">
      <div className="oMyBox commonContainer">
        <CustomInput
         value={textInputValue}
         onChange={setValue}
         onKeyPress={onEnterPress}
         inputRef={inputRef}
        />
        <button onClick={addElement} className="superButton">Add</button>
        <button onClick={clearList} className="superButton">Clear</button>
      </div>
      <div className="listContainer commonContainer">
        <ToDoList textList={toDoList} deleteElement={deleteElement} />
      </div>
    </div>);
}
const CustomInput = (props) => {
    return (
      <input
        type = "text"
        value={props.value}
        onChange={props.onChange}
        onKeyPress={props.onKeyPress}
        ref={props.inputRef}
        className="textInput"
        placeholder={"Enter text"}
      />
    );
}

function App() {
  return (
    <div className="App">
      <CustomParent/>
    </div>
  );
}

export default App;
