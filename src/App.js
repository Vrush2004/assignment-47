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

  useEffect(() => {
    if(!filterCity && !filterAge){
      setFilteredUsers(USERS);
      return;
    }

    const tempFilteredUsers = USERS.filter((user) =>{
      if(filterCity && user.city === filterCity && filterAge && user.age === parseInt(filterAge)){
        return true;
      }

      if(filterAge && !filterCity && user.age === parseInt(filterAge)){
        return true;
      }

      if(filterCity && !filterAge && user.city === filterCity){
        return true;
      }

      return false;
    })

    setFilteredUsers(tempFilteredUsers);
  }, [filterCity, filterAge])

  useEffect(()=> {
    const tempSortedUser = filteredUsers.sort((a,b)=>{
      if(sortOrder === 'asc'){
        return a.name.localeCompare(b.name)
      }else{
        return b.name.localeCompare(a.name)
      }
    });

    setFilteredUsers([...tempSortedUser])
  },[sortOrder, filteredUsers])

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
            <select 
              className="bg-white text-lg my-2 rounded-lg px-5"
              value={filterCity}
              onChange={(e) => setFilterCity.target.value}
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
            <span>Filter By Age: </span>
            <select 
              className="bg-white text-lg my-2 rounded-lg px-5"
              value={filterAge}
              onChange={(e) => setFilterAge.target.value}
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
            <span>Sort By Name: </span>
            <select 
              className="bg-white text-lg my-2 rounded-lg px-5"
              value={sortOrder}
              onChange={(e) => setSortOrder.target.value}
            >
              <option value="asc">Ascending</option>
              <option value="desc">Descending</option>
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