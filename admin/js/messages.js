// Get Element
let showMessages = document.getElementById("showMessages");

// Call Product 
function callData() {
    fetch(`http://127.0.0.1:8000/api/admin/show_product`)
        .then((res) => res.json())
        .then((dataAPi) => {
            let dataALL = dataAPi.messages;
            showMessages.innerHTML = ''
            // In Case Fount Or Not fount
            if (dataALL === []) {
                showMessages.innerHTML = `
                    <h5>There are no messages</h5>
                    `
            } else {
                // Call Function ShowMessages 
                showMessages(dataALL);
            }
        })
}

// ADD Messages In Dom
function showMessages(data) {
    data.forEach(message => {
        // Create Div
        let div = document.createElement('div');
        div.setAttribute("class", "message");
        div.setAttribute("id", message.id);
        div.innerHTML = `
        <h5>Name : <span>${message.name}</span></h5>
        <h5>Email: <span>${message.email}</span></h5>
        <h5>Phone : <span>${message.phone}</span></h5>
        <h5>Message : <span>${message.message}</span></h5>
        <Button class="answered" id=${message.id}>answered</Button>        
        `
    });

    // DELETE message
    document.querySelectorAll(".answered").forEach(element => {
        element.addEventListener("click", (e) => {
            const formData = new FormData();
            formData.append('id', element.getAttribute("id"));
            const xhr = new XMLHttpRequest();
            xhr.open('POST', `http://127.0.0.1:8000/api/admin/delete_message`, true);
            xhr.send(formData);
            callData();
        })
    })
}


callData();