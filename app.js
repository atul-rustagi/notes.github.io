function ShowNotes (pIsSearch)
{
    let search = window.location.search.split ("=");
    let searchtxt = search[search.length - 1].toLowerCase ();

    if (pIsSearch == false) {

        searchtxt = null;
    }

    let notes = localStorage.getItem ("notes");

    if (notes == null) {

        notesobj = [];
    } else {

        notesobj = JSON.parse (notes);
    }

    let html = "";

    notesobj.forEach((element, index) => {

        let title = element.title;
        let note = element.note;
        let isimportant = element.isimportant;

        let titlelower = title.toLowerCase ();
        let notelower = note.toLowerCase ();

        if (searchtxt == null || titlelower.includes (searchtxt) || notelower.includes (searchtxt)) {

            html += `<div class="notecard card my-3 border-dark">
                        <div class="card-header text-white bg-dark">${title} <span class="badge bg-light text-dark">${isimportant ? 'Important' : ''}</span></div>
                            <div class="card-body">
                            <p class="card-text">${note}</p>
                            <button id=${index} onclick="DeleteNote (this.id)" class="btn btn-secondary">Delete Note</button>
                        </div>
                    </div>`
        }
    });

    let noteselem = document.getElementById ("notes");

    if (notesobj.length != 0) {

        noteselem.innerHTML = html;

        if (noteselem.innerHTML == "") {

            noteselem.innerHTML = `Nothing to show!! Use "Add a Note" section above to add notes.`
        }
    } else {

        noteselem.innerHTML = `Nothing to show!! Use "Add a Note" section above to add notes.`
    }
}

let addnote = document.getElementById ("addnote");

addnote.addEventListener ("click", element => {

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

    notetitle.value = "";
    notetxt.value = "";
    isimportant.checked = false;

    ShowNotes (false);
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

    ShowNotes (false);
}

ShowNotes (true);