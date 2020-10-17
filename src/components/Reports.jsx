import React, { useEffect } from "react";
import { useSelector } from 'react-redux'
import { Link } from "react-router-dom";
import { VictoryBar, VictoryChart, VictoryAxis, VictoryTheme } from "victory";
let numberOfobjects;
let nameOfeveryBar;
let chartInfo;
(async () => {
    try {
        let res = await fetch("http://localhost:1000/orders/reports", {
            method: "POST",
            headers: { "content-type": "application/json", "Authorization": localStorage.token }
        })
        chartInfo = await res.json()
        numberOfobjects = chartInfo.map((m, i) => i + 1)
        nameOfeveryBar = chartInfo.map((f) => f.dest)
    } catch (error) {
        console.log(error)
    }
})()

export default function Reports({ history }) {

    const user = useSelector(state => state.user)

    useEffect(() => {
        if (!user.login || user.role !== "admin") {
            history.push("/")
        }
    }, [])

    return (
        <>
            <h1 className="reports_header">reports</h1> <div className="biggerText"><Link to="/">Go back</Link></div>
            <div className="graph">
                <VictoryChart
                    style={{
                        parent: {
                            border: "1px solid #ccc"
                        },
                        background: {
                            fill: "#cee4ff"
                        }
                    }}
                    theme={VictoryTheme.material}
                    domainPadding={30}>
                    <VictoryAxis
                        tickValues={numberOfobjects}
                        tickFormat={nameOfeveryBar}
                    />
                    <VictoryAxis
                        dependentAxis
                        tickFormat={(x) => (`${x} followers`)}
                    />
                    <VictoryBar
                        data={chartInfo}
                        x="dest"
                        y="followers"
                    />
                </VictoryChart>
            </div>
        </>
    )
}


