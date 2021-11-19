let users = [];



function getData(){
    let dataObj ={
        photo: $('#url-inp').val(),
        firstName:$('#firstname-inp').val(),
        lasttname:$('#lastname-inp').val(),
        email: $('#email-inp').val(),
        kpi:$('#kpi-inp').val(),
        age: $('#age-inp').val()
    }
    postNewstudent(dataObj)

    // !clear inputs
    $('#inp-photo').val(''),
    $('#firstName-inp').val(''),
    $('#lastname-inp').val(''),
    $('#email-inp').val(''),
    $('#kpi-inp').val(''),
    $('#age-inp').val('')

    return dataObj
    
}

function postNewstudent(firstName, lasttname, email, kpi, age, photo){
    fetch('http://localhost:8007/students', {
        method: 'POST',
        body: JSON.stringify(firstName, lasttname, email, kpi, age, photo),
        headers: {
            'Content-type':'application/json;charset:utf-8'
        }
    }).then(res => console.log(res))
}

// !Get data from input 
function render(){
    $('table').html(`<tr>
                        <th>Photo</th>
                        <th>First name</th>
                        <th>Last name</th>
                        <th>E-mail</th>
                        <th>week KPI</th>
                        <th>month KPI</th>
                        <th>Update</th>
                        <th>Delete</th>
                    </tr>`) 
    users.forEach((item,index) => {
        let newUser = ` <tr id="${index}">
        <td class="photo_td"><img src="${item.photo}" alt="" class="user-photo"></td>
                            <td >${item.firstName}</td>
                            <td>${item.lasttname}</td>
                            <td>${item.email}</td>
                            <td>${item.age}</td>
                            <td>${item.kpi}</td> 
                            <td><button class="btn btn-success" data-bs-toggle="modal" data-bs-target="#exampleModal">Update</button></td>
                            <td><button class="btn btn-danger">Delete</button></td>
                            </tr>`

        $('table').append(newUser)
    })
}

// !Add user 
$('.add-user__btn').on('click', (e) => {
    e.preventDefault()
    let data = {...getData()}
    users.push(data)
    render()
})

//!Delete user
$('body').on('click','.btn-danger', (e) => {
    let parentId = e.target.parentNode.parentNode.id
    console.log(e.target.parentNode.parentNode.id)
    users.splice(parentId, 1)
    render()
})


$('.btn-success').on('click', '#add-stu', (e) => {
    let parentId = e.target.parentNode.parentNode.parentNode.id
    let currentElement = users[parentId]
    $('#firstname-inp').val(`${currentElement.firstName}`),
    $('#lastname-inp').val(`${currentElement.lasttname}`),
    $('#email-inp').val(`${currentElement.email}`),
    $('#url-inp').val(`${currentElement.photo}`),
    $('#age-inp').val(`${currentElement.age}`)
    $('#kpi-inp').val(`${currentElement.kpi}`) 
    $('edit-user__btn').attr('id', parentId)
}) 

//!edit user
$('.btn-success').on('click', (e) => {
    e.preventDefault()
    let editElem = users[e.target.id]
    editElem = {...getData()}
    users.splice(e.target.id, 1, editElem) 
    render()
}) 


// !pagination
$('#next-btn').on('click', (e) => {
    page++
    render()
})

$('#previous-btn').on('click', (e) => {
    page--
    render()
})

render() 
