const panel = document.querySelector(".panel");
const tabs = document.querySelectorAll(".tabs > ul > li");
const views = document.querySelectorAll(".view");
const preview_node = document.querySelector("#preview");

let db_data;
let panel_groups;
let panel_tabs;
let filter_set;
let current_query;
let current_query_view;
let import_fn_input = document.querySelector("input[name='import-fn']");

const initUI = async () => {
    // load database information
    db_data = await fetchDBinfo();

    // create panel-group for tables and views
    for (let prop in db_data) {
        const group = document.createElement("div");
        group.classList.add('panel-group');
        group.dataset["id"] = prop;

        for (let prop2 in db_data[prop]) {
            const link = document.createElement('a');
            link.dataset[prop] = prop2;
            link.classList.add("table-link");
            link.classList.add("panel-block");
            link.innerText = prop2;
            group.appendChild(link);
        }
        
        // hide all panel-group
        group.classList.add("invisible");
        panel.appendChild(group);
    }

    
    // create panel-group for queries
    const group = document.createElement("div");
    group.classList.add('panel-group');
    group.dataset["id"] = "queries";
    group.classList.add("invisible");
    panel.appendChild(group);

    panel_groups = document.querySelectorAll(".panel-group");
    panel_tabs = document.querySelectorAll(".panel-tabs > a");

    // show panel-group for tables
    let el = document.querySelector(".panel-group[data-id=tables");
    el.classList.remove("invisible");
    el.classList.add("is-active");

    // hide all panel-groups except first one
    for (let i = 1; i < panel_groups.length; i++) {
        panel_groups[i].classList.add("invisible");
    }

    // create filters
    const tables = [];

    for (let tab in db_data["tables"]) {
        let t = new Table(tab, db_data["tables"][tab]);
        tables.push(t);
    }

    // create query set
    filter_set = new FilterSet(5, tables);
    document.querySelector("#queries").appendChild(filter_set.DOM_node);

    // create select input for import dialog box
    const wrapper = document.createElement("div");
    const select = document.createElement("select");

    wrapper.classList.add("select");
    wrapper.appendChild(select);
    select.name = "table-name";

    for (let t in db_data.tables) {
        const opt = document.createElement("option");
        opt.value = opt.innerText = t;
        select.appendChild(opt);
    }

    document.querySelector(".form-fields").appendChild(wrapper);

    // attach listeners to various DOM elements
    document.querySelector("#export-btn").addEventListener("click", exportData);
    document.querySelectorAll(".my-notification button.delete").forEach(btn => {
        btn.addEventListener("click", (elem) => {
            elem.target.parentNode.classList.add("invisible");
        })
    });

    document.querySelectorAll(".panel-tabs > a").forEach(btn => {
        btn.addEventListener("click", switchPanelTab);
    });

    document.querySelectorAll(".import-toggle").forEach((elem) => {
        elem.addEventListener("click", toggleImportBox);
    });

    document.querySelectorAll(".export-toggle").forEach((elem) => {
        elem.addEventListener("click", toggleExportBox);
    });
    document.querySelectorAll(".table-link").forEach((node) => {
        node.addEventListener("click", (elem) => {
            let set = elem.target.dataset;
            let table_name = set.tables ? set.tables : set.views;
            current_query = `SELECT * FROM \`${table_name}\``;
            displayTable(elem);
        });
    })

    document.querySelector("#run-top").addEventListener("click", (elem) => {
        let area = document.querySelector(".syntax-area");
        current_query = area.value.trim().replaceAll("\n", " ");
        console.log(current_query);
        displayTable(elem);
    });

    tabs.forEach((el) => {
        el.addEventListener("click", switchTab);
    })
}

