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
        var galleryName = $(this).attr("data-gal-id");
        var $indexatorContainer = $(".k-indexator-container"),
            $imagesContainer = $(".k-images-container"),
            classActive = "\" class=\"active\"",
            i;

        $(".k-page-views").attr("style" ,"display:none;");
        $(".k-single-gal").removeAttr("style");
        $indexatorContainer.empty();
        $imagesContainer.empty();

        jQuery.get('galleries/galleriNamesInFolder?galleryName=' + galleryName, function(result) {
            for (i = 0; i < result.length; i++){
                $indexatorContainer.append(
                    "<li data-target=\"#k-gallery-slider\" data-slide-to=\"" + i + (i === 0 ? classActive : "") + "\"></li>"
                );

                $imagesContainer.append(
                    "<div class=\"item" + (i === 0 ? " active" : "") + "\">" + 
                    "<img src=\"images/gal/" + galleryName + "/" + result[i] + "\"></div>"
                );
            }
        });
    }
    
    $("body").on("click", ".k-galleries-navbar", galleriesClicked);
    $("body").on("click", ".k-home-navbar", homeBtnClicked);
    $("body").on("click", ".k-gallery-single-pic", galClicked);
}();