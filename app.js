function ShowNotes ()
{
    let notes = localStorage.getItem ("notes");

    if (notes == null) {

        notesobj = [];
    } else {

        notesobj = JSON.parse (notes);
    }

    let notesheading = document.getElementById ("notes-heading");
    notesheading.innerText = `Your Notes`

    let html = "";

    notesobj.forEach((element, index) => {

        let title = element.title;
        let note = element.note;
        let isimportant = element.isimportant;

        html += `<div class="notecard card my-3 border-dark">
                    <div class="card-header text-white bg-dark">${title} <span class="badge bg-light text-dark">${isimportant ? '❕' : ''}</span></div>
                        <div class="card-body">
                        <p class="card-text">${note}</p>
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

function AddNote () {
    let notetitle = document.getElementById ("notetitle");
    let notetxt = document.getElementById ("notetxt");
    let isimportant = document.getElementById ("isimportant");
    let notes = localStorage.getItem ("notes");

    if (notes == null) {

        notesobj = [];
    } else {

        notesobj = JSON.parse (notes);
    }

    let obj = {
        "title" : notetitle.value,
        "note" : notetxt.value,
        "isimportant" : isimportant.checked
    }

    notesobj.push (obj);

    localStorage.setItem ("notes", JSON.stringify (notesobj));
}

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

        let cardtxt = element.getElementsByClassName ("card-text")[0].innerText.toLowerCase ();
        let cardtitle = element.getElementsByClassName ("card-header")[0].innerText.toLowerCase ();

        if (cardtxt.includes (searchtxt) || cardtitle.includes (searchtxt)) {

            element.style.display = "block";
        } else {

            element.style.display = "none";
        }
    })

    let notesheading = document.getElementById ("notes-heading");
    notesheading.innerText = `${search.value != "" ? `Search Result(s) for "${search.value}"` : "Your Notes"}`

    search.value = "";
})

ShowNotes ();