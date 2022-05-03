<!DOCTYPE html>
<html lang="pl">

    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width,initial-scale=1.0">
        <meta name="author" content="Łukasz Flisak, Michał Kornak, Kamil Grocholski">
        <title>Strona użytkownika</title>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.1/css/all.min.css"
        integrity="sha512-KfkfwYDsLkIlwQp6LFnl8zNdLGxu9YAA1QvwINks4PhcElQSvqcyVLLD9aMhXd13uQjoXtEKNosOWaZqXgel0g=="
        crossorigin="anonymous" referrerpolicy="no-referrer" />
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@0.9.3/css/bulma.min.css">
        <link rel="stylesheet" href="../static/user/css/style.css">
        <script src="./include/functions/shelf-functions.js"></script>
    </head>
<body>
    
<?php include('../user/include/header.php');?>

<div class="container mb-3 mt-3">
    <?php include('../user/include/functions/changeInclude.php');?>
</div>

<?php include('../user/include/footer.php');?>

</body>
</html>
<script>
if ( window.history.replaceState ) {
        window.history.replaceState( null, null, window.location.href );
    }
</script>