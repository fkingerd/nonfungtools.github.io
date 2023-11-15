function createJSONFiles(event) {
    event.preventDefault();
  
    const traitQty = parseInt(document.getElementById('traitQty').value);
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
            const value = ""; // You can add logic to handle trait values
            attributes.push({"trait_type": `Trait ${j+1}`, "value": value});
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

document.getElementById("form").addEventListener("submit", createJSONFiles);
