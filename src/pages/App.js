import "../common/style/index.css";
import Navbar from "../common/components/NavBar";
import { db } from "../common/firebase";
import { setDoc, doc } from "firebase/firestore";
import { useState } from "react";

function App() {
  const [newUser, setNewUser] = useState();

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

  const handleCreateUser = async (e) => {
    e.preventDefault();
    createUser(newUser.name, newUser.age);
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
          />
          <span className="highlight"></span>
          <span className="bar"></span>
        </div>
        <button className="button">Create User</button>
      </form>
    </div>
  );
}

export default App;
