// Function to create JSON files
function createJSONFiles(event) {
    event.preventDefault();
  
    const traitQty = parseInt(document.getElementById('traitQty').value);
    const traitNames = [];
  
    // Get trait names from user
    for (let i = 0; i < traitQty; i++) {
      const traitName = prompt(`Enter a name for trait #${i+1}: `);
      traitNames.push(traitName);
    }
  
    const nftQty = parseInt(document.getElementById('nftQty').value);
    const description = document.getElementById('description').value;
    const nftName = document.getElementById('nftName').value;
  
    // Create zip file
    const zip = new JSZip();
  
    // Create JSON files
    for (let i = 0; i < nftQty; i++) {
      const name = `${nftName} #${i+1}`;
      const edition = i+1;
      const attributes = [];
      for (let j = 0; j < traitQty; j++) {
        // const value = prompt(`Enter a value for trait '${traitNames[j]}' in NFT #${i+1}: `);
        const value = "";
        attributes.push({"trait_type": traitNames[j], "value": value});
      }
      const nftTraitsJson = {"name": name, "description": description, "edition": edition, "attributes": attributes};
      const fileName = `${edition}.json`;
  
      // Add JSON file to zip
      zip.file(fileName, JSON.stringify(nftTraitsJson, null, 4));
    }
  
    // Generate zip file and download
    zip.generateAsync({type:"blob"})
      .then(function(content) {
        saveAs(content, `${nftName}.zip`);
      });
};
  
// Call createJSONFiles function on button click
document.getElementById("form").addEventListener("submit", createJSONFiles);
  