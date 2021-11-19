$('.page-number-order').click(function (e) {
    e.preventDefault();
    console.log('pagin clicked on ' + $(this).text())
    renderOrder($(this).text());
    pagination(parseInt($(this).text()), parseInt(totalPages));
    $('#add-js-file').append(`<script src="/scripts/handlePagination.js"></script>`); // thêm lại file để hắn kiểu hắn biết được cấu trúc web mình vừa thêm thẻ mới
});