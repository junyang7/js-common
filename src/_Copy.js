export default class _Copy {

    static async do(data) {

        if (navigator.clipboard && navigator.clipboard.writeText) {
            await navigator.clipboard.writeText(data);
            return;
        }
        const textarea = document.createElement("textarea");
        textarea.value = String(data);
        textarea.setAttribute("readonly", "");
        textarea.style.cssText = "position: fixed;top: 0;left: 0;width: 0;height: 0;opacity: 0;pointer-events: none;z-index: -1;";
        document.body.appendChild(textarea);
        textarea.select();
        textarea.setSelectionRange(0, textarea.value.length);
        document.execCommand("copy");
        document.body.removeChild(textarea);

    }

}
