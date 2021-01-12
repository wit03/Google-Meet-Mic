import { Fragment, h } from "preact";
import { useState, useEffect } from "preact/hooks"

// eslint-disable-next-line no-unused-vars
import style from "./style.css";

import firebase from '../../components/firebase'
import 'firebase/firestore'

const Home = () => {
  let db = firebase.firestore();
  const [checked, setChecked] = useState(false)
  const [userId, setUserId] = useState("userid")
  useEffect( () => {
      const ref = db.collection("user").doc(userId);
      if (localStorage.getItem("userID") != null) {
        setUserId(localStorage.getItem("userID")) 
        console.log('localstorage exist')
      }
      else {
        localStorage.setItem("userID", Math.floor(Math.random() * 900000) + 100000);
        setUserId(localStorage.getItem("userID"))
        db.collection("user").doc(userId).set({ check: checked })
        console.log('localstorage dont exist')
      }
      ref.get().then((doc)=> {
        if(doc.exists) {
          setChecked(doc.data().check) 
          console.log(doc.exists)
        }
        else {
          console.log('doc dont exist')
          db.collection("user").doc(userId).set({ check: checked })
        }
      });
    }, [])
  const handleChange = (e) => {
    db.collection("user").doc(userId).set({ check:  e.target.checked})
  }
  return (
    <Fragment>
      <h1>Tap to mute</h1>
      <input type="checkbox" id="switch" onChange={handleChange} checked={checked} />
	  <label for="switch">Toggle</label>
      <h3 class={style.id}>Your ID: {userId}</h3>
    </Fragment>
  );
};

export default Home;
