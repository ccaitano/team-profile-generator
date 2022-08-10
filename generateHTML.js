//Generate HTML Page based on user input
function generateHTML(managerCard, teamEngineerCards, teamInternCards) {
    htmlString = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.2/dist/css/bootstrap.min.css" integrity="sha384-xOolHFLEh07PJGoPkLv1IbcEPTNtaed2xpHsD9ESMhqIYd0nLMwNLD69Npy4HI+N" crossorigin="anonymous">
    <title>Team Profile</title>
</head>
<body>
    <!-- Team Profile Jumbotron -->
    <div class="jumbotron jumbotron-fluid bg-dark">
        <div class="container mx-auto">
          <h1 class="display-4 text-center font-weight-bolder text-white">Team Profile</h1>
        </div>
    </div>
    <div class ="container col">
        <div class="card-deck">
            ${managerCard}
            ${teamEngineerCards}
            ${teamInternCards}
        </div>
    </div>
    <!-- Bootstrap JS Scripts -->
    <script src="https://cdn.jsdelivr.net/npm/jquery@3.5.1/dist/jquery.slim.min.js" integrity="sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj" crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@4.6.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-Fy6S3B9q64WdZWQUiU+q4/2Lc9npb8tCaSX9FK7E8HnRr0Jz8D6OP9dO5Vg3Q9ct" crossorigin="anonymous"></script>
</body>
</html>`;

    return htmlString;
}

//Exports HTML String to index.js file
module.exports = generateHTML;