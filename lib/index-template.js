const cssStyle = `
    body {
        margin: 0;
        padding: 0;
        font-family: Arial, Helvetica, sans-serif;
        color: #333;
    }

    .test {
        width: 90%;
        margin: 3rem auto;
    }

    .screenshots-scroll-container {
        overflow-x: scroll;
    }

    .screenshots {
        padding: 10px 5px 10px 10px;
        white-space: nowrap;
        background: #bbb;
    }

    .screenshots img {
        width: 300px;
        margin-right: 5px;
    }

    .fail p {
        color: #FF3860;   
    }

    details {
        color: #FF3860;
        border-radius: 4px;
        padding: .5em .5em 0;
    }

    summary {
        font-weight: bold;
        font-size: 1rem;
    }

    table {
        text-overflow: elipsis;
    }
`;


const javascript = `
    var imgs = document.querySelectorAll('.screenshot-img');
    var modalEl = document.querySelector('.modal');
    var modalImgEl = document.querySelector('#show-me');
    var allTests = document.querySelectorAll('.test');
    var passedTests = document.querySelectorAll('.test.pass');
    var failedTests = document.querySelectorAll('.test.fail');
    var skippedTests = document.querySelectorAll('.test.pending');
    var filterRadios = document.querySelectorAll("#filter input");

    // Register onClick listeners on thumbnails
    for (let i = 0; i < imgs.length; i++) {
        imgs[i].addEventListener('click', function updateModal(event) {
            modalImgEl.setAttribute('src', event.target.src);
            if (modalImgEl.naturalWidth / modalImgEl.naturalHeight > 1) {
                document.querySelector('.modal-content').setAttribute("style", "width: 90%;");
            } else {
                document.querySelector('.modal-content').setAttribute("style", "width: 640px");
            }

            modalEl.classList.add('is-active');
        });
    }

    // Show an element
    const show = function (elem) {
        elem.style.display = 'block';
    };

    // Hide an element
    const hide = function (elem) {
        elem.style.display = 'none';
    };

    const showAll = function () {
        for (let i = 0; i < allTests.length; i++) {
            show(allTests[i]);
        }
    };

    const hideAll = function () {
        for (let i = 0; i < allTests.length; i++) {
            hide(allTests[i]);
        }
    };

    const showFailed = function () {
        for (let i = 0; i < failedTests.length; i++) {
            show(failedTests[i]);
        }
    };

    const showPassed = function () {
        for (let i = 0; i < passedTests.length; i++) {
            show(passedTests[i]);
        }
    };

    const showPending = function () {
        for (let i = 0; i < skippedTests.length; i++) {
            show(skippedTests[i]);
        }
    };

    for (var i = 0, max = filterRadios.length; i < max; i++) {
        filterRadios[i].onclick = function (event) {
            if (event.target.value === 'all') {
                showAll();
            } else if (event.target.value === 'failed') {
                hideAll();
                showFailed();
            } else if (event.target.value === 'passed') {
                hideAll();
                showPassed();
            } else if (event.target.value === 'pending') {
                hideAll();
                showPending();
            }
        }
    };

    // Register onClick listener on the modal
    modalEl.addEventListener('click', function hideModal(event) {
        var isActive = modalEl.classList.contains('is-active');
        if (isActive) {
            modalEl.classList.remove('is-active');
        }
    });
`;

const indexHtml = body => `
    <!DOCTYPE html>
    <html lang="en">
        <head>
            <meta charset="utf-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <title>Timeline Report</title>
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bulma/0.7.1/css/bulma.css">
            <style>
                ${cssStyle}
            </style>
            <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.3.1/css/all.css" integrity="sha384-mzrmE5qonljUremFsqc01SB46JvROS7bZs3IO2EmfFsd15uHvIt+Y8vEf7N7fWAU" crossorigin="anonymous">
        </head>

        <body>
            ${body}
            <script type="text/javascript">
                ${javascript}
            </script>
        </body>
    </html>
    `;

export default indexHtml;