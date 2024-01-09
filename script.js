const msg = document.querySelector(".msg")
const preview = document.querySelector(".preview")
const helpModal = document.querySelector(".help-modal")

const symbols = [
  '\\',
  '/',
  ':',
  '*',
  '?',
  '"',
  '<',
  '>',
  '|'
]

if (document.hasFocus()) navigator.clipboard.readText()

async function convertClipboardText() {
  msg.textContent = ""
  try {
    const clipboardText = await navigator.clipboard.readText()
    
    const clipboardIsUrl = symbols.some(symbol => clipboardText.includes(symbol))
    
    let convertedText = ""
    if (clipboardIsUrl) {
      convertedText = clipboardText.replace(/[\\/:*?"<>|]/g, function(match) {
        return `[${symbols.indexOf(match)}]`
      }); 
    } else {
      convertedText = clipboardText.replace(/\[(\d)\]/g, (match, index) => {
        return symbols[index] || match;
      })
    }

    await navigator.clipboard.writeText(convertedText)

    msg.textContent = "Done! Clipboard text converted!"
    updatePreviewText()
  } catch (error) {
    console.error(error)
    
    if (error.name === 'NotAllowedError') {
      msg.textContent = "Error: Clipboard permissions not granted!";
    } else {
      msg.textContent = "An error occurred while working with the clipboard.";
    }
  }
}

async function updatePreviewText() {
  if (!document.hasFocus()) return

  preview.innerHTML = `<i class="bi bi-clipboard"></i> ` + await navigator.clipboard.readText()
}



function stopPropagation(event) {
  event.stopPropagation();
}

function toggleHelpModal() {
  helpModal.classList.toggle("hidden")
}


document.addEventListener("DOMContentLoaded", function() {
  updatePreviewText()
  
  document.querySelector(".help-modal .modal-content").innerHTML += symbols.map((item, index) => `
  <div>${item} = [${index}]</div>
  `).join("")
  
})