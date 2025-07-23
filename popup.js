document.getElementById("speak").addEventListener("click", () => {
  const slider = document.getElementById("slider").value;
  chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
    chrome.scripting.executeScript({
      target: {tabId: tabs[0].id},
      args: [slider],
      func: (slider) => {
        const selected = window.getSelection().toString();
       
        const valueDisplay = document.getElementById("value");
        if (selected) {
          const utterance = new SpeechSynthesisUtterance(selected);
          utterance.pitch = 1;
          utterance.rate = slider
          speechSynthesis.speak(utterance);
        } else {
          alert("Please select some text first!");
        }
      }
    });
  });
});
