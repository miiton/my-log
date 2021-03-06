import React, { Component } from "react";
import "./App.css";
import ToDoListItem from "./ToDoListItem.js";

class App extends Component {
  // constructor(props) {
  //   super(props);

  //   this.state = {
  //     delete: false
  //   };
  // }

  // ToDoListをstateに定義、初期値はlocalStorageから取得または []
  state = {
    todoList: JSON.parse(localStorage.getItem("todoList")) || [],
    removeTodo: this.removeTodo
  };

  // todoList itemの追加
  addTodo = (item, callBack) => {
    // todoList stateに追加
    this.setState(
      {
        todoList: this.state.todoList.concat(item),
        removeTodo: this.removeTodo
      },
      () => {
        // localStorageにtodoList stateを保存
        localStorage.setItem("todoList", JSON.stringify(this.state.todoList));
        // callBack関数が引数に渡されていた場合に実行
        callBack && callBack();
      }
    );
  };

  // todoListからitemを削除
  removeTodo = (i, callBack) => {
    this.setState(
      {
        todoList: this.state.todoList.splice(i, 1)
      },
      () => {
        // localStorageにtodoList stateを保存
        localStorage.setItem("todoList", JSON.stringify(this.state.todoList));
        // callBack関数が引数に渡されていた場合に実行
        callBack && callBack();
      }
    );
  };

  render() {
    return (
      <div className="App">
        <form
          className="App-form"
          onSubmit={e => {
            // formのデフォルトのイベントをキャンセル
            e.preventDefault();

            // idがtitleのElementを取得
            const titleElement = e.target.elements["title"];
            // idがdescriptionのElementを取得
            const descriptionElement = e.target.elements["description"];
            // idがtimeのElementを取得
            const timeElement = e.target.elements["time"];
            // idがlocationのElementを取得
            const locationElement = e.target.elements["location"];

            this.addTodo(
              {
                title: titleElement.value,
                description: descriptionElement.value,
                time: timeElement.value,
                location: locationElement.value
              },
              () => {
                // stateの変更後に入力した値を空にする
                titleElement.value = "";
                descriptionElement.value = "";
                timeElement.value = "";
                locationElement.value = "";
              }
            );
          }}
        >
          <div>
            <input id="title" placeholder="title" />
            <textarea id="description" placeholder="description" />
            <textarea id="time" placeholder="time" />
            <textarea id="location" placeholder="location" />
          </div>
          <div>
            <button type="submit">登録</button>
          </div>
        </form>
        <div>
          {/* todoList配列の要素数分ToDoListItemコンポーネントを展開 */}
          {this.state.todoList.map((todo, i) => (
            <ToDoListItem
              key={todo.title}
              title={todo.title}
              description={todo.description}
              time={todo.time}
              location={todo.location}
              // クリックされたItemをtodoList stateから削除
              // onClick={() => this.removeTodo(i)}
              // onClick={() => this.removeTodo(todo)}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default App;
