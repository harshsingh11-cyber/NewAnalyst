import { useEffect, useState } from "react";
import "./Analyst1.css";
import axios from "axios";
import { useMemo } from "react";
import {
    MaterialReactTable,
    useMaterialReactTable,
} from "material-react-table";

function Analyst1() {
    const [data, setData] = useState([]);
    const [dataT, setDataT] = useState([]);

    const [bol, setBol] = useState(true);

    const [filter, setFilter] = useState([]);
    const [visibilityState, setVisibilityState] = useState({});

    const [vis, setVis] = useState(false);

    // useEffect(() => {
    //     updateRowVisibility(null);
    // }, []);

    let baseUrl = "http://192.168.1.182:8574/getData";

    async function fetchData() {
        try {
            const response = await axios.get(`${baseUrl}`);
            // console.log(response);
            let arr = response.data;
            let map = new Map();
            arr.forEach((element) => {
                map.set(element.Analyst, []);
            });

            //console.log(map);
            arr.forEach((elm) => {
                if (map.has(elm.Analyst)) {
                    let oldArr = map.get(elm.Analyst);
                    map.set(elm.Analyst, [...oldArr, elm]);
                } else {
                    map.set(elm.Analyst, [elm]);
                }
            });

            // console.log(map);
            let keys;
            keys = Array.from(map.keys());
            keys.sort();

            // console.log(map);
            // console.log(keys);

            let final = keys.map((elm) => {
                let obj = {};
                obj.Analyst = elm;
                obj.Aprajita = 0;
                obj.EnoraGlobal = 0;
                obj.IntuitiveAlpha = 0;
                obj.Marketopper = 0;
                obj.PortfolioCode = 0;
                let newObj = map.get(elm);
                obj.subRows = newObj;
                return obj;
            });

            console.log(final);
            // let dataFinal = final.flat();
            setData(final);

            // let newDataFinal = dataFinal.filter((elm) => elm.PortfolioCode != "0");
            setDataT(final);
            // console.log(dataFinal);
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    //   Analyst
    //   :
    //   "ANA_FUT_OP"
    //   Aprajita
    //   :
    //   0
    //   EnoraGlobal
    //   :
    //   0
    //   IntuitiveAlpha
    //   :
    //   0
    //   Marketopper
    //   :
    //   2000
    //   PortfolioCode
    //   :
    //   "MARKETOPPERBANKCARRY"
    //   ,

    //   {
    //     accessorKey: 'state',
    //     enableColumnOrdering: false,
    //     header: 'State',
    //   },

    const columns = useMemo(
        //column definitions...
        () => [
            {
                accessorKey: "Analyst",
                enableSorting: false,
                enableColumnActions: false,

                header: "Analyst",
                Header: (
                    <span style={{ color: "black", fontSize: "18px", fontWeight: "600" }}>
                        Analyst
                    </span>
                ),
            },
            {
                accessorKey: "PortfolioCode",
                enableSorting: false,
                enableColumnActions: false,

                header: "Portfolio_Code",
                Header: (
                    <span style={{ color: "black", fontSize: "18px", fontWeight: "600" }}>
                        Portfolio_Code
                    </span>
                ),
            },

            {
                accessorKey: "Marketopper",
                enableSorting: false,
                enableColumnActions: false,

                header: "Marketopper",
                Header: (
                    <span style={{ color: "black", fontSize: "18px", fontWeight: "600" }}>
                        Marketopper
                    </span>
                ),
            },
            {
                accessorKey: "EnoraGlobal",
                enableSorting: false,
                enableColumnActions: false,

                Header: (
                    <span style={{ color: "black", fontSize: "18px", fontWeight: "600" }}>
                        Fund
                    </span>
                ),
                header: "Fund",
            },

            {
                accessorKey: "Aprajita",
                enableSorting: false,
                enableColumnActions: false,

                header: "Aprajita",
                Header: (
                    <span style={{ color: "black", fontSize: "18px", fontWeight: "600" }}>
                        Aprajita
                    </span>
                ),
            },
            {
                accessorKey: "IntuitiveAlpha",
                enableSorting: false,
                enableColumnActions: false,

                header: "IAlpha",
                Header: (
                    <span style={{ color: "black", fontSize: "18px", fontWeight: "600" }}>
                        IAlpha
                    </span>
                ),
            },
        ],
        []
        //end
    );

    const table = useMaterialReactTable({
        columns,
        data,
        enableExpandAll: false, //hide expand all double arrow in column header
        enableExpanding: true,
        globalFilterFn: 'contains',
        filterFromLeafRows: true, //apply filtering to all rows instead of just parent rows
        initialState: { expanded: false }, //expand all rows by default
        enablePagination: false,
        enableStickyHeader: true,
        
    });

    return <MaterialReactTable table={table}
        style={{ backgroundColor: '#151b33', color: 'white', fontSize: '16px' }} />;
}

export default Analyst1;
