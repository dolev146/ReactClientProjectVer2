import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

export default function EditFlight({ match, history }) {

    const user = useSelector(state => state.user)

    const [descrip, setdescrip] = useState("")
    const [dest, setdest] = useState("")
    const [dept, setdept] = useState("")
    const [arv, setarv] = useState("")
    const [price, setprice] = useState("")



    const handleSubmit = async e => {
        e.preventDefault()
        try {
            let res = await fetch("http://localhost:1000/flights/" + match.params.id, {
                method: "PUT",
                headers: { "content-type":"application/json", "Authorization": localStorage.token },
                body: JSON.stringify({ descrip, dest, dept, arv, price })
            })
            let data = await res.json()
            console.log(data[0])
            history.push("/")
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        if (!user.login || user.role !== "admin") {
            history.push("/")
        }
        (async () => {
            let res = await fetch("http://localhost:1000/flights/" + match.params.id)
            let data = await res.json()
            console.log(data[0])
            setdescrip(data[0].descrip)
            setdest(data[0].dest)
            setdept(data[0].dept)
            setarv(data[0].arv)
            setprice(data[0].price)
        })()
    }, [])
    return (
        <div className="header">
            <form onSubmit={handleSubmit} >
                <input value={descrip} onChange={e => setdescrip(e.target.value)} type="text" placeholder="descrip" />
                <input value={dest} onChange={e => setdest(e.target.value)} type="text" placeholder="dest" />
                <input value={dept} onChange={e => setdept(e.target.value)} type="date" placeholder="dept" />
                <input value={arv} onChange={e => setarv(e.target.value)} type="date" placeholder="arv" />
                <input value={price} onChange={e => setprice(e.target.value)} type="number" placeholder="price" />
                <button>Add Flight</button>
            </form>
        </div>
    )
}