const switchPanelTab = (el) => {
    // hide all panel-groups
    for (let i = 0; i < panel_groups.length; i++) {
        panel_groups[i].classList.add("invisible");
        panel_tabs[i].classList.remove("is-active");
    }
    el.target.classList.add("is-active");
    // show panel-group associated with clicked link in panel-tabs
    let elem = document.querySelector(`.panel-group[data-id=${el.target.dataset.group}]`);
    elem.classList.remove("invisible");

    const group = el.target.dataset.group;

    // show additional tabs when user picks queries option
    if (group === "queries") {
        tabs[0].classList.remove("invisible");
        tabs[1].classList.remove("invisible");
        document.querySelector("#run-top").classList.remove("invisible");
        document.querySelector("#import-top").classList.add("invisible");
    }
    else {
        tabs[0].classList.add("invisible");
        tabs[1].classList.add("invisible");
        document.querySelector("#run-top").classList.add("invisible");
        document.querySelector("#import-top").classList.add("invisible");
    }

    if (group === "tables") {
        document.querySelector("#import-top").classList.remove("invisible");
    }


}

const switchTab = (el) => {
    // hide all tabs
    for (let i = 0; i < tabs.length; i++) {
        tabs[i].classList.remove("is-active");
    }
    // show panel-group associated with clicked link in panel-tabs
    const parent = el.target.parentNode;
    parent.classList.add("is-active");
    views.forEach(element => {
        element.classList.add("invisible");
    });

    const view = parent.dataset.view;
    current_query_view = document.querySelector(`#${view}`);
    current_query_view.classList.remove("invisible");

}

// function is async because function fetchQuery uses FetchAPI to get data from database
const displayTable = async (element) => {
    const wrapper = document.createElement("div");
    const table = document.createElement("table");
    const table_header = document.createElement("thead");
    const table_header_row = document.createElement("tr");
    const table_body = document.createElement("tbody");

    wrapper.classList.add("my-table");
    wrapper.appendChild(table);

    table.classList.add("table", "is-bordered", "is-narrow", "is-hoverable");
    table.appendChild(table_header);
    table.appendChild(table_body);

    table_header.appendChild(table_header_row);

    const data = await fetchQuery(current_query, "no");
    const headers = data[0];

    let temp;

    // create table header
    for (let x of headers) {
        temp = document.createElement("th");
        temp.innerText = x;
        table_header_row.appendChild(temp);
    }

    // insert data
    const len = data[0].length;
    let temp2;

    // insert rows
    for(let i = 1; i < data.length; i++) {
        temp2 = document.createElement("tr");

        for (let j = 0; j < len; j++) {
            temp = document.createElement("td");
            temp.innerText = data[i][j];
            temp2.appendChild(temp);
        }

        table_body.appendChild(temp2);
    }

    // replace old table with new one
    preview_node.innerHTML = wrapper.outerHTML;
}

const toggleExportBox = (elem) => {
    document.querySelector(".message-wrapper#export-wrapper")
        .classList.toggle("invisible");
    document.querySelector("#download-link")
        .classList.add("invisible");
    document.querySelector("input[name='filename'").value = "";
}

const toggleImportBox = (elem) => {
    document.querySelector(".message-wrapper#import-wrapper")
        .classList.toggle("invisible");
}

const previewFile = async () => {
    const table = document.createElement("table");
    const separator = document.querySelector("input[name='import-sep']").value;
    const wrapper = document.querySelector("div#import-preview");

    const file = import_fn_input.files[0];
    let rows = await file.text().then((response) => response);

    rows = rows.split("\n");
    wrapper.innerHTML = "";
    wrapper.classList.add("my-table");
    wrapper.appendChild(table);

    table.classList.add("my-table", "table", "is-narrow", "is-bordered", "is-hoverable");

    let temp;
    let temp2;
    let columns;

    for (let i = 0; i < 10; i++) {
        temp = document.createElement("tr");
        columns = rows[i].split(separator);

        for (let j = 0; j < columns.length; j++) {
            temp2 = document.createElement("td");
            temp2.innerText = columns[j];
            temp.appendChild(temp2);
        }

        table.appendChild(temp);
    }
}

initUI();
