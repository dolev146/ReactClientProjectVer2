import { Button } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import FilterVacations from './FilterVacations'
import Flight from './Flight'
import Logout from './Logout'
import NoResultBar from './NoResultBar'
import Searchbar from './Searchbar'


export default function Flights({ history }) {

    const [flights, setFlights] = useState([])
    const [show, setshow] = useState("All")

    const dispatch = useDispatch()
    const user = useSelector(state => state.user)

    useEffect(() => {
        (async () => {
            if (!user.login || user.role === "admin") {
                let res = await fetch("http://localhost:1000/flights/")
                let data = await res.json()
                setFlights(data)
            } else if (user.role === "user") {
                let url = show === "All" ? "http://localhost:1000/flights/regular/" : "http://localhost:1000/flights/followed/"
                let res = await fetch(url + user.userid, {
                    method: "GET",
                    headers: { "content-type": "application/json", "Authorization": localStorage.token }
                })
                let data = await res.json()
                if (data.error) {
                    dispatch({ type: "visible" })
                    setTimeout(() => {
                        dispatch({ type: "hidden" })
                    }, 5000);
                } else {
                    setFlights(data)
                }

            }
        })()
    }, [show])



    return (
        <div className="container">
            <h1 className="header">flights</h1>
            {user.login ? (<div>
                <h1>hello {user.fname} <span className="logout-btn"><Logout /></span>  </h1>
            </div>
            ) : (
                    <>
                        <Link className="btn btn-primary" to="/login">login</Link>
                        <Link className="btn btn-success" to="/signup" >signup</Link>
                    </>
                )}


            <Searchbar update={setFlights} />
            <NoResultBar />

            {user.login && user.role === "user" && <FilterVacations show={show} setshow={setshow} />}

            {user.login && user.role === "admin" &&
                <>
                    <Button variant="contained" color="primary" onClick={() => history.push("/add")}>Add Flight</Button>
                </>
            }
            {user.login && user.role === "admin" &&
                <>
                    <Button variant="contained" onClick={() => history.push("/reports")}>SHOW REPORTS</Button>
                </>
            }

           


            {
                <div className="flights">
                    {flights.map(f => (<Flight update={setFlights} key={f.id} flight={f} />))}
                </div>
            }


        </div>
    )
}
