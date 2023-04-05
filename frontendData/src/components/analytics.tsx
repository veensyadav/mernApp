import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getClients, TableState } from '../redux/modules/table';
import { RootState } from '../redux/store';
import { useEffect, useState } from 'react';
import Chart from 'react-google-charts';

export default function Analytics() {
    const dispatch = useDispatch<any>();
    const tableData: TableState = useSelector((state: RootState) => state.dashboard);
    const [analyticsData, setAnalyticsData] = useState(null);

    useEffect(() => {
        dispatch(getClients());
    }, []);

    useEffect(() => {        
        let inspectionData: any = Object.entries(tableData.clients);
        let inspectionData2: any[] = [];
        console.log("inspectionData11111",inspectionData);
        inspectionData.unshift(["Timestamp", "Y-B(KV)", "R-Y(KV)", "B-R (KV)", "APPARENT POWER (MVA)", "REACTIVE POWER (MVAR)", "ACTIVE ENERGY (MWH)", "POWER FACTOR", "ACTIVE POWER (MW)", "Y (A)", "R(A)", "B(A)", "FREQUENCY(HZ)"]);
        inspectionData2.unshift(["Timestamp", "Y-B(KV)", "R-Y(KV)", "B-R (KV)", "APPARENT POWER (MVA)", "REACTIVE POWER (MVAR)", "ACTIVE ENERGY (MWH)", "POWER FACTOR", "ACTIVE POWER (MW)", "Y (A)", "R(A)", "B(A)", "FREQUENCY(HZ)"]);
        console.log("inspectionData",inspectionData);
        inspectionData.forEach((x) => {
            if(x[1]) {
                const arrValues = Object.entries(x[1]);
                let arrValues2: any[] = [];
                let newarrValues2: any[] = [];
                newarrValues2 = arrValues;
                console.log("arrValues",arrValues)
                newarrValues2.forEach((y) => {
                    arrValues2.push(y[1]);
                })
                console.log("arrValues2",arrValues2);
                inspectionData2.push(arrValues2);
                console.log("x",x);
            }
        })
        inspectionData2.splice(1, 1);
        setAnalyticsData(inspectionData2);
    }, [tableData.clients]);

    const options = {
        curveType: "function",
        legend: { position: "none" },
        hAxis: {
          gridlines: { color: "#F1F1F1" }, title: "Data Analysis"
        },
        vAxis: {
          gridlines: { color: "#F1F1F1" }, format: 'short', title: 'Amount'
        },
        chartArea: {
          left: 30,
          top: 10,
          right: 0,
          bottom: 50,
          width: '100%'
        },
        colors: ['#009EE1']
      };

    return (
        <>
              <Chart
                chartType="LineChart"
                width="100%"
                className='revenue-line-chart'
                data={analyticsData}
                options={options}
                height="100vh"
              />
        </>
    )
}