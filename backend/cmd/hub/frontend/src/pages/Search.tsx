
import { useState } from "react";
import "./Search.css"
import axios from "axios";

function Search() {
    const [searchValue, setSearchValue] = useState("");
    const [data, setData] = useState<any>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchValue(e.target.value);
    }

     const handleSubmit = async (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key != 'Enter') {
            console.log("Not Enter");
            return;
        }

        try {
            const response = await axios.get(`http://localhost:8080/search/users/${searchValue}`, {});

                setData(response.data); 
            
            
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        };

    return (
        <div >
            {data ? JSON.stringify(data, null, 2) : 'Loading...'}
            <div className="control-container">
                <input 
                    type="text" 
                    placeholder="Search"
                    value={searchValue}
                    onChange={handleChange}
                    onKeyDown={handleSubmit}
                    />
                <button>-</button>
                <button>+</button>

            </div>

        </div>
    )
}

  export default Search;