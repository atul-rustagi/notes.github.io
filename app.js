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
                    <div id="notetitle-${index}" class="card-header text-white bg-dark">${title} <span class="badge bg-light text-dark">${isimportant ? '❕' : ''}</span></div>
                        <div class="card-body">
                        <pre id="notetxt-${index}" class="card-text">${note}</pre>
                        <button onclick="DeleteNote (${index})" id="delNote-${index}" class="delNote btn btn-secondary">Delete Note</button>
                        <button onclick="EditNote (${index})" id="editNote-${index}" class="editNote btn btn-secondary">Edit Note</button>
                        <button onclick="ToggleImp (${index})" id="tglImp-${index}" class="tglImp btn btn-secondary">${isimportant ? 'Mark Not Important' : 'Mark Important'}</button>
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

function EditNote (pIndex)
{
    let editbtn = document.getElementById (`editNote-${pIndex}`);
    let editbtnall = document.getElementsByClassName (`editNote`);
    let tglbtn = document.getElementsByClassName (`tglImp`);
    let delbtn = document.getElementsByClassName (`delNote`);
    let addbtn = document.getElementById (`addnote`);

    let title = document.getElementById (`notetitle-${pIndex}`);
    let note = document.getElementById (`notetxt-${pIndex}`);

    let notes = localStorage.getItem ("notes");

    if (notes == null) {

        notesobj = [];
    } else {

        notesobj = JSON.parse (notes);
    }

    let obj = notesobj[pIndex];

    if (editbtn.innerText === "Edit Note") {

        editbtn.innerText = "Save Note";
        Array.from (tglbtn).forEach (element => {
            element.setAttribute ("disabled", "");
        })
        Array.from (delbtn).forEach (element => {
            element.setAttribute ("disabled", "");
        })
        Array.from (editbtnall).forEach ((element, index) => {
            if (index != pIndex) {
                element.setAttribute ("disabled", "");
            }
        })
        addbtn.setAttribute ("disabled", "");

        if (obj.isimportant == true) {

            title.innerText = title.innerText.slice (0, -1);
        }

        title.contentEditable = true;
        note.contentEditable = true;
    } else {
        addbtn.removeAttribute ("disabled");

        obj.title = title.innerText == "" ? `---title---` : title.innerText;
        obj.note = note.innerText == "" ? "---note---" : note.innerText;

        localStorage.setItem ("notes", JSON.stringify (notesobj));

        ShowNotes ();
    }
}

function AddNote ()
{
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

    let obj = notesobj[pIndex];

    if (obj.isimportant == true) {

        if (confirm ("Are you sure you want to delete important note?") != true) {

            return;
        }
    }

    notesobj.splice (pIndex, 1);

    localStorage.setItem ("notes", JSON.stringify (notesobj));

    ShowNotes ();
}

function ToggleImp (pIndex)
{
    let notes = localStorage.getItem ("notes");

    if (notes == null) {

        notesobj = [];
    } else {

        notesobj = JSON.parse (notes);
    }

    let obj = notesobj[pIndex];

    obj.isimportant = !obj.isimportant;

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