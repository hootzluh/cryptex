// Drag and drop handling
const dropArea = document.getElementById('drop-area');

dropArea.addEventListener('dragover', (event) => {
  event.preventDefault(); // Necessary to allow 'drop'
  dropArea.classList.add('dragover'); // Add styling to indicate drop zone is active
});

dropArea.addEventListener('dragleave', (event) => {
  dropArea.classList.remove('dragover');
});

dropArea.addEventListener('drop', (event) => {
  event.preventDefault();
  const files = event.dataTransfer.files;

  // Process the dropped files:
  for (let i = 0; i < files.length; i++) {
    const filePath = files[i].path;
    // TODO: Send filePath to the main process via IPC
  }
});

// ... (Other UI event handling, like getting password input)
