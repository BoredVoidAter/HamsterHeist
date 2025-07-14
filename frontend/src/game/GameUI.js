class GameUI {
    constructor() {
        this.overlay = document.getElementById('ui-overlay');
        this.messageElement = document.getElementById('ui-message');
    }

    showMessage(message) {
        this.messageElement.textContent = message;
        this.overlay.classList.remove('hidden');
    }

    hideMessage() {
        this.overlay.classList.add('hidden');
    }
}
