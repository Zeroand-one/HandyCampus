function getNumList(e,list) {
  list.forEach(item =>{
    if(item.id==e){
      // e=item.text
      return item.text
    }
  })

}
export default getNumList