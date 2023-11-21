import { useEffect, useState } from "react";
import "./Analyst.css";
import axios from "axios";

function Analyst() {
  
  const [data, setData] = useState([]);
  const [dataT, setDataT] = useState([]);

  const [bol, setBol] = useState(true);

  const [filter, setFilter] = useState([]);
  const [visibilityState, setVisibilityState] = useState({});

  const[vis,setVis] = useState(false);

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

  function handleSearch(val) {
    if (val) {
      let search_results = dataT
        .filter((prof) => {
          // Filter results by doing case insensitive match on name here
          return prof.Analyst.toLowerCase().includes(val.toLowerCase());
        })
        .sort((a, b) => {
          // Sort results by matching name with keyword position in name
          if (
            a.Analyst.toLowerCase().indexOf(val.toLowerCase()) >
            b.Analyst.toLowerCase().indexOf(val.toLowerCase())
          ) {
            return 1;
          } else if (
            a.Analyst.toLowerCase().indexOf(val.toLowerCase()) <
            b.Analyst.toLowerCase().indexOf(val.toLowerCase())
          ) {
            return -1;
          } else {
            if (a.Analyst > b.Analyst) return 1;
            else return -1;
          }
        });
      setFilter([...search_results]);
      setBol(false);
    } else {
      setBol(true);
    }
  }

  function handleSearchCode(val) {
    if (val) {
      let search_results = dataT
        .filter((prof) => {
          // Filter results by doing case insensitive match on name here
          return prof.PortfolioCode.toLowerCase().includes(val.toLowerCase());
        })
        .sort((a, b) => {
          // Sort results by matching name with keyword position in name
          if (a.PortfolioCode != 0 && b.PortfolioCode != 0) {
            if (
              a.PortfolioCode.toLowerCase().indexOf(val.toLowerCase()) >
              b.PortfolioCode.toLowerCase().indexOf(val.toLowerCase())
            ) {
              return 1;
            } else if (
              a.PortfolioCode.toLowerCase().indexOf(val.toLowerCase()) <
              b.PortfolioCode.toLowerCase().indexOf(val.toLowerCase())
            ) {
              return -1;
            } else {
              if (a.PortfolioCode > b.PortfolioCode) return 1;
              else return -1;
            }
          }
        });
      setFilter([...search_results]);
      setBol(false);
    } else {
      setBol(true);
    }
  }

  // Use to refresh the page or reload
  function refreshPage() {
    window.location.reload(false);
  }

  // handle to visibility of content
  const handleRowVisibility = (GroupCode) => {
    const rowsToToggle = document.querySelectorAll(
      `tr[data-GroupCode="${GroupCode}"]:not(.group-visible)`
    );

//console.log(rowsToToggle);
    setVisibilityState((prevState) => ({   
      ...prevState,
      [GroupCode]: !prevState[GroupCode],
    }));

    rowsToToggle.forEach((toggleRow) => {
      toggleRow.style.display = visibilityState[GroupCode]
        ? "table-row"
        : "none";
    });
   
  };

  return (
    <div className="analist_main">
      <div className="search_main">
        <label for="search"> Search by Name </label>{" "}
        <input id="search" onChange={(e) => handleSearch(e.target.value)} />
       
        <label for="search-1" className="lab">
          {" "}
          Search by Code{" "}
        </label>{" "}
        <input
          id="search-1"
          onChange={(e) => handleSearchCode(e.target.value)}
        />{" "}
        <button className="btn" onClick={refreshPage}>
          {" "}
          Reload!{" "}
        </button>{" "}
      </div>
      <div className="head_main_table">
        <table class="table table-bordered">
          <thead>
            <tr>
              <th scope="col" id="ana2">
                {" "}
                Analyst / PortfolioCode{" "}
              </th>
              <th scope="col" id="ana1">
                {" "}
                Marketopper{" "}
              </th>
              <th scope="col" id="ana1">
                {" "}
                Aprajita{" "}
              </th>
              <th scope="col" id="ana1">
                {" "}
                Fund{" "}
              </th>
              <th scope="col" id="ana1">
                {" "}
                IAlpha{" "}
              </th>
            </tr>
          </thead>
          {/* <tbody>
            {bol ? (
              <>
                {data &&
                  data.map((elm, index) => {
                    const idName =
                      elm.PortfolioCode == 0 ? "distinctColor" : "";
                    const isGroupVisible =
                      elm.groupCode == null || elm.PortfolioCode == 0;
                    const groupClass = isGroupVisible
                      ? "group-visible"
                      : "group-hidden";
                    if (isGroupVisible) {
                      return (
                        <tr
                          id={idName}
                          className={groupClass}
                          data-GroupCode={elm.groupCode}
                          onClick={() =>{ handleRowVisibility(elm.groupCode)}}
                        >
                          <td> {elm.Analyst} </td>
                          <td> {elm.Marketopper} </td>
                          <td> {elm.Aprajita} </td>
                          <td> {elm.EnoraGlobal} </td>
                          <td> {elm.IntuitiveAlpha} </td>
                        </tr>
                      );
                    } else {
                      return (
                        <tr
                          className={groupClass}
                          data-GroupCode={elm.groupCode}
                          onClick={() => handleRowVisibility(elm.groupCode)}
                        >
                          <td> {elm.PortfolioCode} </td>
                          <td> {elm.Marketopper} </td>
                          <td> {elm.Aprajita} </td>
                          <td> {elm.EnoraGlobal} </td>
                          <td> {elm.IntuitiveAlpha} </td>
                        </tr>
                      );
                    }
                  })}
              </>
            ) : (
              <>
                {filter.map((elm) => {
                  return (
                    <tr>
                      <td>
                        {" "}
                        {elm.PortfolioCode + " "}{" "}
                        <span id="analystName">
                          {" "}
                          {"( " + elm.Analyst + " )"}{" "}
                        </span>
                      </td>
                      <td> {elm.Marketopper} </td>
                      <td> {elm.Aprajita} </td>
                      <td> {elm.EnoraGlobal} </td>
                      <td> {elm.IntuitiveAlpha} </td>
                    </tr>
                  );
                })}
              </>
            )}
          </tbody> */}
        </table>
      </div>
    </div>
  );
}

export default Analyst;
