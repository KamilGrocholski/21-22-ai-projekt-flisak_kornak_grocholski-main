class FilterSet {
    tables;
    filters;
    newFilter;
    DOM_node;
    DOM_rows;
    DOM_btn;

    constructor(amount, tables) {
        this.filters = [];
        this.DOM_rows = [];
        this.tables = tables;

        for (let i = 0; i < amount; i++) this.filters.push(new Filter(tables));
        this.build();
    }

    addFilter = (elem) => {
        const f = new Filter(this.tables);

        this.filters.push(f);

            for (let j = 0; j < f.DOM_nodes.length; j++) {
                this.DOM_rows[j].appendChild(f.DOM_nodes[j]);
            }
        this.DOM_node.scrollLeft = this.DOM_node.scrollWidth;
    }

    build() {
        const header_columns = ["Pole", "Tabela", "Sortuj", "Pokaż", "Kryteria", "Wyczyść"];
        const table = document.createElement("table");

        table.classList.add("my-table", "table", "is-narrow", "is-bordered", "is-hoverable");

        this.DOM_node = document.createElement("div");
        this.DOM_node.classList.add("table-container",  "filters-container");
        this.DOM_node.appendChild(table);

        // create button for creating new filter
        const btn = document.createElement("button");
        const icon_wrapper = document.createElement("span");
        const icon = document.createElement("i");

        icon.classList.add("fas", "fa-plus");
        icon_wrapper.classList.add("icon");
        btn.classList.add("button", "is-success", "is-large", "filter-btn");
        btn.addEventListener("click", this.addFilter);

        icon_wrapper.appendChild(icon);
        btn.appendChild(icon_wrapper);
        this.DOM_btn = btn;
        this.DOM_node.appendChild(btn);

        // create rows
        for (let i = 0; i < header_columns.length; i++) {
            let row = document.createElement("tr");
            this.DOM_rows.push(row);
            table.appendChild(row);
        }

        // create headers
        for (let i = 0; i < header_columns.length; i++) {
            let header_column = document.createElement("th");
            header_column.innerText = header_columns[i];
            this.DOM_rows[i].appendChild(header_column);
        }

        // append Filters
        for(let i = 0; i < this.filters.length; i++) {
            for (let j = 0; j < header_columns.length; j++) {
                this.DOM_rows[j].appendChild(this.filters[i].DOM_nodes[j]);
            }
        }
    }

    getData() {
        const data = [];
        for(let filter of this.filters) {
            if (!filter.isEmpty()) {
                data.push({
                    "table": filter.getTable(),
                    "field": filter.getField(),
                    "order": filter.getSortOrder(),
                    "display": filter.getDisplay(),
                    "criteria": filter.getCriteria()
                });
            }
        }
        return data;
    }

}

class Filter {
    tables;

    // DOM elements
    DOM_nodes;      // container for all td elements
    field_picker;   // select box for table field
    table_picker;   // select box for table
    sort_picker;    // select box for sorting order
    checkbox;       // checkbox determining if field should be visible
    input;          // input for criteria
    button;         // button for clearing filter

    constructor(tables) {
        this.tables = tables;
        this.build();
    }

    clearFilter = (elem) => {
        this.input.value = "";
        this.checkbox.checked = true;
        this.sort_picker.value = "";
        this.table_picker.value = "";

        let child = this.field_picker.lastElementChild;
        while (child) {
            this.field_picker.removeChild(child);
            child = this.field_picker.lastElementChild;
        }
    }

    getCriteria() {
        return this.input.value;
    }

    getDisplay() {
        return this.checkbox.checked;
    }

    getSortOrder() {
        return this.sort_picker.value;
    }

    getTable() {
        return this.table_picker.value;
    }

    getField() {
        return this.field_picker.value;
    }

    isEmpty() {
        return this.getTable().length == 0;
    }

    generateColumns = (elem) => {
        
        // remove all option elements from select
        let child = this.field_picker.lastElementChild;

        while (child) {
            this.field_picker.removeChild(child);
            child = this.field_picker.lastElementChild;
        }

        // choose table
        let t;

        for (let tab of this.tables) {
            if (tab.name === elem.target.value) {
                t = tab;
            }
        }

        // create option elements from table t
        for (let field of t.columns) {
            let option = document.createElement("option");
            option.value = option.innerText = field;
            this.field_picker.appendChild(option);
        }
    }

    build() {
        
        this.DOM_nodes = [];
        // create columns
        for (let i = 0; i < 6; i++) this.DOM_nodes.push(document.createElement("td"));

        // create select elements for table, field and sort
        for (let i = 0; i < 3; i++) {
            const wrapper = document.createElement("div");
            const select = document.createElement("select");

            wrapper.classList.add("select", "is-small");
            wrapper.appendChild(select);
            this.DOM_nodes[i].appendChild(wrapper);
        }

        // associate DOM elements with Filter fields
        this.field_picker = this.DOM_nodes[0].children[0].children[0];
        this.table_picker = this.DOM_nodes[1].children[0].children[0];
        this.sort_picker  = this.DOM_nodes[2].children[0].children[0];

        let temp = document.createElement("option");

        temp.value = "";
        temp.disabled = true;
        this.table_picker.appendChild(temp);

        // create options for table select element
        for (let t of this.tables) {
            let option = document.createElement("option");
            option.value = option.innerText = t.name;
            this.table_picker.appendChild(option);
        }

        // create options for sorting order
        const opts = [
            ["", "brak"],
            ["ASC", "rosnąco"],
            ["DESC", "malejąco"]
        ];

        for (let opt of opts) {
            const option = document.createElement("option");
            option.innerText = opt[1];
            option.value = opt[0];
            this.sort_picker.appendChild(option);
        }

        // create display checkbox
        const checkbox_wrapper = document.createElement("label");
        const checkbox = document.createElement("input");

        checkbox_wrapper.classList.add("checkbox");
        checkbox_wrapper.appendChild(checkbox);
        checkbox.type = "checkbox";
        checkbox.checked = true;

        this.DOM_nodes[3].appendChild(checkbox_wrapper);
        this.checkbox = checkbox;

        // create input for criteria
        const input = document.createElement("input");

        input.type = "text";
        input.classList.add("input", "is-small");
        this.DOM_nodes[4].appendChild(input);
        this.input = input;

        // create button for clearing filter
        const btn = document.createElement("button");
        const icon_wrapper = document.createElement("span");
        const icon = document.createElement("i");

        icon.classList.add("fas", "fa-times");
        icon_wrapper.classList.add("icon");
        btn.classList.add("button", "is-danger", "button-fill");

        icon_wrapper.appendChild(icon);
        btn.appendChild(icon_wrapper);

        this.DOM_nodes[5].appendChild(btn);
        this.button = btn;

        // attach event listeners
        this.table_picker.addEventListener("change", this.generateColumns);
        this.button.addEventListener("click", this.clearFilter);
        this.table_picker.value = "";
    }
}
