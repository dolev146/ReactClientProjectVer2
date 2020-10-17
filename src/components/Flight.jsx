import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Card } from '@material-ui/core';

export default function Flight({ flight, update }) {

    const user = useSelector(state => state.user)
    const PriceStyle = {
        color: "DarkCyan",
        textDecoration: 'underline DarkGrey'
    }

    const [Follow, setFollow] = useState("")
    useEffect(() => {
        if (flight.follower_id === user.userid) {
            setFollow("unFollow")
        }else {
            setFollow("Follow")
        }
    }, [])


    const handleUnFollow = async () => {
        try {
            let res = await fetch("http://localhost:1000/orders/delete", {
                method: "POST",
                headers: { "Content-Type": "application/json", "Authorization": localStorage.token },
                body: JSON.stringify({ userId: user.userid, flightId: flight.id })
            })
            let data = await res.json()
            update(data)
            setFollow("Follow")
            console.log(data)

        } catch (error) {
            console.log(error)
        }
    }


    const handleDelete = async () => {
        let res = await fetch("http://localhost:1000/flights/" + flight.id, {
            method: "DELETE",
            headers: { "Authorization": localStorage.token }
        })
        let data = await res.json()
        update(data)
        console.log(data)
    }

    

    const handleBuying = async () => {
        try {
            let res = await fetch("http://localhost:1000/orders/", {
                method: "POST",
                headers: { "Content-Type": "application/json", "Authorization": localStorage.token },
                body: JSON.stringify({ userId: user.userid, flightId: flight.id })
            })
            let data = await res.json()
            update(data)
            setFollow("unFollow")
            console.log(data)
        } catch (error) {
            console.log(error)
        }

    }

    return (
        <div className="flight">
            <Card className="">
                <CardActionArea>
                    <CardMedia
                        style={{ height: "100px" }}
                        image={flight.picture}
                        title="Contemplative Reptile"
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                            {flight.dest} only <span style={PriceStyle}>${flight.price}</span>
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                            {flight.descrip}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                            start {flight.dept} finish  {flight.arv}
                        </Typography>
                    </CardContent>
                </CardActionArea>
                <CardActions>

                    {user.login && user.role === "user" && Follow === "Follow" &&
                        (
                            <Button variant="contained" onClick={handleBuying} size="small" color="primary">
                                {Follow}
                            </Button>
                        )}
                    {user.login && user.role === "user" && Follow === "unFollow" &&
                        (
                            <Button variant="outlined" color="secondary" onClick={handleUnFollow} size="small" >
                                {Follow}
                            </Button>
                        )}

                    {user.login && user.role === "admin" &&
                        <>
                            <Button variant="contained" onClick={handleDelete} size="small" color="primary">
                                Delete
                        </Button>
                            <Link className="btn btn-warning btn-sm"  to={"/edit/" + flight.id} >Edit</Link>
                        </>
                    }

                </CardActions>
            </Card>
        </div>
    )
}


