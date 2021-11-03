function ShowNotes ()
{
    let notes = localStorage.getItem ("notes");

    if (notes == null) {

        notesobj = [];
    } else {

        notesobj = JSON.parse (notes);
    }

    let html = "";

    notesobj.forEach((element, index) => {
        html += `<div class="notecard card my-3 border-dark" style="width: 32%;">
                    <div class="card-header text-white bg-dark">Note ${index + 1}</div>
                        <div class="card-body">
                        <p class="card-text">${element}</p>
                        <button id=${index} onclick="DeleteNote (this.id)" class="btn btn-secondary">Delete Note</button>
                    </div>
                </div>`
    });

    let noteselem = document.getElementById ("notes");

    if (notesobj.length != 0) {

        noteselem.innerHTML = html;
    } else {

        noteselem.innerHTML = `Nothing to show!! Use "Add a Note" section above to add notes.`
    }
}

let addnote = document.getElementById ("addnote");

addnote.addEventListener ("click", element => {

    let notetxt = document.getElementById ("notetxt");
    let notes = localStorage.getItem ("notes");

    if (notes == null) {

        notesobj = [];
    } else {

        notesobj = JSON.parse (notes);
    }

    notesobj.push (notetxt.value);

    localStorage.setItem ("notes", JSON.stringify (notesobj));

    notetxt.value = "";

    ShowNotes ();
})

function DeleteNote (pIndex)
{
    let notes = localStorage.getItem ("notes");

    if (notes == null) {

        notesobj = [];
    } else {

        notesobj = JSON.parse (notes);
    }

    notesobj.splice (pIndex, 1);

    localStorage.setItem ("notes", JSON.stringify (notesobj));

    ShowNotes ();
}

let searchbtn = document.getElementById ("searchbtn");

searchbtn.addEventListener ("click", element => {

    let search = document.getElementById ("searchtxt");
    let searchtxt = search.value.toLowerCase ();
    let notecards = document.getElementsByClassName ("notecard");

    Array.from (notecards).forEach (element => {

        let cardtxt = element.getElementsByTagName ("p")[0].innerText.toLowerCase ();

        if (cardtxt.includes (searchtxt)) {

            element.style.display = "block";
        } else {

            element.style.display = "none";
        }
    })
})

ShowNotes ();