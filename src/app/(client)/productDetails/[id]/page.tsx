import Image from 'next/image'
import React from 'react'

interface userType{
    id:number;
    name:string;
    roll:number;
    img:string;
    prise:number;
}
type UserDetailsProps={
    params:{
id:string
    }
}

const data:userType [] =[
     {
    id: 1,
    name: "roy",
    roll: 12,
    img: "/assets/ourUnique.jpg.png",
    prise: 200,
  },
  {
    id: 2,
    name: "sujon",
    roll: 15,
    img: "/assets/ourUnique.jpg.png",
    prise: 150,
  },
   {
    id: 3,
    name: "roy",
    roll: 12,
    img: "/assets/ourUnique.jpg.png",
    prise: 200,
  },
  {
    id: 4,
    name: "sujon",
    roll: 15,
    img: "/assets/ourUnique.jpg.png",
    prise: 150,
  }
]

export default function productDetails({params}:UserDetailsProps) {
const user = data.find((u)=> u.id===Number(params.id));
if (!user) return <p>Not user found</p>
  return (
    <div>
      <div>
        {
            data.map((index)=>{
                return <div key={index.id}>
                 
                    
           <Image src={index.img} alt='img' width={600} height={100}/>
           <p>{index.roll}</p>
   <p>{index.name}</p>
                </div>
            })
        }
      </div>
    </div>
  )
}
