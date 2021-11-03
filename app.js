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

        let elementlower = element.toLowerCase ();

        if (searchtxt == null || elementlower.includes (searchtxt)) {

            html += `<div class="notecard card my-3 border-dark" style="width: 32%;">
                        <div class="card-header text-white bg-dark">Note ${index + 1}</div>
                            <div class="card-body">
                            <p class="card-text">${element}</p>
                            <button id=${index} onclick="DeleteNote (this.id)" class="btn btn-secondary">Delete Note</button>
                        </div>
                    </div>`
        }
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