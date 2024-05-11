// background.js

// Function to handle tab creation or update
function handleTabChange(tabId, changeInfo, tab) {
    // Check if the tab is loading a new URL
    if (!tab.url.startsWith("https://www.youtube.com/watch?v=kCXp1jwDnyo&t=196s")) {
        chrome.tabs.update(tabId, {url: "https://www.youtube.com/watch?v=kCXp1jwDnyo&t=196s"});
    }
  }
  
  // Add listener for tab creation or update
  chrome.tabs.onUpdated.addListener(handleTabChange);

  // Function to handle tab creation
function handleTabCreation(tab) {
    // Redirect the new tab to the desired video URL
    if (!tab.url.startsWith("https://www.youtube.com/watch?v=kCXp1jwDnyo&t=196s")) {
        chrome.tabs.update(tab.id, {url: "https://www.youtube.com/watch?v=kCXp1jwDnyo&t=196s"});
    }
  }
  
  // Add listener for tab creation
  chrome.tabs.onCreated.addListener(handleTabCreation);

 // Variable to store the URL of the closed YouTube tab
var closedTabUrl = "";

// Function to handle tab removal
function handleTabRemoval(tabId, removeInfo) {
  // Get the details of the closed tab
  chrome.tabs.get(tabId, function(tab) {
    // Check if the closed tab matches the YouTube URL you're interested in
    if (tab.url.startsWith("https://www.youtube.com/watch?v=kCXp1jwDnyo&t=196s")) {
      // Store the URL of the closed YouTube tab
      closedTabUrl = tab.url;
    }
  });
}

// Add listener for tab removal
chrome.tabs.onRemoved.addListener(handleTabRemoval);

// Function to create a new tab with the stored YouTube URL
function createNewTab() {
  // Check if the closed YouTube tab URL is not empty
  if (closedTabUrl !== "") {
    // Open a new tab with the stored YouTube URL
    chrome.tabs.create({ url: closedTabUrl });
    // Reset the closedTabUrl variable
    closedTabUrl = "";
  }
}

// Call the function to create a new tab when the extension is loaded
createNewTab();