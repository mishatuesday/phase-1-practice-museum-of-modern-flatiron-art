// <1> DONE fetch the data and get the first exhibit into
// the detail area including comments as <p>
dataUrl = "http://localhost:3000/current-exhibits/"
const featuredExhibit = 0
let allComments = []

fetch(dataUrl)
.then(resp => resp.json())
.then(resp => populatePage(resp))
.catch(err => alert(err))

function populatePage(exhibits) {
    debugger
    document.getElementById("exhibit-title").textContent = exhibits[featuredExhibit].title
    document.getElementById("tickets-bought").textContent = exhibits[featuredExhibit].tickets_bought
    document.getElementById("exhibit-description").textContent = exhibits[featuredExhibit].description
    document.getElementById("exhibit-image").src = exhibits[featuredExhibit].image
    // HTML does not have a spot for artist_name
    allComments = exhibits[featuredExhibit].comments
    exhibits[featuredExhibit].comments.forEach((comment) => showComments(comment))
    document.getElementById("comment-form").addEventListener("submit", (e) => addComment(e))    
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
        comment: allComments
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

// <3> on click of buy-tickets-button, update
// tickets-bought element so it increments 



// <bonus 1> when someone buys a ticket, PATCH the
// exhibit with new number of tickets_bought



