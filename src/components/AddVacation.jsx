import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

export default function AddVacation({ history }) {

    const user = useSelector(state => state.user)

    useEffect(() => {
        if (!user.login || user.role !== "admin") {
            history.push("/")
        }
    }, [])


    const [descrip, setdescrip] = useState("")
    const [dest, setdest] = useState("")
    const [picture, setpicture] = useState("")
    const [dept, setdept] = useState("")
    const [arv, setarv] = useState("")
    const [price, setprice] = useState("")

    const handleSubmit = async e => {
        e.preventDefault()
        if (descrip === "" || dest === "" || picture === "" || dept === "" || arv === "" || price === "") {
            alert("hey sir you need to fill all the feilds before adding a vacation!")
        } else {
            try {
                let res = await fetch("http://localhost:1000/vacations/add", {
                    method: "POST",
                    headers: { "content-type": "application/json", "Authorization": localStorage.token },
                    body: JSON.stringify({ descrip, dest, picture, dept, arv, price })
                })
                let data = await res.json()
                console.log(data)
                history.push("/")
            } catch (err) {
                console.log(err)
            }
        }
    }


    return (
        <div className="header">
            <Link to="/">back</Link>
            <h1>add vacation</h1>
            <form onSubmit={handleSubmit} >
                <input onChange={e => setdest(e.target.value)} type="text" placeholder="destination" />
                <input onChange={e => setdescrip(e.target.value)} type="text" placeholder="description" />
                <input onChange={e => setpicture(e.target.value)} type="text" placeholder="picture_URL" />
                <input onChange={e => setdept(e.target.value)} type="date" placeholder="departure" />
                <input onChange={e => setarv(e.target.value)} type="date" placeholder="Return" />
                <input onChange={e => setprice(e.target.value)} type="number" placeholder="price" />
                <button>Add vacation</button>
            </form>
        </div>
    )
}
