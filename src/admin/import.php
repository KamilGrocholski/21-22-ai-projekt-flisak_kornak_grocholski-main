<!DOCTYPE html>
<html lang="pl">

    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width,initial-scale=1.0">
        <meta name="author" content="Łukasz Flisak, Michał Kornak, Kamil Grocholski">
        <title>Panel admina</title>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.1/css/all.min.css"
        integrity="sha512-KfkfwYDsLkIlwQp6LFnl8zNdLGxu9YAA1QvwINks4PhcElQSvqcyVLLD9aMhXd13uQjoXtEKNosOWaZqXgel0g=="
        crossorigin="anonymous" referrerpolicy="no-referrer" />
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@0.9.3/css/bulma.min.css">
        <link rel="stylesheet" href="/static/admin/css/style.css">
    </head>

    <body>

        <?php
            include "connection.php";

            if ($_FILES['import-fn']['error'] == UPLOAD_ERR_OK               //checks for errors
                  && is_uploaded_file($_FILES['import-fn']['tmp_name'])) { //checks that file is uploaded

                $table = $_POST["table-name"];
                $sep = $_POST["import-sep"];

                $file = fopen($_FILES["import-fn"]["tmp_name"], "r");
                $query = "INSERT INTO " . $table . " VALUES ";

                if (isset($_POST["headers"])) {
                    $junk = fgets($file);
                }

                while (!feof($file)) {

                    $data = explode($sep, trim(fgets($file)));

                    if (count($data) >= 2) {
                        $line = "(";

                        foreach ($data as $column) {
                            $clear_col = trim($column);
                            $line = $line . "'" . $clear_col . "',";
                        }

                        $line = substr($line, 0, -1) . "),";
                        $query = $query . $line;
                    }
                }

                $query = substr($query, 0, -1) . ";";

                try {
                    if (mysqli_query($conn, $query)) {
                        echo '<div class="my-notification notification is-success">
                            <button class="delete"></button>
                            <h5 class="is-size-5 has-text-weight-semibold">Sukces</h5>
                            <p>Pomyślnie zaimportowano dane</p>
                        </div>';
                    }
                } catch (mysqli_sql_exception $e) {
                    echo '<div class="my-notification notification is-danger">
                        <button class="delete"></button>
                        <h5 class="is-size-5 has-text-weight-semibold">Wystapił bład</h5>' .
                        '<p>' . $e->getMessage() . '</p>' .
                        '<p>Plik: ' . $e->getFile() . '</p>' .
                        '<p>Linia: ' . $e->getLine() . '</p>' .
                    '</div>';
                }
            }
        ?>
        <div class="columns my-hero">
            <div class="column is-one-fifth">

                <nav class="panel">
                    <p class="panel-heading">Biblioteka</p>
                    <p class="panel-tabs">
                        <a data-group="tables" class="is-active">Tabele</a>
                        <a data-group="views">Widoki</a>
                        <a data-group="queries">Kwerendy</a>
                    </p>
                </nav>
            </div>
            <div class="column">
                <div class="tabs">
                    <ul>
                        <li data-view="queries" class="invisible"><a>Tworzenie</a></li>
                        <li data-view="sql" class="invisible"><a>SQL</a></li>
                        <li data-view="preview" class="is-active"><a>Podgląd</a></li>
                    </ul>
                </div>
                <div>
                    <div class="buttons flex-end">
                        <button id="run-top" class="invisible button is-success">Uruchom</button>
                        <button id="import-top" class="import-toggle button is-warning">Import</button>
                        <button id="export-top" class="export-toggle button is-primary">Export</button>
                    </div>

                    <div class="view" id="preview"></div>
                    <div class="view invisible" id="queries"></div>
                    <div class="view invisible" id="sql">
                        <div id="textarea-wrapper">
                            <textarea 
                                class="textarea syntax-area" 
                                name="user-sql"
                                >
                            </textarea>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- import dialog box -->

        <div id="import-wrapper" class="message-wrapper invisible">
            <article class="message my-message">
                <form action="import.php" method="post" enctype="multipart/form-data">
                    <div class="message-header">
                        <p>Import danych</p>
                        <button class="delete import-toggle" aria-label="delete"></button>
                    </div>
                    <div class="message-body">
                        <div class="form-fields">
                            <div class="file">
                                <label class="file-label">
                                    <input class="file-input" type="file" name="import-fn">
                                    <span class="file-cta">
                                        <span class="file-icon">
                                            <i class="fas fa-upload"></i>
                                        </span>
                                        <span class="file-label">
                                            Wybierz plik
                                        </span>
                                    </span>
                                </label>
                            </div>
                        </div>
                        <div>
                            <label for="import-sep">Separator kolumn</label>
                            <input name="import-sep" class="input" type="text" value=";">
                        </div>
                        <div>
                            <label class="checkbox">
                                <input name="headers" checked type="checkbox"> Dane mają nagłówki
                            </label>
                        </div>

                        <button type="submit" id="import-btn" class="button">Importuj</button>
                    </div>
                </form>
            </article>
        </div>

        <!-- export dialog box -->
        <div id="export-wrapper" class="message-wrapper invisible">
            <article class="message my-message">
                <div class="message-header">
                    <p>Eksportowanie danych</p>
                    <button class="delete export-toggle" aria-label="delete"></button>
                </div>
                <div class="message-body">
                    <div>
                        <label for="filename">Nazwa pliku</label>
                        <input name="filename" class="input" type="text" placeholder="np. autorzy, czytelnicy">
                    </div>
                    <div>
                        <label for="separator">Separator kolumn</label>
                        <input name="separator" class="input" type="text" value=",">
                    </div>
                    <div>
                        <label class="checkbox">
                            <input name="headers" checked type="checkbox"> Dołącz nazwy kolumn
                        </label>
                    </div>
                    <button id="export-btn" class="button">Eksportuj</button>
                    <div class="invisible" id="download-link">
                        Kliknij <a class="has-text-primary has-text-weight-bold" download href="">tutaj</a> aby pobrać dane
                    </div>
                </div>
            </article>
        </div>

        <script src="/static/admin/js/database.js"></script>
        <script src="/static/admin/js/table.js"></script>
        <script src="/static/admin/js/filter.js"></script>
        <script src="/static/admin/js/ui.js"></script>
    </body>

</html>
