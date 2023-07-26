(() => {
  "use strict";

  // Check URL
  if (!/^https:\/\/.+\.kintone\.com/.test(location.href)) {
    window.alert("Cannot execute on this site.");
    return;
  }

  // Check plugin id
  const regex = /pluginId=([a-zA-Z0-9]{32})/;
  const match = location.href.match(regex);
  if (!match) {
    window.alert("Plugin ID not found or does not match the expected format.");
    return;
  }

  // Get plugin id
  const PLUGIN_ID = match[1];
  console.log("Plugin ID:", PLUGIN_ID);

  // Get plugin config
  const config = kintone.plugin.app.getConfig(PLUGIN_ID);
  console.log("JSON Data:", config);

  // Create and download JSON
  function downloadJSON(jsonData, fileName) {
    // Convert the JSON data to a Blob
    const blobData = new Blob([JSON.stringify(jsonData, null, 2)], {
      type: "application/json"
    });

    // Create a temporary link element
    const downloadLink = document.createElement("a");
    downloadLink.href = URL.createObjectURL(blobData);
    downloadLink.download = fileName;

    // Append the link element to the DOM (invisible)
    downloadLink.style.display = "none";
    document.body.appendChild(downloadLink);

    // Programmatically click the link to trigger the download
    downloadLink.click();

    // Clean up: remove the temporary link and revoke the Blob object
    document.body.removeChild(downloadLink);
    URL.revokeObjectURL(downloadLink.href);
  }

  const fileName = PLUGIN_ID + ".json";
  downloadJSON(config, fileName);
})();
