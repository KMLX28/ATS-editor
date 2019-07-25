
/* ------------------------------ opening  file ----------------------------- */
document.getElementById('open-file-icon').addEventListener('click', openFile);

function openFile(e) {

    if (change.length() > 0) {

        // if true, means user want to discard the unsaved file and open another file.
        if (showUnsavedFileNote()) {
            cleanFile()
            showOpenDialog();
            showSuccessNote('فُتح الملف')
        }

    } else {
        cleanFile()
        showOpenDialog()
        showSuccessNote('فُتح الملف')
    }
}

function showOpenDialog() {

    let options = {
        defaultPath: path.resolve(app.getPath("desktop")),

        filters: [{
            name: 'html',
            extensions: ['htm', 'html']
        },],
        properties: ['openFile']
    }
    let ChosenFilePath
    try {
        ChosenFilePath = dialog.showOpenDialog(options)[0]
    } catch (error) {
        ChosenFilePath = null;
    }
    if (ChosenFilePath != null) {
        fs.readFile(ChosenFilePath, 'utf8', function (err, data) {
            if (err) {
                showFailedNote('ثمة خلل.. تعذر فتح الملف')
            }

            setEditorContent(data)
            chosenPath = ChosenFilePath;
        });
    }
}
/* -------------------------------------------------------------------------- */

/* -------------- open file by drag-drop from operating system -------------- */

document.body.addEventListener('drop', (e) => {


    e.preventDefault();
    e.stopPropagation();

    if (e.dataTransfer.files.length == 0) return;

    if (e.dataTransfer.files.length > 1) {
        showFailedNote('تعذر مستند الملف.. يسمح بفتح مستند واحد فقط')
        return;
    }
    
    let draggedFile = e.dataTransfer.files[0];


    if (change.length() > 0) {

            if (showUnsavedFileNote()) {
                cleanFile();
                openFileByDragDrop(draggedFile);
            }
    } else {
        cleanFile();
        openFileByDragDrop(draggedFile);
    }
    
    function openFileByDragDrop(draggedFile) {

        let docFile = "application/msword";
        let docxFile = "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
        if (draggedFile.type == "text/html") {
            // send to main.js (main process).
            ipcRenderer.send('ondragstart', draggedFile.path)
            // receive from main.js the file data.
            ipcRenderer.on('fileData', (event, data) => {
                console.log(data);
                if (!isOpenedFileValid(data)) {
                    showFailedNote('المستند معطوب')
                    return;
                }
                setEditorContent(data);
                showSuccessNote('فُتح الملف');
            })

        } else if (draggedFile.type == docFile || draggedFile.type == docxFile) {
            // TODO convert from doc/docx to html then send to main process
            // ipcRenderer.send('ondragstart', f.path)
        } else {
            // change the alert TODO
            showFailedNote('صيغة المستند غير مقبولة')
        }
    }
});


/* -------------------------------------------------------------------------- */