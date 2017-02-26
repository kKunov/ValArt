!function () {
    function galleriesClicked() {
        $(".k-page-views").attr("style" ,"display:none;");
        $(".k-galleries").removeAttr("style");
    }

    function homeBtnClicked() {
        $(".k-page-views").attr("style" ,"display:none;");
        $(".homeInfo").removeAttr("style");
    }

    function galClicked(e) {
        console.log($(e.currentTarget).attr("data-gal-id"));
        $(".k-page-views").attr("style" ,"display:none;");
        $(".k-single-gal").removeAttr("style");
    }
    
    $("body").on("click", ".k-galleries-navbar", galleriesClicked);
    $("body").on("click", ".k-home-navbar", homeBtnClicked);
    $("body").on("click", ".k-gallery-single-pic", galClicked);
}();