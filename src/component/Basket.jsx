import React, { useContext } from "react"
import { Button, Modal, Table } from "react-bootstrap"
import { FaRegTrashAlt } from "react-icons/fa"
import { BasketContext, DataContext } from "../provider/context"

function Basket() {
    const { show, setShow, sebet, sebetDispatch } = useContext(BasketContext)
    const { pizza } = useContext(DataContext)
    let path = './assets/img/'
    return (
        <Modal show={show} onHide={() => setShow(false)} size="lg" centered >
            <Modal.Header closeButton>
                <Modal.Title>Səbət</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h4>Sifariş:</h4>
                <Table striped bordered hover className=" d-none d-lg-table">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Şəkil</th>
                            <th>Ad</th>
                            <th>Ölçü</th>
                            <th>Qiymət</th>
                            <th>Say</th>
                            <th>Məbləğ</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {sebet.map((item, i) => {
                            let p = pizza.find(elm => elm.id == item.id)
                            return (
                                <tr key={i}>
                                    <td>{i + 1}</td>
                                    <td><img className="thumb" src={path + p.img} alt={p.name} /></td>
                                    <td>{p.name}</td>
                                    <td>{item.size}</td>
                                    <td>{p.price[item.size]}₼</td>
                                    <td>
                                        <Button onClick={() => sebetDispatch({ type: 'upd', payload: { i, quant: item.quant - 1 } })} variant="outline-secondary"> - </Button>
                                        <span className="p-2">{item.quant}</span>
                                        <Button onClick={() => sebetDispatch({ type: 'upd', payload: { i, quant: item.quant + 1 } })} variant="outline-secondary"> + </Button>
                                    </td>
                                    <td>{item.quant * p.price[item.size]}₼</td>
                                    <td><FaRegTrashAlt onClick={() => sebetDispatch({ type: 'del', payload: { i } })} /></td>
                                </tr>
                            )
                        })}
                    </tbody>
                </Table>
                <Table bordered hover className="d-block d-lg-none">
                    <tbody>
                        {sebet.map((item, i) => {
                            let p = pizza.find(elm => elm.id == item.id)
                            return (
                                <React.Fragment key={i}>
                                    {/* Hər məhsul üçün başlıq (ayırıcı) */}
                                    <tr className="table-dark"><th colSpan="2 text-center">Məhsul #{i + 1}</th></tr>

                                    <tr>
                                        <th style={{ width: '30%' }}>Şəkil</th>
                                        <td><img className="thumb" src={path + p.img} alt={p.name} style={{ width: '50px' }} /></td>
                                    </tr>
                                    <tr>
                                        <th>Ad</th>
                                        <td>{p.name}</td>
                                    </tr>
                                    <tr>
                                        <th>Ölçü</th>
                                        <td>{item.size}</td>
                                    </tr>
                                    <tr>
                                        <th>Qiymət</th>
                                        <td>{p.price[item.size]}₼</td>
                                    </tr>
                                    <tr>
                                        <th>Say</th>
                                        <td>
                                            <Button onClick={() => sebetDispatch({ type: 'upd', payload: { i, quant: item.quant - 1 } })} variant="outline-secondary" size="sm"> - </Button>
                                            <span className="p-2">{item.quant}</span>
                                            <Button onClick={() => sebetDispatch({ type: 'upd', payload: { i, quant: item.quant + 1 } })} variant="outline-secondary" size="sm"> + </Button>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>Məbləğ</th>
                                        <td>{item.quant * p.price[item.size]}₼</td>
                                    </tr>
                                    <tr>
                                        <th>Sil</th>
                                        <td><FaRegTrashAlt style={{ cursor: 'pointer', color: 'red' }} onClick={() => sebetDispatch({ type: 'del', payload: { i } })} /></td>
                                    </tr>
                                    {/* Məhsullar arasında boşluq üçün boş sətir */}
                                    <tr style={{ height: '20px', border: 'none' }}><td colSpan="2" style={{ border: 'none' }}></td></tr>
                                </React.Fragment>
                            )
                        })}
                    </tbody>
                </Table>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={() => setShow(false)}>Bağla</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default Basket