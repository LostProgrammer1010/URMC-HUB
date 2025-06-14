import axios from "axios";
import { useEffect } from "react";
import "./UserCard.css";

function UserCard() {
    
    useEffect(() => {
        axios.get('http://localhost:8080/search/users/dmeyer20')
        .then((res) => console.log(res.data))
        .catch(console.error);
    }, []);


    return (
        <div>
            <div className="user-container">
            </div>
        </div>
    )
}

  export default UserCard;