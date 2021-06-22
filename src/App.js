import React, { useState } from 'react';
import './css/App.css';

const App = ()=> {
const msg = useState("msg");
  return (
    <div className="App">
      <div className="wrapper all container">
    <div className="wrapper title">
      <h1>ドラフトごっこ(β)</h1>
    </div>
    <div className="wrapper inputbox">
      <div className="create row">
        <h2>部屋を作成</h2>
        <form id="create_form" action="/room" method="POST">
          <div className="row">
            <div className="input-field col s6">
              <label>ニックネーム</label>
              <input type="text" className="validate" id="careate_name" autoComplete="off" name="name" required />
            </div>
            <div className="input-field col s6">
              <label>部屋ID</label>
              <input type="text" className="validate" autoComplete="off" name="id" required />
            </div>
            <div className="input-field col s6">
              <label>タイトル</label>
              <input type="text" autoComplete="off" name="title" />
            </div>
            <div className="input-field col s6">
                <select name="end" form="create_form">
                    <option value="10">10</option>
                    <option value="9">9</option>
                    <option value="8">8</option>
                    <option value="7">7</option>
                    <option value="6">6</option>
                    <option value="5">5</option>
                    <option value="4">4</option>
                    <option value="3">3</option>
                    <option value="2">2</option>
                    <option value="1">1</option>
                </select>
                <label>終了巡目数</label>
              </div>
            <div className="input-field col s12">
              <label>ドラフト候補一覧</label>
              <textarea name="drafted" className="materialize-textarea" rows="8" cols="50"
                required></textarea>
            </div>
          </div>
          <div>
            <p id="msg">{msg}</p>
          </div>
          <div className="roomButton">
            <button className="btn waves-effect waves-light" type="submit" name="action">
              作成
            </button>
          </div>
        </form>
      </div>
      <div className="in" id="in_room_wrapper">
        <h2>部屋に入室</h2>
        <form id="in_form" action="/room" method="POST">
          <div className="input-field col s6">
            <label>ニックネーム</label>
            <input type="text" id="in_name" autoComplete="off" name="name" required />
          </div>
          <div className="input-field col s6">
            <label>部屋ID</label>
            <input type="text" id="in_channel" autoComplete="off" name="id" required />
          </div>
          <div className="roomButton">
            <button className="btn waves-effect waves-light" type="submit" name="action">
              入室
            </button>
          </div>
        </form>
      </div>
    </div>
    <div className="container howto">
      <h3>遊び方</h3>
      <ol>
        <li>ニックネーム、部屋ID、タイトル、ドラフト候補を入力して部屋を作成。ドラフト候補は一つを一行づつ入力してください。または既に存在する部屋にニックネームと部屋IDを入力して入室</li>
        <li>メンバーが揃って準備ができたらREADYボタンをクリック</li>
        <li>獲得したいドラフト候補を選択して指名ボタンをクリック</li>
      </ol>
      <h3>ルール</h3>
      <ul>
        <li>　同一順目で競合した場合、指名者内から抽選し、抽選負けの場合は再指名</li>
        <li>全員が1人獲得確定したら1順終了</li>
        <li>設定した終了巡目数まで指名、または参加人数よりドラフト候補が少なくなったら終了</li>
      </ul>
    </div>
  </div>
    </div>
  );
}

export default App;
