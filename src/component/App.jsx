import { useEffect, useReducer, useState } from "react"
import { Outlet } from "react-router"
import { Container } from "react-bootstrap"
import Footer from "./Footer"
import Header from "./Header"
import Basket from "./Basket"
import { pizza, size } from "../provider/data"
import { BasketContext, DataContext, FilterContext } from "../provider/context"
import sebetReducer from "../provider/sebetReducer"

function App() {
  // const [sebet, setSebet] = useState(sessionStorage["basket"] ? JSON.parse(sessionStorage["basket"]) : [])
  const [sebet, sebetDispatch] = useReducer(sebetReducer, sessionStorage["basket"] ? JSON.parse(sessionStorage["basket"]) : [])
  const [show, setShow] = useState(false)
  const [filter, setFilter] = useState('All')
  const [search, setSearch] = useState('')
  const filterResult = array => filter == 'All' ? array : array.filter(item => item.filter.includes(filter))
  const searchResult = array => search == '' ? array : array.filter(item => item.name.toLowerCase().includes(search))

  useEffect(() => { sessionStorage.setItem("basket", JSON.stringify(sebet)) }, [sebet])

  return (
    <DataContext value={{pizza, size}}>
      <BasketContext value={{sebet, show, setShow, sebetDispatch}}>
        <FilterContext value={{filter, setFilter, search, setSearch}}>
          <Header />
          <main className="py-5">
            <Container>
              <Outlet context={searchResult(filterResult(pizza))} />
            </Container>
          </main>
          <Footer />
          <Basket />     
        </FilterContext>
      </BasketContext>
    </DataContext>
  )
}

export default App