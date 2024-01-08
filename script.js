const msg = document.querySelector(".msg")

async function convertClipboardText() {
  msg.textContent = ""
  try {
    const clipboardText = await navigator.clipboard.readText()
    const convertedText = clipboardText.replace(/[\/?]/g, " ");

    await navigator.clipboard.writeText(convertedText)

    msg.textContent = "Done! Clipboard text converted!"
  } catch (error) {
    console.error(error)
    
    if (error.name === 'NotAllowedError') {
      msg.textContent = "Error: Clipboard permissions not granted!";
    } else {
      msg.textContent = "An error occurred while working with the clipboard.";
    }
  }
}

navigator.clipboard.readText()