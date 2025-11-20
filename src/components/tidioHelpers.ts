export const sendCustomBotMessage = (message: string) => {
  if (typeof window === 'undefined') {
    return;
  }

  if (window.tidioChatApi && typeof window.tidioChatApi.displayMessage === 'function') {
    window.tidioChatApi.displayMessage({
      type: 'bot',
      message,
    });
  } else {
    console.warn('Tidio API not ready yet.');
  }
};

