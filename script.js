const textInput = document.querySelector(".text-input")
const convertBtn = document.querySelector(".convert")
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


function updateConvertBtn() {
  convertBtn.innerHTML = textInput.value ? "Convert" : "Convert Clipboard Text"
}

async function convertText() {
  msg.textContent = ""
  try {
    const text = textInput.value || await navigator.clipboard.readText()
    
    const textIsUrl = symbols.some(symbol => text.includes(symbol))
    
    let convertedText = ""
    if (textIsUrl) {
      convertedText = text.replace(/[\\/:*?"<>|]/g, function(match) {
        return `[${symbols.indexOf(match)}]`
      }); 
    } else {
      convertedText = text.replace(/\[(\d)\]/g, (match, index) => {
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