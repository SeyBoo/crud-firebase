import "../common/style/index.css";
import Navbar from "../common/components/NavBar";

function App() {
  return (
    <div className="App">
      <Navbar />
      <form className="form">
        <div className="group">
          <input
            type="text"
            required
            minlength="3"
            placeholder="Name..."
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
