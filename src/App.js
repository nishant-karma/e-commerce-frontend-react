import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home  from './pages/Home';
import AddProducts from "./pages/AddProducts";

function App(){
    return(
        <Router>
      <div>
        <nav style={{ marginBottom: "20px" }}>
          <Link to="/" style={{ marginRight: "10px" }}>Home</Link>
          <Link to="/add">Add Product</Link>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/add" element={<AddProducts />} />
        </Routes>
      </div>
    </Router>

    );
}

export default App;