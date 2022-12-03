import "../common/style/index.css";
import Navbar from "../common/components/NavBar";
import { db } from "../common/firebase";
import { setDoc, doc, deleteDoc, getDocs , collection } from "firebase/firestore";
import { useEffect, useState } from "react";

function App() {
  const [newUser, setNewUser] = useState();
  const [users, setUsers] = useState([])

  const createUser = async (name, age) => {
    try {
      await setDoc(doc(db, "users", name + age), {
        name,
        age,
      });
    } catch (e) {
      console.log(e);
    }
  };

  const getUsers = async () => {
    try {
      const usersRef = collection(db, "users");
      const usersSnap = await getDocs(usersRef)
      const users = [];
      usersSnap.forEach(user => users.push(user.data()));
      return users;
    } catch (e) {
      console.log(e);
    }
  }

  const deleteUser = async (userID) => {
    try {
      const userRef = doc(db, "users", userID);
      await deleteDoc(userRef)
    } catch (e) {
      console.log(e);
    }
  }

  const handleDeleteUser = async (userRef) => {
    try {
      await deleteUser(userRef);
      setUsers(await getUsers());
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    (async() => setUsers(await getUsers()))()
  }, [])

  const handleCreateUser = async (e) => {
    e.preventDefault();
    createUser(newUser.name, newUser.age);
    setUsers(await getUsers());
  };

  return (
    <div className="App">
      <Navbar />
      <form className="form" onSubmit={(e) => handleCreateUser(e)}>
        <div className="group">
          <input
            type="text"
            required
            minlength="3"
            placeholder="Name..."
            onChange={(e) =>
              setNewUser({
                ...newUser,
                name: e.target.value,
              })
            }
          />
          <span className="highlight"></span>
          <span className="bar"></span>
        </div>

        <div className="group">
          <input
            type="text"
            placeholder="Age..."
            required
            onChange={(e) =>
              setNewUser({
                ...newUser,
                age: e.target.value,
              })
            }
          />
          <span className="highlight"></span>
          <span className="bar"></span>
        </div>
        <button className="button">Create User</button>
      </form>
     {users.length > 1 && users.map((user, index) => {
      return (
        <div key={index}>
          {" "}
          <h1>Name: {user.name}</h1>
          <h1>Age: {user.age}</h1>
          <button
           
          >
            +
          </button>
          <button
          onClick={() => handleDeleteUser(user.name + user.age)}
          >
            -
          </button>
          <button
           
          >
            X
          </button>
        </div>
      );
    })}
    </div>
  );
}

export default App;
