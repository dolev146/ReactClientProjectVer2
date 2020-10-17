import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

export default function AddFlight({ history }) {

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
        try {
            let res = await fetch("http://localhost:1000/flights/add", {
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


    return (
        <div className="header">
            <Link to="/">back</Link>
            <h1>add flight</h1>
            <form onSubmit={handleSubmit} >
                <input onChange={e => setdescrip(e.target.value)} type="text" placeholder="descrip" />
                <input onChange={e => setdest(e.target.value)} type="text" placeholder="dest" />
                <input onChange={e => setpicture(e.target.value)} type="text" placeholder="picture" />
                <input onChange={e => setdept(e.target.value)} type="date" placeholder="dept" />
                <input onChange={e => setarv(e.target.value)} type="date" placeholder="arv" />
                <input onChange={e => setprice(e.target.value)} type="number" placeholder="price" />
                <button>Add Flight</button>
            </form>
        </div>
    )
}
