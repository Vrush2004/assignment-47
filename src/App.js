import { useEffect, useState } from "react";
import {USERS} from "./config";
import {MapPin, Cake} from "lucide-react";

const App = () => {
  const [searchText, setSearchText] = useState("");
  const [filteredUsers, setFilteredUsers] = useState(USERS);

  useEffect(() => {
    if(!searchText){
      setFilteredUsers(USERS);
      return;
    }
    const tempFilteredUsers = USERS.filter((user) => {
      if(user.name.toLocaleLowerCase().includes(searchText)){
        return true;
      }
      else if(user.city.toLocaleLowerCase().includes(searchText)){
        return true;
      }
      else if(user.age.toString().includes(searchText)){
        return true;
      }
      else{
        return false;
      }
  })
  setFilteredUsers(tempFilteredUsers);
  }, [searchText]);

  return (
    <div className='bg-slate-100 min-h-screen'>
        <h1 className='text-center text-4xl font-bold text-slate-800 py-10'>Search, Sort, Filter</h1>
        <input 
          type="text" 
          placeholder="Search" 
          className="w-2/3 p-2 bg-white mx-auto block rounded-lg text-2xl mb-10 focus:outline-none border border-gray-300" 
          value={searchText}
          onChange={(e) => setSearchText(e.target.value.toLocaleLowerCase())}
        />
        {searchText ? (
          <p className="text-center mt-1">
            {filteredUsers.length ===0 ? "Oops! No User Found..." : `Found {filteredUsers.length} users for search result...`}  
          </p>
        ) : null}

        <div className="flex justify-around">
          <div>
            <span>Filter By City: </span>
            <select className="bg-white text-lg my-2 mx-5 rounded-lg px-5">
              <option value="">All</option>
              <option value="Mumbai">Mumbai</option>
              <option value="Pune">Pune</option>
              <option value="Delhi">Delhi</option>
            </select>
          </div>
          <div>
          <span>Filter By Age: </span>
            <select>
              <option value="">All</option>
              <option value="Mumbai">Mumbai</option>
              <option value="Pune">Pune</option>
              <option value="Delhi">Delhi</option>
            </select>
          </div>
        </div>

        <div className="flex flex-wrap justify-around mt-10"> 
          {filteredUsers.map((userData, index) => {
              const {name, city, age, avatar} = userData;

              return (
                  <div className="bg-white shadow-lg mb-5 mx-6 px-5 py-2 rounded-lg w-[400px] flex" key={index}>
                    <img src={avatar} alt="" className="h-12 rounded-full mr-4"/>
                        <div>
                            <h1 className="font-bold text-lg border-b border-gray-200 pb-2">{name}</h1>
                            <div className="flex items-center mt-2">
                              <p className="w-[150px] flex items-center">
                                  <MapPin className="inline"/> {city} 
                              </p>
                              <p className="flex items-center">
                                  <Cake className="ml-4 inline "/> {age}
                              </p>
                            </div>
                        </div>
                  </div>
              )
          })}
        </div>
    </div>
  )
}

export default App