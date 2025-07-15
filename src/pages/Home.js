import { Link } from "react-router-dom";
import ProductList from "../components/ProductList";

function Home(){
    return(
        <div>
      <h2>Home Page</h2>
      <Link to="/add">
        <button>Add Product</button>
      </Link>
    </div>
    );
}

export default Home;