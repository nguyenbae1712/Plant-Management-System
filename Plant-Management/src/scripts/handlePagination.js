$('.page-number-order').click(function (e) {
    e.preventDefault();
    console.log('pagin clicked on ' + $(this).text())
    renderdivision($(this).text());
    pagination(parseInt($(this).text()), parseInt(totalPages));
    $('#add-js-file').append(`<script src="/scripts/handlePagination.js"></script>`); // thêm lại file để hắn kiểu hắn biết được cấu trúc web mình vừa thêm thẻ mới
    renderOrder($(this).text());
    pagination(parseInt($(this).text()), parseInt(totalOrderPages));
    $('#add-js-file').append(`<script src="/scripts/handlePagination.js"></script>`); // thêm lại file để hắn kiểu hắn biết được cấu trúc web mình vừa thêm thẻ mới
});

$('.page-number').click(function (e) {
    e.preventDefault();
    renderfamily($(this).text());
    paginationFamily(parseInt($(this).text()), totalFamilyPages);
    $('#add-js-file').append(`<script src="/scripts/handlePagination.js"></script>`);
});


$('.page-number-genus').click(function (e) {
    e.preventDefault();
    rendergenus($(this).text());
    paginationGenus(parseInt($(this).text()), parseInt(totalGenusPages));
    $('#add-js-file').append(`<script src="/scripts/handlePagination.js"></script>`);
});

$('.page-number-species').click(function (e) {
    e.preventDefault();
    renderdspecies($(this).text());
    paginationSpecies(parseInt($(this).text()), parseInt(totalSpeciesPage));
    $('#add-js-file').append(`<script src="/scripts/handlePagination.js"></script>`);
});