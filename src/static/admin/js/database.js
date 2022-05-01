const fetchQuery = async (query, save) => {
    // this function will change soon
    const link = `/admin/filter.php?export=${save}&query=${query}`;
    const data = await fetch(link, {
        method: 'get',
    });
    return await data.json();
}

const fetchDBinfo = async () => {
    const data = await fetch("/admin/dbinfo.php", { method: 'get',});
    return await data.json();
}

const exportData = async () => {
    const filename = document.querySelector("input[name='filename'").value;
    const separator = document.querySelector("input[name='separator'").value;
    const headers = document.querySelector("input[name='headers'").checked ? "yes" : "no";

    if (filename && separator && current_query) {
        let txt = `/admin/filter.php?export=yes&query=${current_query}&sep=${separator}`;
        txt = `${txt}&filename=${filename}&header=${headers}`;

        const link = await fetch(txt);
        const data = await link.json();

        document.querySelector("#download-link").classList.remove("invisible");
        document.querySelector("#download-link > a").href = data.link;
    }
}
