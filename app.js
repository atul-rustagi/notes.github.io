/**
 * wrapper function to get element by id
 * @param {string} pId id name
 * @returns HTML Element for pId
 */
function GetIdElem(pId)
{
    return document.getElementById (pId);
}

/**
 * wrapper function to get element collection by class name
 * @param {string} pClass class name
 * @param {object} [pElem=document] element
 * @returns HTML Element Collection
 */
function GetClassElems (pClass, pElem = document)
{
    return pElem.getElementsByClassName (pClass);
}

/**
 * function to get notes from local storage
 * @returns array of notes stored in local storage
 */
function GetNotes ()
{
    let notesobj;

    let notes = localStorage.getItem ("notes");

    if (notes == null) {

        notesobj = [];
    } else {

        notesobj = JSON.parse (notes);
    }

    return notesobj;
}

/**
 * function to set notes in local storage
 * @param {Array} pNotes array of notes
 */
function SetNotes (pNotes)
{
    localStorage.setItem ("notes", JSON.stringify (pNotes));
}

/**
 * function to render notes from local storage to dom
 */
function ShowNotes ()
{
    let notesobj = GetNotes ();

    let notesheading = GetIdElem ("notes-heading");
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

    let noteselem = GetIdElem ("notes");

    if (notesobj.length != 0) {

        noteselem.innerHTML = html;
    } else {

        noteselem.innerHTML = `Nothing to show!! Use "Add a Note" section above to add notes.`
    }
}

/**
 * function to edit and save note's title and content
 * @param {number} pIndex index of note to be edited
 */
function EditNote (pIndex)
{
    let editbtn = GetIdElem (`editNote-${pIndex}`);
    let editbtnall = GetClassElems (`editNote`);
    let tglbtn = GetClassElems (`tglImp`);
    let delbtn = GetClassElems (`delNote`);
    let addbtn = GetIdElem (`addnote`);

    let title = GetIdElem (`notetitle-${pIndex}`);
    let note = GetIdElem (`notetxt-${pIndex}`);

    let notesobj = GetNotes ();

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

        title.contentEditable = "true";
        note.contentEditable = "true";
    } else {
        addbtn.removeAttribute ("disabled");

        obj.title = title.innerText == "" ? `---title---` : title.innerText;
        obj.note = note.innerText == "" ? "---note---" : note.innerText;

        SetNotes (notesobj);

        ShowNotes ();
    }
}

/**
 * function to add new note
 */
function AddNote ()
{
    let notetitle = GetIdElem ("notetitle");
    let notetxt = GetIdElem ("notetxt");
    let isimportant = GetIdElem ("isimportant");
    let notesobj = GetNotes ();

    let obj = {
        "title" : notetitle.value,
        "note" : notetxt.value,
        "isimportant" : isimportant.checked
    }

    notesobj.unshift (obj);

    SetNotes (notesobj);
}

/**
 * function to delete a note
 * @param {number} pIndex index of note to be deleted
 */
function DeleteNote (pIndex)
{
    let notesobj = GetNotes ();

    let obj = notesobj[pIndex];

    if (obj.isimportant == true) {

        if (confirm ("Are you sure you want to delete important note?") != true) {

            return;
        }
    }

    notesobj.splice (pIndex, 1);

    SetNotes (notesobj);

    ShowNotes ();
}

/**
 * function to toggle the importance of note
 * @param {number} pIndex index of note to be edited
 */
function ToggleImp (pIndex)
{
    let notesobj = GetNotes ();

    let obj = notesobj[pIndex];

    obj.isimportant = !obj.isimportant;

    SetNotes (notesobj);

    ShowNotes ();
}

/**
 * functionality to search a note
 */
let searchbtn = GetIdElem ("searchbtn");
searchbtn.addEventListener ("click", element => {

    let search = GetIdElem ("searchtxt");
    let searchtxt = search.value.toLowerCase ();

    let notecards = GetClassElems ("notecard");

    Array.from (notecards).forEach (element => {

        let cardtxt = GetClassElems ("card-text", element)[0].innerText.toLowerCase ();
        let cardtitle = GetClassElems ("card-header", element)[0].innerText.toLowerCase ();

        if (cardtxt.includes (searchtxt) || cardtitle.includes (searchtxt)) {

            element.style.display = "block";
        } else {

            element.style.display = "none";
        }
    })

    let notesheading = GetIdElem ("notes-heading");
    notesheading.innerText = `${search.value != "" ? `Search Result(s) for "${search.value}"` : "Your Notes"}`

    search.value = "";
})

ShowNotes ();