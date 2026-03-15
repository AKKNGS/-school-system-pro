
"use client"

import { useEffect, useState } from "react"
import { supabase } from "../lib/supabase"

export default function Dashboard(){

  const [students,setStudents]=useState([])

  async function loadStudents(){
    const { data } = await supabase.from("students").select("*")
    if(data) setStudents(data)
  }

  useEffect(()=>{
    loadStudents()
  },[])

  return(
    <main style={{padding:40}}>

      <h1>School System Pro Ultra</h1>

      <button onClick={addStudent}>Add Student</button>

      <table border="1" cellPadding="10" style={{marginTop:20}}>

        <thead>
          <tr>
            <th>Name</th>
            <th>Gender</th>
            <th>Grade</th>
            <th>Teacher</th>
            <th>Edit</th>
          </tr>
        </thead>

        <tbody>

        {students.map((s)=>(
          <tr key={s.id}>
            <td>{s.name}</td>
            <td>{s.gender}</td>
            <td>{s.grade}</td>
            <td>{s.teacher}</td>

            <td>
              <button onClick={()=>editStudent(s)}>Edit</button>
            </td>
          </tr>
        ))}

        </tbody>

      </table>

    </main>
  )
}

function addStudent(){
  alert("Add student form coming next version")
}

function editStudent(student){
  alert("Edit student: "+student.name)
}
