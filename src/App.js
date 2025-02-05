import { useEffect, useState } from "react";
import {USERS} from "./config";
import {MapPin, Cake} from "lucide-react";

const App = () => {
  const [searchText, setSearchText] = useState("");
  const [filteredUsers, setFilteredUsers] = useState(USERS);
  const [filterCity, setFilterCity] = useState("");
  const [filterAge, setFilterAge] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");

  useEffect(() => {
    let tempFilteredUsers = USERS.filter((user) => {
      return (
        user.name.toLowerCase().includes(searchText.toLowerCase()) ||
        user.city.toLowerCase().includes(searchText.toLowerCase()) ||
        user.age.toString().includes(searchText)
      );
    });

    if (filterCity) {
      tempFilteredUsers = tempFilteredUsers.filter((user) => user.city === filterCity);
    }

    if (filterAge) {
      tempFilteredUsers = tempFilteredUsers.filter((user) => user.age === parseInt(filterAge));
    }

    if (sortOrder === "asc") {
      tempFilteredUsers.sort((a, b) => a.name.localeCompare(b.name));
    } else {
      tempFilteredUsers.sort((b, a) => a.name.localeCompare(b.name));
    }

    setFilteredUsers(tempFilteredUsers);
  }, [searchText, filterCity, filterAge, sortOrder]);

  return (
    <div className='bg-slate-100 min-h-screen'>
        <h1 className='text-center md:text-4xl text-2xl font-bold text-slate-800 py-10'>Search, Sort, Filter</h1>
        <input 
          type="text" 
          placeholder="Search" 
          className="md:w-2/3 w-[90%] p-2 bg-white mx-auto block rounded-lg md:text-2xl text-xl mb-5 focus:outline-none border border-gray-300" 
          value={searchText}
          onChange={(e) => setSearchText(e.target.value.toLocaleLowerCase())}
        />
        {searchText ? (
          <p className="text-center mt-1">
            {filteredUsers.length ===0 ? "Oops! No User Found..." : `Found ${filteredUsers.length} users for search result...`}  
          </p>
        ) : null}

        <div className="flex md:justify-around justify-center md:flex-row flex-col ml-10 md:ml-0">
          <div>
            <span className="font-bold md:text-xl">Filter By City: </span>
            <select 
              className="bg-white text-lg my-2 rounded-lg px-5 py-2 border border-gray-200 md:w-auto"
              value={filterCity}
              onChange={(e) => setFilterCity(e.target.value)}
            >
              <option value="">All</option>
              {
                USERS.map((user) => {
                  return <option key={user.city} value={user.city}>{user.city}</option>
                })
              }
            </select>
          </div>

          <div>
            <span className="font-bold md:text-xl">Filter By Age: </span>
            <select 
              className="bg-white text-lg my-2 rounded-lg px-5 py-2 border border-gray-200 w-1/3 md:w-auto"
              value={filterAge}
              onChange={(e) => setFilterAge(e.target.value)}
            >
              <option value="">All</option>
              {
                USERS.map((user) => {
                  return <option key={user.age} value={user.age}>{user.age}</option>
                })
              }
            </select>
          </div>
          
          <div>
            <span className="font-bold md:text-xl">Sort By Name: </span>
            <select 
              className="bg-white text-lg my-2 rounded-lg px-5 py-2 border border-gray-200 w-1/3 md:w-auto"
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
            >
              <option value="asc">Ascending</option>
              <option value="desc">Descending</option>
            </select>
          </div>
        </div>

        <div className="flex flex-wrap justify-around mt-5"> 
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