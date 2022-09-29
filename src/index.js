// <1> DONE fetch the data and get the first exhibit into
// the detail area including comments as <p>
dataUrl = "http://localhost:3000/current-exhibits/"
const featuredExhibit = 0
let allComments = []
let currentTicketSales;
document.getElementById("comment-form").addEventListener("submit", (e) => addComment(e)) 

fetch(dataUrl)
.then(resp => resp.json())
.then(resp => populatePage(resp))
.catch(err => alert(err))

function populatePage(exhibits) {
    document.getElementById("exhibit-title").textContent = exhibits[featuredExhibit].title
    document.getElementById("exhibit-description").textContent = exhibits[featuredExhibit].description
    document.getElementById("exhibit-image").src = exhibits[featuredExhibit].image
    currentTicketSales = exhibits[featuredExhibit].tickets_bought
    showTicketsBought(currentTicketSales)
    // HTML does not have a spot for artist_name
    allComments = exhibits[featuredExhibit].comments
    exhibits[featuredExhibit].comments.forEach((comment) => showComments(comment))
    // set listener for buy-tickets-button to know the current number of tickets sold
    document.getElementById("buy-tickets-button").addEventListener("click", (e) => buyTickets(e))
}

function showTicketsBought(ticketsBought) {
document.getElementById("tickets-bought").textContent = ticketsBought
}


function showComments(comment) {
    const commentBox = document.getElementById("comments-section")
    const aComment = document.createElement("p")
    aComment.textContent = comment
    commentBox.appendChild(aComment)
}

// <2> DONE when comment form is sumbitted, that
// comment gets added to the comments-section as <p>
function addComment(e) {
    e.preventDefault()
    const newComment = document.getElementsByTagName("input")[0].value
    e.target.reset()
    allComments.push(newComment)
    newCommentObject = {
        comments: allComments
    }
    const configObject = {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify(newCommentObject) // this is going to replace all the comments with the one new comment. Must have a global array of the current comments, and add the new one to that, so we can PATCH the new total
    }
    fetch(`${dataUrl}${featuredExhibit+1}`, configObject)
    .then(() => showComments(newComment))
    .catch(() => alert("there was a server error"))
    // <bonus 2> when someone makes a comment, PATCH the
    // exhibit with the new comment 
    //make config object
}

// <3> DONE on click of buy-tickets-button, update
// tickets-bought element so it increments 
// <bonus 1> DONE when someone buys a ticket, PATCH the
// exhibit with new number of tickets_bought

function buyTickets(e, ticketsBought) {
    // PATCH the database and display the tickets purchased
    const newTicketsObject = {
        tickets_bought: ++currentTicketSales
    }
    const configObject = {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify(newTicketsObject) // this is going to replace all the comments with the one new comment. Must have a global array of the current comments, and add the new one to that, so we can PATCH the new total
    }
    fetch(`${dataUrl}${featuredExhibit+1}`, configObject)
    .then(() => showTicketsBought(currentTicketSales))
    // .catch(() => alert("there was a server error"))
}