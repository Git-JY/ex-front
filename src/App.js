import axios from 'axios';
import { useEffect, useState } from 'react';
// 바꾼 거: https://port-0-jsonserver-6w1j2alm4a7mi8.sel5.cloudtype.app/


// 컴포넌트를 파일별로 안 나눈 경우(이 경우 inport 할 필요가 없음)
function List({data, setData}) {

  const remove = (id) => {

    axios.delete(`${process.env.REACT_APP_SERVER}/abc/${id}`)
    .then(res => {
      setData(res.data);
    })
    // console.log(setData);
    // console.log(id);
  
  }//remove() 함수정의 

  return(
    <>
    {
      data.map(obj => (
        <li key={obj.id}>
          {obj.msg}
          <button onClick={()=>{remove(obj.id)}}>삭제</button>
        </li> 
      ))
    }
    </>

  )
}// function List() 컴포넌트



function Write({setData}) {
  const insert = (e) =>{ 
    e.preventDefault();

    let msg = e.target.msg.value;
    axios.post(`${process.env.REACT_APP_SERVER}/insert`,{msg} 
    )//axios.post(`${process.env.REACT_APP_SERVER}/insert`
    .then(res => {
      setData(res.data);
    })

    // console.log(e.target.msg.value);
  }//insert() 함수 정의
  
  
  return(
  <div>
      <form onSubmit={insert}>
        <input type='text' name='msg'/>
        <input type='submit' value='저장'/>
      </form>
  </div>
  )
}// function Write() 컴포넌트 



function App() {
  //1.)
  // axios.get('http://localhost:3030/abc?id=100') //해당 도메인의 index.js에서 'Hello World'가져옴
  // .then(res => {
  //   console.log('---', res);
  // }) 

  //2.)
  // axios.get('http://localhost:3030/abc/2') 
  // .then(res => {
  //   console.log('---', res);
  // }) 

  // axios.get('https://port-0-jsonserver-6w1j2alm4a7mi8.sel5.cloudtype.app/abc/2') //cloudType에 올려서 얻은 서버로 바꿈
  // .then(res => {
  //   console.log('서버에 올린 거', res);
  // }) 

  /* ${process.env.REACT_APP_SERVER}는 ex-front의 .env로 서버명 바꾼 거 */ 
  // axios.get(`${process.env.REACT_APP_SERVER}/abc/2`) //cloudType에 올려서 얻은 서버로 바꿈
  // .then(res => {
  //   console.log('서버에 올린 거', res);/* 우리가 이렇게 콘솔로 찍어서 보여준 게 아닌 이상 server url못봄 */
  // }) 


  // axios.post('http://localhost:3030/insert', {id:1000, name: '신규데이터'}) 

  const [data, setData]  = useState([]);

  const getData = () => {
    axios.get(`${process.env.REACT_APP_SERVER}/abc`)
    .then(res => {
      setData(res.data);
    });
  }//getData() 함수정의

  useEffect(() => {
    getData(); // getData()안의 setData(res.data); 때문에 useEffect()안에 넣음 //무한 반복 렌더링을 막기 위함
  }, []);

  return (
    <div>
      <h2>한줄탯글(7)</h2>
        <Write setData={setData}/>
      <ul>
        <List data={data} setData={setData}/>
      </ul>
    </div>
  );
}//function App() 컴포넌트

export default App;
