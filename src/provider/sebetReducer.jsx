function sebetReducer(sebet, action) {
  const {type, payload} = action
  return type == 'add' ? addToBasket (sebet, payload.id, payload.size, payload.quant) :
         type == 'del' ? deleteFromBasket (sebet, payload.i) : 
                         updateBasket (sebet, payload.i, payload.quant)
}

  function addToBasket (sebet, id, size, quant) {
    let index = sebet.findIndex(item => item.id == id && item.size == size)
    return (index >= 0) ? updateBasket (sebet, index, sebet[index].quant + quant) :
    [...sebet, {id, size, quant}]
  }

  function deleteFromBasket (sebet, ind) {
    return sebet.filter((_, i) => i != ind)
  }

  function updateBasket (sebet, ind, quant) {
    if(quant == 0) return deleteFromBasket(sebet, ind)
    else {
      let obj = {...sebet[ind]}
      obj.quant = quant
      return sebet.map((item, i) => i == ind ? obj : item)
    }
  }

  export default sebetReducer