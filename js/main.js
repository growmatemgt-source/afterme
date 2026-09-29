const messageInput = document.getElementById("messageInput");
const characterCount = document.getElementById("characterCount");
const previewMessage = document.getElementById("previewMessage");
const futureDate = document.getElementById("futureDate");


// CHARACTER COUNT

if (messageInput && characterCount) {

    messageInput.addEventListener("input", () => {

        characterCount.textContent =
            `${messageInput.value.length} / 500`;

    });

}


// PREVIEW

if (previewMessage && messageInput) {

    previewMessage.addEventListener("click", () => {

        const message = messageInput.value.trim();

        if (!message) {

            messageInput.focus();

            return;

        }

        alert(
            "Your message:\n\n" +
            message +
            "\n\nAFTERME"
        );

    });

}


// FIVE YEARS FROM TODAY

if (futureDate) {

    const date = new Date();

    date.setFullYear(
        date.getFullYear() + 5
    );

    const day = String(
        date.getDate()
    ).padStart(2, "0");

    const month = String(
        date.getMonth() + 1
    ).padStart(2, "0");

    const year = date.getFullYear();

    futureDate.textContent =
        `${day}.${month}.${year}`;

}