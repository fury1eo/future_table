import { useEffect, useMemo, useState } from 'react';
import './App.css';
import axios from 'axios';
import Table from './components/Table/Table';
import Info from './components/Info/Info';
import AddModal from './components/AddModal/AddModal';
import { getPageCount, getPagesArray } from './utils/pages';

function App() {
  const [data, setData] = useState([]);
  const [infoData, setInfoData] = useState([]);
  const [sortedData, setSortedData] = useState([]);
  const [status, setStatus] = useState({
    id: 1,
    firstName: 1,
    lastName: 1,
    email: 1,
    phone: 1
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [modalActive, setModalActive] = useState(false);
  const [totalCount, setTotalCount] = useState(1000);
  const [limit, setLimit] = useState(50);
  const [totalPages, setTotalPages] = useState(0);
  const [totalCurrentPages, setTotalCountPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  

  const pagesArray = getPagesArray(totalCurrentPages);

  async function fetchData(pagesCount) {

    const response = await axios.get(`http://www.filltext.com/?rows=${pagesCount}&id={number|1000}&firstName={firstName}&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}`);

    setData(response.data);
    setTotalPages(getPageCount(totalCount, limit));
    setTotalCountPages(totalPages);

  };

  useEffect(() => {

    fetchData(totalCount);

  }, []);

  useEffect(() => {

    setSortedData(data);

  }, [data]);

  const [currentData, setCurrentData] = useState(sortedData.slice(0, currentPage*limit));

  useEffect(() => {

    setCurrentData(sortedData.slice((currentPage-1)*limit, currentPage*limit));

  }, [currentPage, sortedData]);

  useEffect(() => {
    setTotalCountPages(sortedData.length !== 0 ? getPageCount(sortedData.length, limit) : 0)
  }, [sortedData])

  function setInfo(id) {
    setInfoData(...data.filter(item => item.id === id));
  }

  function sortTable(column) {

    if (status[column] === 2)
      setStatus({...status, [column]: 1})
    else if (status[column] === 1)
      setStatus({...status, [column]: 2})

    if (status[column] === 1) {
      typeof data[0][column] === 'number'
        ? setSortedData([...data].sort((a, b) => a[column] - b[column]))
        : setSortedData([...data].sort((a, b) => a[column].localeCompare(b[column])));
    }
    else if (status[column] === 2) {
      typeof data[0][column] === 'number'
        ? setSortedData([...data].sort((a, b) => b[column] - a[column]))
        : setSortedData([...data].sort((a, b) => b[column].localeCompare(a[column])));
    }
  }

  useEffect(() => {
    setSortedData(data.filter(item => item.id.toString().toLowerCase().includes(searchQuery.toLowerCase()) || 
                                      item.firstName.toLowerCase().includes(searchQuery.toLowerCase()) || 
                                      item.lastName.toLowerCase().includes(searchQuery.toLowerCase()) || 
                                      item.email.toLowerCase().includes(searchQuery.toLowerCase()) || 
                                      item.phone.toLowerCase().includes(searchQuery.toLowerCase()))
    )
    setCurrentPage(1);
  }, [searchQuery])

  // const searchTable = useMemo(() => {
  //   return sortedData.filter(item => item.id.toString().toLowerCase().includes(searchQuery.toLowerCase()) || 
  //                                    item.firstName.toLowerCase().includes(searchQuery.toLowerCase()) || 
  //                                    item.lastName.toLowerCase().includes(searchQuery.toLowerCase()) || 
  //                                    item.email.toLowerCase().includes(searchQuery.toLowerCase()) || 
  //                                    item.phone.toLowerCase().includes(searchQuery.toLowerCase()));
  // }, [searchQuery, sortedData])

  function addItem(itemData) {
    setData([itemData, ...data]);
    setModalActive(false);
  }

  return (
    <div className="App">
      <div className="header">
        <button className='add_btn' onClick={() => setModalActive(true)}>Добавить</button>
        <input className='search' type="text" placeholder='Найти...' value={searchQuery} onChange={e => setSearchQuery(e.target.value)}/>
      </div>
      {data.length !== 0 
        ? <Table data={currentData} infoFunc={setInfo} sortFunc={sortTable} statuses={status}/> 
        : <div className='loading'></div>
      }
      {pagesArray.length !== 0
        ? <div className="pagination">
            {pagesArray.map(item =>
              <button 
                key={item}
                onClick={() => setCurrentPage(item)} 
                className={`pagination__page ${item === currentPage ? 'active' : ''}`}
              >
                {item}
              </button>
            )}
          </div>
        : ''
      }
      {infoData.length !== 0
        ? <Info data={infoData}/>
        : ''
      }
      <AddModal visible={modalActive} closeFunc={setModalActive} addFunc={addItem}/>
    </div>
  );
}

export default App;
