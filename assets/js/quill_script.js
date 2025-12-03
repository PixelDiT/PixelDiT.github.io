$("#text2json").click(function () { text2json() });

function text2json() {
    var jsonString = JSON.stringify(quill.getContents())
    var jsonContainer = document.getElementById("json-container");
    jsonContainer.textContent = jsonString;
};
