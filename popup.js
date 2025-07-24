document.getElementById("speak").addEventListener("click", () => {
  const slider = document.getElementById("slider").value;
  const text = document.getElementById("text_data").value;

  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.scripting.executeScript({
      target: { tabId: tabs[0].id },
      args: [slider, text],
      func: (slider, text) => {
        const selected = window.getSelection().toString().trim();

        if (selected) {
          const utterance = new SpeechSynthesisUtterance(selected);
          utterance.pitch = 1;
          utterance.rate = slider;
          speechSynthesis.speak(utterance);
        } else if (text.trim()) {
          const utterance = new SpeechSynthesisUtterance(text);
          utterance.pitch = 1;
          utterance.rate = slider;
          speechSynthesis.speak(utterance);
        } else {
          alert("select or enter text");
        }
      }
    });
  });
});

document.getElementById("stop").addEventListener("click", () => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.scripting.executeScript({
      target: { tabId: tabs[0].id },
      func: () => {
        speechSynthesis.cancel();
      }
    });
  });
});
