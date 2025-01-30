import {USERS} from "./config";
import {MapPin, Cake} from "lucide-react";

const App = () => {
  return (
    <div className='bg-slate-100 min-h-screen'>
        <h1 className='text-center text-4xl font-bold text-slate-800 py-10'>Search, Sort, Filter</h1>
        <div className="flex flex-wrap justify-around"> 
          {USERS.map((userData, index) => {
              const {name, city, age, avatar} = userData;

              return (
                  <div className="bg-white shadow-lg mb-5 mx-6 px-5 py-2 rounded-lg w-[400px] flex" key={index}>
                    <img src={avatar} alt="" className="h-12 rounded-full mr-4"/>
                        <div>
                            <h1 className="font-bold text-lg">{name}</h1>
                            <div className="flex items-center">
                              <p className="w-[150px]">
                                  <MapPin className="inline"/> {city} 
                              </p>
                              <Cake className="ml-4 inline "/> {age}
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