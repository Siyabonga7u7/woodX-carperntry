
/* ===== WOODX QUOTE MESSAGE GENERATOR ===== */

const quoteForm = document.getElementById("quoteForm");
const generatedMessage = document.getElementById("generatedMessage");
const quoteStatus = document.getElementById("quoteStatus");
const copyMessageButton = document.getElementById("copyMessage");
const whatsappMessage = document.getElementById("whatsappMessage");

function getFieldValue(id) {
    return document.getElementById(id).value.trim();
}

quoteForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const name = getFieldValue("customerName");
    const project = getFieldValue("projectType");
    const width = getFieldValue("width");
    const height = getFieldValue("height");
    const depth = getFieldValue("depth");
    const material = getFieldValue("material");
    const notes = getFieldValue("notes");

    if (!project) {
        quoteStatus.textContent =
            "Please choose a project type before generating your message.";
        document.getElementById("projectType").focus();
        return;
    }

    const dimensions = [];

    if (width) dimensions.push("Width: " + width + " mm");
    if (height) dimensions.push("Height: " + height + " mm");
    if (depth) dimensions.push("Depth: " + depth + " mm");

    const lines = [
        "Hello WoodX Carpentry,",
        "",
        "I would like to enquire about a furniture project.",
        "",
        "Name: " + (name || "Not provided"),
        "Project: " + project,
        "Dimensions: " +
            (dimensions.length ? dimensions.join(", ") : "Not provided"),
        "Preferred material: " + (material || "Not decided"),
        "Additional notes: " + (notes || "None provided"),
        "",
        "Please let me know if you can assist and what further details you need.",
        "",
        "Thank you."
    ];

    const message = lines.join("\n");

    generatedMessage.value = message;
    whatsappMessage.href =
        "https://wa.me/26878489036?text=" + encodeURIComponent(message);

    copyMessageButton.disabled = false;
    whatsappMessage.classList.remove("disabled");
    whatsappMessage.setAttribute("aria-disabled", "false");

    quoteStatus.textContent =
        "Your message is ready. Review it, then copy it or open WhatsApp.";
});

copyMessageButton.addEventListener("click", async function () {
    const message = generatedMessage.value;

    if (!message) return;

    try {
        await navigator.clipboard.writeText(message);
        quoteStatus.textContent = "Message copied. You can now paste it anywhere.";
    } catch (error) {
        generatedMessage.focus();
        generatedMessage.select();

        const copied = document.execCommand("copy");

        quoteStatus.textContent = copied
            ? "Message copied. You can now paste it anywhere."
            : "Copy was blocked. Select the message and copy it manually.";
    }
});
