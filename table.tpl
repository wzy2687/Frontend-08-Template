<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Table</title>
    <style>
        body {
            display: flex;
            height: 100vh;
            overflow: hidden;
            margin: 0;
        }

        .table{
            height: 100%;
            overflow: auto;
            padding: 10px 20px;
            box-sizing: border-box;
        }

        #frame {
            flex: 1;
            border: 1px solid cyan;
        }

    </style>
</head>

<body>
    <div class="table">
        <table>
            {{content}}
        </table>
    </div>
    <iframe id="frame"></iframe>
    <script>
        function openURL(url) {
            document.getElementById('frame').src = url;
        }

    </script>
</body>

</html>
