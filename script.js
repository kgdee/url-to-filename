
function convertClipboardText() {
  navigator.clipboard
    .readText()
    .then((text) => {
      const convertedText = text.replace(/[\/?]/g, " ");
      navigator.clipboard
        .writeText(convertedText)
        .then(() => alert("Clipboard text converted and copied to clipboard!"))
        .catch((err) => console.error("Error writing to clipboard", err));
    })
    .catch((error) => {
      console.error(error)
      alert(error)
    });
}

navigator.clipboard.readText()