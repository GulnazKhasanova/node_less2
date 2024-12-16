document.addEventListener('click' , (event)=> {
    if(event.target.dataset.type === 'remove'){
        const id = event.target.dataset.id

    remove(id).then(()=>{
        event.target.closest('li').remove()
    })
    }
    
    if(event.target.dataset.type === 'update'){

        const id = event.target.dataset.id         
        const newtitle = prompt('Введите новое значение')
        if(newtitle) {
        update(id, newtitle)
         .then(()=>{
             event.target.closest('li').innerHTML = `
             ${newtitle}
             <button class="btn btn-danger" data-type="remove" data-id="${id}">&times;</button>
             <button class="btn btn-danger" data-type="update" data-id="${id}">Редактировать</button>`
        })
        } 
    }
})

async function remove (id) {
   await fetch(`/${id}`, {method: 'DELETE' })
}

async function update (id, title) {
  
    const postData = {
        'title': title
    }

    await fetch(`/${id}`, {
        method: 'PUT',
        headers: {
            'Content-type': 'application/json; charset=UTF-8'
        },
        body: JSON.stringify(postData)
     })
 }