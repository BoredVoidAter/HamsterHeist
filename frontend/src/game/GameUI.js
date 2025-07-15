class GameUI {
    constructor() {
        this.overlay = document.getElementById('ui-overlay');
        this.messageElement = document.getElementById('ui-message');
        this.eventDisplayElement = document.getElementById('event-display');
    }

    showMessage(message) {
        this.messageElement.textContent = message;
        this.overlay.classList.remove('hidden');
    }

    hideMessage() {
        this.overlay.classList.add('hidden');
    }

    displayEvent(event) {
        if (event) {
            this.eventDisplayElement.textContent = `Active Event: ${event.name}`;
            this.eventDisplayElement.classList.remove('hidden');
        } else {
            this.eventDisplayElement.classList.add('hidden');
        }
    }
}
